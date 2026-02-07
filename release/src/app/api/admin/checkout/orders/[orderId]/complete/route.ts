// src/app/api/admin/checkout/orders/[orderId]/complete/route.ts
import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';

type CompleteCheckoutResponse =
    | {
          ok: true;
          data: {
              orderId: string;
              status: 'COMPLETED';
              totalAmount: string; // decimal como string
              checkedOutAt: string; // ISO
              appointmentUpdated: boolean;
          };
      }
    | { ok: false; error: string };

type Ctx = {
    params: Promise<{
        orderId: string;
    }>;
};

function normalizeString(v: unknown): string {
    return String(v ?? '').trim();
}

// ✅ Helpers tipados corretamente (mantém ok como literal true/false)
function jsonErr(
    message: string,
    status = 400
): NextResponse<CompleteCheckoutResponse> {
    return NextResponse.json({ ok: false, error: message } as const, {
        status,
    });
}

function jsonOk(
    data: Extract<CompleteCheckoutResponse, { ok: true }>['data'],
    status = 200
): NextResponse<CompleteCheckoutResponse> {
    return NextResponse.json({ ok: true, data } as const, { status });
}

export async function PATCH(
    _request: Request,
    ctx: Ctx
): Promise<NextResponse<CompleteCheckoutResponse>> {
    try {
        const session = await requireAdminForModule('CHECKOUT');

        const companyId = session.companyId;
        if (!companyId)
            return jsonErr('Empresa não encontrada na sessão.', 401);

        const userId = session.id; // AdminSession usa `id`
        if (!userId) return jsonErr('Usuário não encontrado na sessão.', 401);

        const canSeeAllUnits = session.canSeeAllUnits;

        const { orderId: orderIdRaw } = await ctx.params;
        const orderId = normalizeString(orderIdRaw);
        if (!orderId) return jsonErr('orderId é obrigatório.', 400);

        // 1) Carrega pedido (tenant safe)
        const order = await prisma.order.findFirst({
            where: { id: orderId, companyId },
            select: {
                id: true,
                unitId: true,
                status: true,
                appointmentId: true,
                clientId: true,
                professionalId: true,
                totalAmount: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!order) return jsonErr('Pedido não encontrado.', 404);

        // 2) Valida acesso à unidade (quando não vê tudo)
        if (!canSeeAllUnits) {
            const hasAccess = await prisma.adminUnitAccess.findFirst({
                where: { companyId, userId, unitId: order.unitId },
                select: { id: true },
            });
            if (!hasAccess) return jsonErr('Sem acesso a esta unidade.', 403);
        }

        // 3) Regras de transição
        if (order.status === 'COMPLETED') {
            // ✅ idempotência: retorna o "checkedOutAt" real (se existir)
            let checkedOutAtISO = order.updatedAt.toISOString();

            if (order.appointmentId) {
                const appt = await prisma.appointment.findFirst({
                    where: { id: order.appointmentId, companyId },
                    select: { checkedOutAt: true },
                });

                if (appt?.checkedOutAt) {
                    checkedOutAtISO = appt.checkedOutAt.toISOString();
                }
            }

            return jsonOk({
                orderId: order.id,
                status: 'COMPLETED',
                totalAmount: order.totalAmount
                    ? order.totalAmount.toString()
                    : '0',
                checkedOutAt: checkedOutAtISO,
                appointmentUpdated: false,
            });
        }

        if (order.status !== 'PENDING' && order.status !== 'PENDING_CHECKIN') {
            return jsonErr(
                `Não é possível concluir checkout com status "${order.status}".`,
                400
            );
        }

        const now = new Date();

        // 4) Recalcula total a partir dos itens (fonte da verdade)
        const totals = await prisma.orderItem.aggregate({
            where: { orderId: order.id, companyId },
            _sum: { totalPrice: true },
        });

        const totalAmount = totals._sum.totalPrice ?? new Prisma.Decimal(0);

        // 5) Transação: conclui pedido + atualiza agendamento (se houver)
        const result = await prisma.$transaction(async (tx) => {
            const updatedOrder = await tx.order.update({
                where: { id: order.id },
                data: {
                    status: 'COMPLETED',
                    totalAmount,
                },
                select: { id: true, status: true, totalAmount: true },
            });

            let appointmentUpdated = false;

            if (order.appointmentId) {
                const appt = await tx.appointment.findFirst({
                    where: { id: order.appointmentId, companyId },
                    select: {
                        id: true,
                        status: true,
                        checkedOutAt: true,
                    },
                });

                if (appt) {
                    await tx.appointment.update({
                        where: { id: appt.id },
                        data: {
                            checkedOutAt: now,
                            checkedOutByUserId: userId,
                            checkoutFinancialSnapshot: {
                                orderId: order.id,
                                unitId: order.unitId,
                                clientId: order.clientId,
                                professionalId: order.professionalId,
                                totalAmount: totalAmount.toString(),
                                createdAt: order.createdAt.toISOString(),
                                checkedOutAt: now.toISOString(),
                                source: 'admin_checkout_complete',
                            },
                        },
                        select: { id: true },
                    });

                    appointmentUpdated = true;
                }
            }

            return { updatedOrder, appointmentUpdated };
        });

        return jsonOk({
            orderId: result.updatedOrder.id,
            status: 'COMPLETED',
            totalAmount: result.updatedOrder.totalAmount.toString(),
            checkedOutAt: now.toISOString(),
            appointmentUpdated: result.appointmentUpdated,
        });
    } catch (err: any) {
        return jsonErr(err?.message ?? 'Erro interno.', 500);
    }
}
