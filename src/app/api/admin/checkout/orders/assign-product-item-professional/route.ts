// src/app/api/admin/checkout/orders/[orderId]/assign-product-item-professional/route.ts
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';

export const dynamic = 'force-dynamic';

type AssignProductItemProfessionalResponse =
    | {
          ok: true;
          data: {
              orderId: string;
              orderStatus: 'PENDING' | 'PENDING_CHECKIN';
              itemId: string;
              professionalId: string;
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

function jsonErr(
    message: string,
    status = 400
): NextResponse<AssignProductItemProfessionalResponse> {
    return NextResponse.json({ ok: false, error: message } as const, {
        status,
    });
}

function jsonOk(
    data: Extract<AssignProductItemProfessionalResponse, { ok: true }>['data'],
    status = 200
): NextResponse<AssignProductItemProfessionalResponse> {
    return NextResponse.json({ ok: true, data } as const, { status });
}

/**
 * Associa um item de produto (OrderItem com productId != null) a um profissional.
 *
 * Regras:
 * - tenant safe (companyId)
 * - respeita adminUnitAccess quando canSeeAllUnits=false
 * - só permite pedido PENDING/PENDING_CHECKIN
 * - item deve pertencer ao pedido e ser item de produto
 * - profissional deve existir, ser ativo e da mesma empresa
 */
export async function PATCH(
    request: Request,
    ctx: Ctx
): Promise<NextResponse<AssignProductItemProfessionalResponse>> {
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

        const body = await request.json().catch(() => null);
        const itemId = normalizeString(body?.itemId);
        const professionalId = normalizeString(body?.professionalId);

        if (!itemId) return jsonErr('itemId é obrigatório.', 400);
        if (!professionalId)
            return jsonErr('professionalId é obrigatório.', 400);

        // 1) Carrega pedido (tenant safe) e valida acesso à unidade
        const order = await prisma.order.findFirst({
            where: { id: orderId, companyId },
            select: {
                id: true,
                unitId: true,
                status: true,
            },
        });

        if (!order) return jsonErr('Pedido não encontrado.', 404);

        if (!canSeeAllUnits) {
            const hasAccess = await prisma.adminUnitAccess.findFirst({
                where: { companyId, userId, unitId: order.unitId },
                select: { id: true },
            });
            if (!hasAccess) return jsonErr('Sem acesso a esta unidade.', 403);
        }

        // 2) Regras de status
        if (order.status === 'COMPLETED') {
            return jsonErr(
                'Não é possível alterar itens de um pedido pago.',
                400
            );
        }

        if (order.status !== 'PENDING' && order.status !== 'PENDING_CHECKIN') {
            return jsonErr(
                `Não é possível alterar itens de pedido com status "${order.status}".`,
                400
            );
        }

        // 3) Valida profissional (tenant safe)
        const professional = await prisma.professional.findFirst({
            where: { id: professionalId, companyId },
            select: { id: true, isActive: true },
        });

        if (!professional) return jsonErr('Profissional não encontrado.', 404);
        if (!professional.isActive)
            return jsonErr('Profissional inativo.', 400);

        // 4) Transação: valida item e atualiza professionalId
        const result = await prisma.$transaction(async (tx) => {
            // item precisa ser do pedido, da empresa, e ser item de produto
            const item = await tx.orderItem.findFirst({
                where: {
                    id: itemId,
                    companyId,
                    orderId: order.id,
                    productId: { not: null },
                },
                select: {
                    id: true,
                    orderId: true,
                },
            });

            if (!item) {
                throw new Error('Item de produto não encontrado neste pedido.');
            }

            await tx.orderItem.updateMany({
                where: {
                    id: item.id,
                    companyId,
                    orderId: order.id,
                    productId: { not: null },
                },
                data: {
                    professionalId: professional.id,
                },
            });

            return item;
        });

        return jsonOk({
            orderId: result.orderId,
            orderStatus: order.status as 'PENDING' | 'PENDING_CHECKIN',
            itemId: result.id,
            professionalId: professional.id,
        });
    } catch (err: any) {
        const msg = err?.message ?? 'Erro interno.';
        const status = msg.includes('não encontrado') ? 400 : 500;
        return jsonErr(msg, status);
    }
}
