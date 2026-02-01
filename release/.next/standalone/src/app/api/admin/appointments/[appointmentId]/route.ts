// src/app/api/admin/appointments/[appointmentId]/route.ts
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';

function jsonErr(message: string, status = 400) {
    return NextResponse.json({ ok: false, error: message }, { status });
}

function jsonOk(data: unknown, status = 200) {
    return NextResponse.json({ ok: true, data }, { status });
}

function normalizeString(v: unknown): string {
    return String(v ?? '').trim();
}

type AppointmentStatus = 'PENDING' | 'DONE' | 'CANCELED';

type PatchBody =
    | {
          // ✅ fluxo legado (concluir/cancelar)
          action?: 'cancel' | 'done';
          status?: AppointmentStatus;
      }
    | {
          // ✅ novo: edição completa (mesmas infos do "novo agendamento")
          clientId: string;
          clientName: string;
          phone: string;

          unitId: string;
          professionalId: string;
          serviceId: string;

          description?: string;
          scheduleAt: string; // ISO
      };

type Ctx = {
    params: Promise<{
        appointmentId: string;
    }>;
};

function resolveNextStatus(body: any): AppointmentStatus | null {
    const action = normalizeString(body?.action).toLowerCase();
    const status = normalizeString(body?.status).toUpperCase();

    if (action === 'cancel') return 'CANCELED';
    if (action === 'done') return 'DONE';

    if (status === 'PENDING' || status === 'DONE' || status === 'CANCELED') {
        return status as AppointmentStatus;
    }

    return null;
}

function isEditPayload(
    body: any
): body is Extract<PatchBody, { clientId: string }> {
    return (
        body &&
        typeof body === 'object' &&
        'clientId' in body &&
        'unitId' in body &&
        'professionalId' in body &&
        'serviceId' in body &&
        'scheduleAt' in body
    );
}

function parseISODate(value: unknown): Date | null {
    const s = normalizeString(value);
    if (!s) return null;
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return null;
    return d;
}

/* ---------------------------------------------------------
 * ✅ Decimal-safe helpers (evita NaN quando vem Prisma.Decimal)
 * ---------------------------------------------------------*/
function toNumberDecimal(v: unknown): number {
    if (v == null) return NaN;
    if (typeof v === 'number') return v;

    if (typeof v === 'string') {
        const n = Number(v.replace(',', '.'));
        return Number.isFinite(n) ? n : NaN;
    }

    if (typeof v === 'object') {
        const anyObj = v as any;

        if (typeof anyObj.toNumber === 'function') {
            const n = anyObj.toNumber();
            return Number.isFinite(n) ? n : NaN;
        }

        if (typeof anyObj.toString === 'function') {
            const n = Number(String(anyObj.toString()).replace(',', '.'));
            return Number.isFinite(n) ? n : NaN;
        }
    }

    return NaN;
}

function money(n: unknown): number {
    const v = toNumberDecimal(n);
    if (!Number.isFinite(v)) return 0;
    return Math.round((v + Number.EPSILON) * 100) / 100;
}

function pct(n: unknown): number {
    const v = toNumberDecimal(n);
    if (!Number.isFinite(v)) return 0;
    return Math.max(0, Math.min(100, v));
}

