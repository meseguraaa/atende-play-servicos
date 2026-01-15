// src/app/api/admin/checkout/orders/[orderId]/cancel/route.ts
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';

type CancelOrderResponse =
    | {
          ok: true;
          data: {
              orderId: string;
              status: 'CANCELED';
              canceledAt: string; // ISO
              inventoryRevertedAt: string | null; // ISO | null
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
): NextResponse<CancelOrderResponse> {
    return NextResponse.json({ ok: false, error: message } as const, {
        status,
    });
}

function jsonOk(
    data: Extract<CancelOrderResponse, { ok: true }>['data'],
    status = 200
): NextResponse<CancelOrderResponse> {
    return NextResponse.json({ ok: true, data } as const, { status });
}

export async function PATCH(
    _request: Request,
    ctx: Ctx
): Promise<NextResponse<CancelOrderResponse>> {
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
                inventoryRevertedAt: true,
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
        if (order.status === 'CANCELED') {
            // idempotência
            return jsonOk({
                orderId: order.id,
                status: 'CANCELED',
                canceledAt: new Date().toISOString(),
                inventoryRevertedAt: order.inventoryRevertedAt
                    ? order.inventoryRevertedAt.toISOString()
                    : null,
            });
        }

        if (order.status === 'COMPLETED') {
            return jsonErr(
                'Não é possível cancelar um pedido já concluído.',
                400
            );
        }

        if (order.status !== 'PENDING' && order.status !== 'PENDING_CHECKIN') {
            return jsonErr(
                `Não é possível cancelar pedido com status "${order.status}".`,
                400
            );
        }

        const now = new Date();

        // 4) Cancela pedido
        const updated = await prisma.order.update({
            where: { id: order.id },
            data: {
                status: 'CANCELED',
                expiredAt: now,
                inventoryRevertedAt: order.inventoryRevertedAt ?? now,
            },
            select: { id: true, inventoryRevertedAt: true },
        });

        return jsonOk({
            orderId: updated.id,
            status: 'CANCELED',
            canceledAt: now.toISOString(),
            inventoryRevertedAt: updated.inventoryRevertedAt
                ? updated.inventoryRevertedAt.toISOString()
                : null,
        });
    } catch (err: any) {
        return jsonErr(err?.message ?? 'Erro interno.', 500);
    }
}
