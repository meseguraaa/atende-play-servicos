// src/app/api/mobile/auth/signup/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { signAppJwt } from '@/lib/app-jwt';
import bcrypt from 'bcryptjs';

/* ---------------------------------------------------------
 * Helpers
 * --------------------------------------------------------- */
function jsonErr(message: string, status = 400) {
    return NextResponse.json({ ok: false, error: message }, { status });
}

function jsonOk(data: unknown, status = 200) {
    return NextResponse.json({ ok: true, data }, { status });
}

function normalizeString(v: unknown): string {
    return String(v ?? '').trim();
}

function onlyDigits(v: string) {
    return v.replace(/\D+/g, '');
}

function parseBirthdayBR(v: string): Date | null {
    // espera dd/mm/yyyy
    const [dd, mm, yyyy] = String(v || '').split('/');
    if (!dd || !mm || !yyyy) return null;

    const d = Number(dd);
    const m = Number(mm);
    const y = Number(yyyy);

    if (!Number.isFinite(d) || !Number.isFinite(m) || !Number.isFinite(y)) {
        return null;
    }

    // sanity checks
    if (y < 1900 || y > 2100) return null;
    if (m < 1 || m > 12) return null;
    if (d < 1 || d > 31) return null;

    // cria e valida se não “estourou” mês/dia (ex: 31/02)
    const date = new Date(y, m - 1, d);
    if (Number.isNaN(date.getTime())) return null;

    if (
        date.getFullYear() !== y ||
        date.getMonth() !== m - 1 ||
        date.getDate() !== d
    ) {
        return null;
    }

    return date;
}

function computeProfileComplete(u: {
    phone: string | null;
    birthday: Date | null;
}) {
    const phoneOk = typeof u.phone === 'string' && u.phone.trim().length > 0;
    const birthdayOk =
        u.birthday instanceof Date && !Number.isNaN(u.birthday.getTime());
    return phoneOk && birthdayOk;
}

/**
 * ✅ Padrão de senha (igual ao fluxo de profissional)
 * - mínimo 6
 * - 1 maiúscula
 * - 1 número
 * - 1 especial na whitelist: !@#$%^&*()_+-=[];':",.<>/?\|
 */
const PASSWORD_REGEX =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\];':",.<>\/?\|]).{6,}$/;

function isStrongPassword(pw: string) {
    return PASSWORD_REGEX.test(String(pw || ''));
}

function passwordRuleMessage() {
    return 'A senha deve ter no mínimo 6 caracteres, incluindo 1 letra maiúscula, 1 número e 1 caractere especial.';
}

/* ---------------------------------------------------------
 * POST /api/mobile/auth/signup
 * --------------------------------------------------------- */
export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => null);
        if (!body || typeof body !== 'object') {
            return jsonErr('Body inválido');
        }

        const name = normalizeString((body as any).name);
        const email = normalizeString((body as any).email).toLowerCase();
        const phoneRaw = normalizeString((body as any).phone);
        const birthdayRaw = normalizeString((body as any).birthday);
        const password = normalizeString((body as any).password);
        const companyId = normalizeString((body as any).companyId);

        if (!companyId) {
            return jsonErr('companyId é obrigatório');
        }

        if (!name || name.length < 2) {
            return jsonErr('Nome inválido');
        }

        if (!email || !email.includes('@')) {
            return jsonErr('Email inválido');
        }

        // ✅ senha forte (novo padrão)
        if (!isStrongPassword(password)) {
            return jsonErr(passwordRuleMessage());
        }

        const phoneDigits = onlyDigits(phoneRaw);
        if (phoneDigits.length !== 11) {
            return jsonErr('Telefone inválido');
        }

        const birthday = parseBirthdayBR(birthdayRaw);
        if (!birthday) {
            return jsonErr('Data de nascimento inválida');
        }

        /* -------------------------------------------------
         * Verificações
         * ------------------------------------------------- */
        const company = await prisma.company.findUnique({
            where: { id: companyId },
            select: { id: true, isActive: true },
        });

        if (!company || !company.isActive) {
            return jsonErr('Empresa inválida ou inativa');
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
            select: { id: true },
        });

        if (existingUser) {
            return jsonErr('Já existe uma conta com este email');
        }

        /* -------------------------------------------------
         * Criação do usuário
         * ------------------------------------------------- */
        const passwordHash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone: phoneDigits,
                birthday,
                passwordHash,
                role: 'CLIENT',
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                birthday: true,
                role: true,
            },
        });

        /* -------------------------------------------------
         * Vínculo com a empresa
         * ------------------------------------------------- */
        await prisma.companyMember.create({
            data: {
                companyId,
                userId: user.id,
                role: 'CLIENT',
            },
        });

        const profileComplete = computeProfileComplete({
            phone: user.phone ?? null,
            birthday: user.birthday ?? null,
        });

        /* -------------------------------------------------
         * Token do app (login automático)
         * ------------------------------------------------- */
        const token = await signAppJwt({
            sub: user.id,
            role: 'CLIENT',
            companyId,
            email: user.email,
            name: user.name ?? null,
            profile_complete: profileComplete,
        });

        return jsonOk({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                birthday: user.birthday,
                role: user.role,
                companyId,
                profileComplete,
            },
        });
    } catch (err) {
        console.error('[signup]', err);
        return jsonErr('Erro inesperado ao criar conta', 500);
    }
}
