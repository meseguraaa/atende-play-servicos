// src/app/api/admin/settings/units/[unitId]/exceptions/[exceptionId]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdminForModule } from '@/lib/admin-permissions';

export const dynamic = 'force-dynamic';

function jsonOk<T>(data: T, init?: ResponseInit) {
    return NextResponse.json({ ok: true, data } as const, init);
}

function jsonErr(error: string, status = 400) {
    return NextResponse.json({ ok: false, error } as const, { status });
}

/**
 * Next 15/14: ctx.params pode vir como Promise (sync-dynamic-apis)
 */
type Ctx =
    | { params: { unitId: string; exceptionId: string } }
    | { params: Promise<{ unitId: string; exceptionId: string }> };

async function getParams(ctx: Ctx) {
    const p = (ctx as any).params;
    return typeof p?.then === 'function'
        ? ((await p) as { unitId: string; exceptionId: string })
        : (p as { unitId: string; exceptionId: string });
}

/**
 * DELETE /api/admin/settings/units/:unitId/exceptions/:exceptionId
 *
 * Remove uma exceção (pausa/bloqueio) do dia.
 * Aqui, exceptionId é o ID do UnitDailyAvailability retornado no GET.
 *
 * Regras:
 * - precisa ter módulo SETTINGS
 * - somente owner pode deletar
 * - garante que a unidade pertence à company do admin
 */
export async function DELETE(_req: Request, ctx: Ctx) {
    try {
        const admin = await requireAdminForModule('SETTINGS');

        // 🔒 só owner remove exceção (por enquanto)
        if (!admin.isOwner) {
            return jsonErr('forbidden_owner_only', 403);
        }

        const { unitId: rawUnitId, exceptionId: rawExceptionId } =
            await getParams(ctx);

        const unitId = String(rawUnitId ?? '').trim();
        const exceptionId = String(rawExceptionId ?? '').trim();

        if (!unitId) return jsonErr('unit_id_required', 400);
        if (!exceptionId) return jsonErr('exception_id_required', 400);

        // garante que a unidade pertence à company do admin
        const unit = await prisma.unit.findFirst({
            where: { id: unitId, companyId: admin.companyId },
            select: { id: true },
        });

        if (!unit) return jsonErr('unit_not_found', 404);

        // busca a exceção dentro da unidade (e company do admin)
        const existing = await prisma.unitDailyAvailability.findFirst({
            where: {
                id: exceptionId,
                unitId: unitId,
                companyId: admin.companyId,
            },
            select: { id: true },
        });

        if (!existing) return jsonErr('exception_not_found', 404);

        // ✅ À prova de FK: apaga intervalos e depois o "dia" (transaction)
        await prisma.$transaction([
            prisma.unitDailyTimeInterval.deleteMany({
                where: { dailyAvailabilityId: existing.id },
            }),
            prisma.unitDailyAvailability.delete({
                where: { id: existing.id },
            }),
        ]);

        return jsonOk({ id: existing.id });
    } catch (err) {
        console.error(
            '[DELETE /api/admin/settings/units/:unitId/exceptions/:exceptionId]',
            err
        );
        return jsonErr('internal_error', 500);
    }
}
