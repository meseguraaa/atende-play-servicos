// src/app/api/admin/checkout/accounts/[clientId]/cancel/route.ts
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';

type CancelAccountResponse =
    | {
          ok: true;
          data: {
              clientId: string;
              canceledCount: number;
              canceledOrderIds: string[];
              alreadyCanceledCount: number;
              skippedCount: number; // por falta de acesso à unidade (quando não vê tudo)
              canceledAt: string; // ISO
          };
      }
    | { ok: false; error: string };

type Ctx = {
    params: Promise<{
        clientId: string;
    }>;
};

function normalizeString(v: unknown): string {
    return String(v ?? '').trim();
}

// ✅ Helpers tipados corretamente (mantém ok como literal true/false)
function jsonErr(
    message: string,
    status = 400
): NextResponse<CancelAccountResponse> {
    return NextResponse.json({ ok: false, error: message } as const, {
        status,
    });
}

function jsonOk(
    data: Extract<CancelAccountResponse, { ok: true }>['data'],
    status = 200
): NextResponse<CancelAccountResponse> {
    return NextResponse.json({ ok: true, data } as const, { status });
}

/**
 * Cancela todos os pedidos PENDING/PENDING_CHECKIN do cliente (escopo tenant).
 * Regras:
 * - tenant safe (companyId)
 * - respeita adminUnitAccess quando canSeeAllUnits=false
 * - idempotente: se não houver nada pendente para cancelar, retorna ok com contagem 0
 * - NÃO cancela COMPLETED
 */
export async function PATCH(
    request: Request,
    ctx: Ctx
): Promise<NextResponse<CancelAccountResponse>> {
    try {
        const session = await requireAdminForModule('CHECKOUT');

        const companyId = session.companyId;
        if (!companyId)
            return jsonErr('Empresa não encontrada na sessão.', 401);

        const userId = session.id; // AdminSession usa `id`
        if (!userId) return jsonErr('Usuário não encontrado na sessão.', 401);

        const canSeeAllUnits = session.canSeeAllUnits;

        const { clientId: clientIdRaw } = await ctx.params;
        const clientId = normalizeString(clientIdRaw);
        if (!clientId) return jsonErr('clientId é obrigatório.', 400);

        // Opcional: permitir enviar orderIds no body pra cancelar exatamente os pedidos da tela
        const body = await request.json().catch(() => null);
        const orderIdsFromBody: string[] =
            body &&
            typeof body === 'object' &&
            Array.isArray((body as any).orderIds)
                ? (body as any).orderIds
                      .map((x: any) => normalizeString(x))
                      .filter(Boolean)
                : [];

        const now = new Date();

        // 1) Buscar pedidos do cliente que podem ser cancelados
        const candidateOrders = await prisma.order.findMany({
            where: {
                companyId,
                clientId,
                id:
                    orderIdsFromBody.length > 0
                        ? { in: orderIdsFromBody }
                        : undefined,
                status: { in: ['PENDING', 'PENDING_CHECKIN'] },
            },
            select: {
                id: true,
                unitId: true,
            },
            orderBy: { createdAt: 'asc' },
        });

        // Idempotência: nada pendente pra cancelar
        if (candidateOrders.length === 0) {
            const alreadyCanceledCount = await prisma.order.count({
                where: {
                    companyId,
                    clientId,
                    id:
                        orderIdsFromBody.length > 0
                            ? { in: orderIdsFromBody }
                            : undefined,
                    status: 'CANCELED',
                },
            });

            return jsonOk({
                clientId,
                canceledCount: 0,
                canceledOrderIds: [],
                alreadyCanceledCount,
                skippedCount: 0,
                canceledAt: now.toISOString(),
            });
        }

        // 2) Se não pode ver tudo, filtra pedidos para unidades que o admin tem acesso
        let allowedOrderIds = candidateOrders.map((o) => o.id);
        let skippedCount = 0;

        if (!canSeeAllUnits) {
            // ✅ FIX: `isActive` não existe em AdminUnitAccessWhereInput
            // Consideramos "ativo" como "registro existente".
            // Se seu schema tiver algo como revokedAt/deletedAt, depois a gente ajusta aqui.
            const accesses = await prisma.adminUnitAccess.findMany({
                where: { companyId, userId },
                select: { unitId: true },
            });

            const allowedUnitIds = new Set(accesses.map((a) => a.unitId));

            const filtered = candidateOrders.filter((o) =>
                allowedUnitIds.has(o.unitId)
            );

            allowedOrderIds = filtered.map((o) => o.id);
            skippedCount = candidateOrders.length - filtered.length;

            if (allowedOrderIds.length === 0) {
                return jsonErr('Sem acesso às unidades desta conta.', 403);
            }
        }

        // 3) Transação: cancela os pedidos permitidos
        const result = await prisma.$transaction(async (tx) => {
            const alreadyCanceledCount = await tx.order.count({
                where: {
                    companyId,
                    clientId,
                    id:
                        orderIdsFromBody.length > 0
                            ? { in: orderIdsFromBody }
                            : undefined,
                    status: 'CANCELED',
                },
            });

            const updated = await tx.order.updateMany({
                where: {
                    companyId,
                    clientId,
                    id: { in: allowedOrderIds },
                    status: { in: ['PENDING', 'PENDING_CHECKIN'] },
                },
                data: {
                    status: 'CANCELED',
                    expiredAt: now,
                    // por enquanto: marca como revertido (quando plugar reversão real, ajustar)
                    inventoryRevertedAt: now,
                },
            });

            // updateMany não devolve ids, então buscamos os ids cancelados no escopo
            const canceled = await tx.order.findMany({
                where: {
                    companyId,
                    clientId,
                    id: { in: allowedOrderIds },
                    status: 'CANCELED',
                },
                select: { id: true },
            });

            return {
                alreadyCanceledCount,
                canceledCount: updated.count,
                canceledOrderIds: canceled.map((x) => x.id),
            };
        });

        return jsonOk({
            clientId,
            canceledCount: result.canceledCount,
            canceledOrderIds: result.canceledOrderIds,
            alreadyCanceledCount: result.alreadyCanceledCount,
            skippedCount,
            canceledAt: now.toISOString(),
        });
    } catch (err: any) {
        return jsonErr(err?.message ?? 'Erro interno.', 500);
    }
}