export async function PATCH(request: Request, ctx: Ctx) {
    try {
        const session = await requireAdminForModule('APPOINTMENTS');

        const companyId = session.companyId;
        if (!companyId)
            return jsonErr('Empresa não encontrada na sessão.', 401);

        const userId = session.id; // AdminSession usa `id`
        if (!userId) return jsonErr('Usuário não encontrado na sessão.', 401);

        const canSeeAllUnits = session.canSeeAllUnits;

        // ✅ Next params é Promise
        const { appointmentId: appointmentIdRaw } = await ctx.params;
        const appointmentId = normalizeString(appointmentIdRaw);
        if (!appointmentId) return jsonErr('appointmentId é obrigatório.', 400);

        const body = (await request
            .json()
            .catch(() => null)) as PatchBody | null;
        if (!body) return jsonErr('Body inválido.');

        // ✅ carrega appointment garantindo tenant
        const appt = await prisma.appointment.findFirst({
            where: { id: appointmentId, companyId },
            select: {
                id: true,
                unitId: true,
                status: true,

                clientId: true,
                professionalId: true,
                serviceId: true,

                // congelados (podem estar null antes de concluir)
                servicePriceAtTheTime: true,
                professionalPercentageAtTheTime: true,
                professionalEarningValue: true,

                // para edição
                scheduleAt: true,
            },
        });

        if (!appt) return jsonErr('Agendamento não encontrado.', 404);

        // =========================
        // 1) Fluxo: concluir/cancelar (legado)
        // =========================
        const nextStatus = resolveNextStatus(body as any);
        if (nextStatus) {
            // ✅ valida acesso do admin na unidade (quando não vê tudo)
            if (!canSeeAllUnits) {
                const hasAccess = await prisma.adminUnitAccess.findFirst({
                    where: { companyId, userId, unitId: appt.unitId },
                    select: { id: true },
                });
                if (!hasAccess)
                    return jsonErr('Sem acesso a esta unidade.', 403);
            }

            // ✅ idempotência básica (mesmo status)
            if (appt.status === nextStatus) {
                // se já estiver DONE, pode haver Order já criado (retornamos se existir)
                if (nextStatus === 'DONE') {
                    const existingOrder = await prisma.order.findFirst({
                        where: {
                            companyId,
                            appointmentId: appt.id,
                        },
                        select: { id: true, status: true, totalAmount: true },
                    });

                    return jsonOk({
                        id: appt.id,
                        status: appt.status,
                        order: existingOrder
                            ? {
                                  id: existingOrder.id,
                                  status: existingOrder.status,
                                  totalAmount: existingOrder.totalAmount,
                              }
                            : null,
                        orderCreated: false,
                    });
                }

                return jsonOk({ id: appt.id, status: appt.status });
            }

            // ✅ Transições
            if (nextStatus === 'CANCELED') {
                const now = new Date();

                const updated = await prisma.appointment.update({
                    where: { id: appt.id },
                    data: {
                        status: 'CANCELED',
                        cancelledAt: now,
                        cancelledByRole: 'ADMIN',
                        cancelledByUserId: userId,
                    },
                    select: { id: true, status: true },
                });

                return jsonOk({ id: updated.id, status: updated.status });
            }

            if (nextStatus === 'DONE') {
                // ✅ ao concluir: cria Order + OrderItem (idempotente)
                const now = new Date();

                const result = await prisma.$transaction(async (tx) => {
                    // 1) Busca dados necessários do service (se houver)
                    const service = appt.serviceId
                        ? await tx.service.findFirst({
                              where: {
                                  id: appt.serviceId,
                                  companyId,
                              },
                              select: {
                                  id: true,
                                  price: true,
                                  professionalPercentage: true,
                                  isActive: true,
                              },
                          })
                        : null;

                    // 2) Congela preço/percentual no Appointment (se ainda não estiver)
                    const frozenServicePrice =
                        appt.servicePriceAtTheTime != null
                            ? appt.servicePriceAtTheTime
                            : (service?.price ?? null);

                    const frozenPct =
                        appt.professionalPercentageAtTheTime != null
                            ? appt.professionalPercentageAtTheTime
                            : (service?.professionalPercentage ?? null);

                    const frozenPriceNum =
                        frozenServicePrice != null
                            ? money(frozenServicePrice)
                            : 0;

                    const frozenPctNum = frozenPct != null ? pct(frozenPct) : 0;

                    const earningValue =
                        frozenServicePrice != null && frozenPct != null
                            ? money((frozenPriceNum * frozenPctNum) / 100)
                            : null;

                    const updatedAppt = await tx.appointment.update({
                        where: { id: appt.id },
                        data: {
                            status: 'DONE',
                            doneAt: now,
                            concludedByRole: 'ADMIN',
                            concludedByUserId: userId,

                            // congela (se existirem)
                            servicePriceAtTheTime:
                                appt.servicePriceAtTheTime != null
                                    ? undefined
                                    : (frozenServicePrice ?? undefined),
                            professionalPercentageAtTheTime:
                                appt.professionalPercentageAtTheTime != null
                                    ? undefined
                                    : (frozenPct ?? undefined),
                            professionalEarningValue:
                                appt.professionalEarningValue != null
                                    ? undefined
                                    : (earningValue ?? undefined),
                        },
                        select: {
                            id: true,
                            status: true,
                            unitId: true,
                            clientId: true,
                            professionalId: true,
                            serviceId: true,
                        },
                    });

                    // 3) Garante Order único por appointmentId
                    const existingOrder = await tx.order.findFirst({
                        where: {
                            companyId,
                            appointmentId: updatedAppt.id,
                        },
                        select: { id: true },
                    });

                    let orderCreated = false;
                    const orderId = existingOrder?.id
                        ? existingOrder.id
                        : (
                              await tx.order.create({
                                  data: {
                                      companyId,
                                      unitId: updatedAppt.unitId,
                                      appointmentId: updatedAppt.id,

                                      clientId: updatedAppt.clientId ?? null,
                                      professionalId:
                                          updatedAppt.professionalId ?? null,

                                      status: 'PENDING',
                                      totalAmount: 0,
                                  },
                                  select: { id: true },
                              })
                          ).id;

                    if (!existingOrder?.id) orderCreated = true;

                    // 4) Garante OrderItem do serviço (1x) se houver serviceId
                    if (updatedAppt.serviceId) {
                        const alreadyHasServiceItem =
                            await tx.orderItem.findFirst({
                                where: {
                                    companyId,
                                    orderId,
                                    serviceId: updatedAppt.serviceId,
                                },
                                select: { id: true },
                            });

                        if (!alreadyHasServiceItem) {
                            // usa o congelado como fonte
                            const unitPrice =
                                frozenServicePrice ?? service?.price;

                            // se não tiver nada, não cria item (evita Decimal null)
                            if (unitPrice != null) {
                                await tx.orderItem.create({
                                    data: {
                                        companyId,
                                        orderId,
                                        serviceId: updatedAppt.serviceId,
                                        quantity: 1,
                                        unitPrice: unitPrice as any,
                                        totalPrice: unitPrice as any,
                                    },
                                    select: { id: true },
                                });
                            }
                        }
                    }

                    // 5) Atualiza totalAmount (soma itens)
                    const items = await tx.orderItem.findMany({
                        where: { companyId, orderId },
                        select: { totalPrice: true },
                    });

                    const total = money(
                        (items ?? []).reduce(
                            (sum, it) => sum + money(it.totalPrice),
                            0
                        )
                    );

                    const updatedOrder = await tx.order.update({
                        where: { id: orderId },
                        data: {
                            totalAmount: total as any,
                        },
                        select: { id: true, status: true, totalAmount: true },
                    });

                    return {
                        appointment: updatedAppt,
                        order: updatedOrder,
                        orderCreated,
                    };
                });

                return jsonOk({
                    id: result.appointment.id,
                    status: result.appointment.status,
                    order: result.order,
                    orderCreated: result.orderCreated,
                });
            }

            // fallback (teórico)
            const updated = await prisma.appointment.update({
                where: { id: appt.id },
                data: { status: nextStatus },
                select: { id: true, status: true },
            });

            return jsonOk({ id: updated.id, status: updated.status });
        }

        // =========================
        // 2) Fluxo: edição completa
        // =========================
        if (!isEditPayload(body)) {
            return jsonErr(
                'Body inválido. Use { action: "cancel" | "done" } para status, ou envie dados de edição (clientId, unitId, professionalId, serviceId, scheduleAt...).',
                400
            );
        }

        // (opcional, mas recomendado) só edita se estiver pendente
        if (appt.status !== 'PENDING') {
            return jsonErr('Só é possível editar agendamentos pendentes.', 400);
        }

        const clientId = normalizeString(body.clientId);
        const clientName = normalizeString(body.clientName);
        const phone = normalizeString(body.phone);

        const unitId = normalizeString(body.unitId);
        const professionalId = normalizeString(body.professionalId);
        const serviceId = normalizeString(body.serviceId);

        const scheduleAt = parseISODate(body.scheduleAt);
        if (!scheduleAt) return jsonErr('scheduleAt inválido.', 400);

        if (!clientId) return jsonErr('clientId é obrigatório.', 400);
        if (!clientName) return jsonErr('clientName é obrigatório.', 400);
        if (!phone) return jsonErr('phone é obrigatório.', 400);

        if (!unitId) return jsonErr('unitId é obrigatório.', 400);
        if (!professionalId)
            return jsonErr('professionalId é obrigatório.', 400);
        if (!serviceId) return jsonErr('serviceId é obrigatório.', 400);

        // ✅ valida acesso à unidade destino (quando não vê tudo)
        if (!canSeeAllUnits) {
            const hasAccess = await prisma.adminUnitAccess.findFirst({
                where: { companyId, userId, unitId },
                select: { id: true },
            });
            if (!hasAccess) return jsonErr('Sem acesso a esta unidade.', 403);
        }

        // ✅ valida client (no seu projeto, CLIENT é User com membership na empresa)
        const clientUser = await prisma.user.findFirst({
            where: {
                id: clientId,
                isActive: true,
                companyMemberships: {
                    some: {
                        companyId,
                        isActive: true,
                        role: 'CLIENT',
                    },
                },
            },
            select: { id: true },
        });
        if (!clientUser) return jsonErr('Cliente não encontrado.', 404);

        // ✅ valida professional (tenant)
        const professional = await prisma.professional.findFirst({
            where: { id: professionalId, companyId },
            select: { id: true, isActive: true },
        });
        if (!professional) return jsonErr('Profissional não encontrado.', 404);
        if (professional.isActive === false)
            return jsonErr('Profissional inativo.', 400);

        // ✅ valida service (tenant + ativo + unidade compatível)
        const service = await prisma.service.findFirst({
            where: { id: serviceId, companyId },
            select: {
                id: true,
                name: true,
                isActive: true,
                unitId: true, // nullable
            },
        });
        if (!service) return jsonErr('Serviço não encontrado.', 404);
        if (service.isActive === false) return jsonErr('Serviço inativo.', 400);
        if (service.unitId && service.unitId !== unitId) {
            return jsonErr(
                'Este serviço não pertence à unidade selecionada.',
                400
            );
        }

        // ✅ valida conflito simples: mesmo profissional no mesmo horário (evita colisão básica)
        const sameSlot = await prisma.appointment.findFirst({
            where: {
                companyId,
                id: { not: appt.id },
                status: 'PENDING',
                professionalId,
                scheduleAt,
            },
            select: { id: true },
        });
        if (sameSlot) {
            return jsonErr('Horário indisponível para este profissional.', 400);
        }

        const description =
            normalizeString((body as any).description) ||
            service.name ||
            'Atendimento';

        const updated = await prisma.appointment.update({
            where: { id: appt.id },
            data: {
                clientId,
                clientName,
                phone,

                unitId,
                professionalId,
                serviceId,

                description,
                scheduleAt,
            },
            select: {
                id: true,
                status: true,
                unitId: true,
                professionalId: true,
                serviceId: true,
                scheduleAt: true,
            },
        });

        return jsonOk(updated);
    } catch (err: any) {
        return jsonErr(err?.message ?? 'Erro interno.', 500);
    }
}
