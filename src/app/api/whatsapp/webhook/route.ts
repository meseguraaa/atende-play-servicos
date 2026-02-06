// src/app/api/whatsapp/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { whatsappSendText, normalizeWaPhone } from '@/lib/whatsapp-cloud';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function jsonOk(data: any = { ok: true }, status = 200) {
    return NextResponse.json(data, { status });
}

function textOk(text: string, status = 200) {
    return new NextResponse(text, {
        status,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}

function getVerifyToken() {
    return process.env.WHATSAPP_VERIFY_TOKEN || '';
}

function normalizeInboundText(input: string) {
    return (input || '').trim();
}

function normalizeInboundChoice(input: string) {
    const t = normalizeInboundText(input).toLowerCase();
    const cleaned = t.replace(/[^\p{L}\p{N}\s]/gu, '').trim();
    return cleaned;
}

function isMenuCommand(cleaned: string) {
    return ['menu', 'voltar', '0', 'inicio', 'início', 'start'].includes(
        cleaned
    );
}

function renderMenu() {
    return [
        '👋 Oi! Como posso te ajudar?',
        '',
        '1) Agendar',
        '2) Reagendar',
        '3) Cancelar',
        '4) Falar com um atendente',
        '',
        'Responda com o número da opção. (Digite “menu” a qualquer momento)',
    ].join('\n');
}

function renderUnknown() {
    return [
        'Não entendi 😅',
        '',
        'Responda com uma opção:',
        '1) Agendar',
        '2) Reagendar',
        '3) Cancelar',
        '4) Falar com um atendente',
        '',
        'Ou digite “menu”.',
    ].join('\n');
}

function renderStartScheduling() {
    return [
        'Beleza! Vamos agendar. ✅',
        '',
        'Primeiro: qual unidade você quer? (ex: “Centro”, “Moema”)',
        'Se preferir, pode mandar o nome ou o número da unidade.',
    ].join('\n');
}

function renderStartReschedule() {
    return [
        'Certo! Vamos reagendar. 🔁',
        '',
        'Me diga qual agendamento você quer reagendar.',
        '(No MVP, já já eu te mostro uma lista para escolher.)',
    ].join('\n');
}

function renderStartCancel() {
    return [
        'Entendi. Vamos cancelar. 🧾',
        '',
        'Me diga qual agendamento você quer cancelar.',
        '(No MVP, já já eu te mostro uma lista para escolher.)',
    ].join('\n');
}

function renderHumanHandoff() {
    return [
        'Show. Vou chamar um atendente. 👤',
        '',
        'Enquanto isso, me diga rapidamente o que você precisa.',
    ].join('\n');
}

// 🔎 log controlado (não vaza token)
function logSendFailure(ctx: {
    phoneNumberId: string;
    fromPhone: string;
    stage: string;
    error?: string;
    status?: number;
    fbCode?: number;
}) {
    console.error('[whatsapp][send_failed]', {
        phoneNumberId: ctx.phoneNumberId,
        to: ctx.fromPhone,
        stage: ctx.stage,
        status: ctx.status,
        fbCode: ctx.fbCode,
        error: ctx.error,
    });
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (!mode || !token || !challenge) return textOk('missing hub params', 400);
    if (mode !== 'subscribe') return textOk('invalid hub.mode', 400);

    const expected = getVerifyToken();
    if (!expected) return textOk('verify token not configured', 500);
    if (token !== expected) return textOk('unauthorized', 401);

    return textOk(challenge, 200);
}

export async function POST(req: NextRequest) {
    let body: any;
    try {
        body = await req.json();
    } catch {
        return jsonOk({ ok: true, ignored: 'invalid json' }, 200);
    }

    const entry0 = body?.entry?.[0];
    const change0 = entry0?.changes?.[0];
    const value = change0?.value;

    if (!value) return jsonOk({ ok: true, ignored: 'no value' }, 200);

    const phoneNumberId: string | undefined = value?.metadata?.phone_number_id;

    // ✅ 1) LOGA STATUS DE ENTREGA (sent/delivered/read/failed)
    if (Array.isArray(value.statuses) && value.statuses.length > 0) {
        for (const st of value.statuses) {
            const status = st?.status;
            const msgId = st?.id;
            const recipient = st?.recipient_id;
            const timestamp = st?.timestamp;
            const errors = st?.errors;

            if (status === 'failed') {
                console.error('[whatsapp][status_failed]', {
                    phoneNumberId,
                    msgId,
                    recipient,
                    timestamp,
                    errors,
                });
            } else {
                console.log('[whatsapp][status]', {
                    phoneNumberId,
                    status,
                    msgId,
                    recipient,
                    timestamp,
                });
            }
        }
        return jsonOk({ ok: true, handled: 'statuses' }, 200);
    }

    const msg = value?.messages?.[0];

    if (!phoneNumberId) {
        console.log('[whatsapp][ignored] missing metadata.phone_number_id');
        return jsonOk(
            { ok: true, ignored: 'missing metadata.phone_number_id' },
            200
        );
    }
    if (!msg) {
        console.log('[whatsapp][ignored] no messages', { phoneNumberId });
        return jsonOk({ ok: true, ignored: 'no messages' }, 200);
    }

    if (msg?.from_me === true || msg?.fromMe === true) {
        console.log('[whatsapp][ignored] from_me', { phoneNumberId });
        return jsonOk({ ok: true, ignored: 'from_me' }, 200);
    }

    const fromPhoneRaw: string | undefined = msg?.from;
    const type: string | undefined = msg?.type;

    if (!fromPhoneRaw) {
        console.log('[whatsapp][ignored] missing msg.from', { phoneNumberId });
        return jsonOk({ ok: true, ignored: 'missing msg.from' }, 200);
    }

    const fromPhone = normalizeWaPhone(fromPhoneRaw);
    console.log('[whatsapp][inbound]', { phoneNumberId, fromPhone, type });

    const channel = await prisma.whatsappChannel.findUnique({
        where: { phoneNumberId },
        select: {
            id: true,
            companyId: true,
            defaultUnitId: true,
            isActive: true,
        },
    });

    if (!channel || !channel.isActive) {
        console.log('[whatsapp][ignored] channel not found or inactive', {
            phoneNumberId,
            found: !!channel,
            isActive: channel?.isActive ?? null,
        });
        return jsonOk(
            {
                ok: true,
                ignored: true,
                ignoredReason: 'channel not found or inactive',
                phoneNumberId,
            },
            200
        );
    }

    let text: string | null = null;
    if (type === 'text') text = msg?.text?.body ?? null;

    if (!text) {
        console.log('[whatsapp][ignored] unsupported type', {
            phoneNumberId,
            type,
        });
        return jsonOk({ ok: true, ignored: `unsupported type: ${type}` }, 200);
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 60 * 1000);

    const existing = await prisma.whatsappSession.findUnique({
        where: { channelId_fromPhone: { channelId: channel.id, fromPhone } },
        select: {
            id: true,
            expiresAt: true,
            stage: true,
            payload: true,
            unitId: true,
        },
    });

    const isExpired = existing
        ? existing.expiresAt.getTime() < now.getTime()
        : true;

    const normalizedText = normalizeInboundChoice(text);
    const wantsMenu = isMenuCommand(normalizedText);

    const currentStage = existing?.stage ?? 'MENU';
    let nextStage: string = currentStage;

    if (isExpired || wantsMenu) nextStage = 'MENU';

    const payload: any = {
        ...(typeof existing?.payload === 'object' && existing?.payload
            ? existing.payload
            : {}),
        lastInboundText: text,
        lastInboundAt: now.toISOString(),
    };

    let replyText: string | null = null;

    if (nextStage === 'MENU') {
        if (
            wantsMenu ||
            normalizedText === '' ||
            normalizedText === 'oi' ||
            normalizedText === 'olá' ||
            normalizedText === 'ola'
        ) {
            replyText = renderMenu();
        } else if (
            normalizedText === '1' ||
            normalizedText === 'agendar' ||
            normalizedText === 'agenda'
        ) {
            nextStage = 'ASK_UNIT';
            replyText = renderStartScheduling();
        } else if (
            normalizedText === '2' ||
            normalizedText === 'reagendar' ||
            normalizedText === 'remarcar'
        ) {
            nextStage = 'RESCHEDULE_SELECT_APPOINTMENT';
            replyText = renderStartReschedule();
        } else if (
            normalizedText === '3' ||
            normalizedText === 'cancelar' ||
            normalizedText === 'cancela'
        ) {
            nextStage = 'CANCEL_SELECT_APPOINTMENT';
            replyText = renderStartCancel();
        } else if (
            normalizedText === '4' ||
            normalizedText.includes('atendente') ||
            normalizedText.includes('humano')
        ) {
            nextStage = 'DONE';
            payload.handoffRequested = true;
            replyText = renderHumanHandoff();
        } else {
            replyText = renderUnknown();
        }
    } else {
        replyText = ['Anotado ✅', '', 'Se quiser voltar, digite “menu”.'].join(
            '\n'
        );
    }

    const session = await prisma.whatsappSession.upsert({
        where: { channelId_fromPhone: { channelId: channel.id, fromPhone } },
        create: {
            channelId: channel.id,
            companyId: channel.companyId,
            fromPhone,
            stage: nextStage as any,
            payload,
            unitId: channel.defaultUnitId ?? null,
            expiresAt,
        },
        update: {
            stage: nextStage as any,
            payload,
            unitId: channel.defaultUnitId ?? existing?.unitId ?? null,
            expiresAt,
        },
        select: { id: true, stage: true, companyId: true, unitId: true },
    });

    let sendResult: any = null;

    if (replyText) {
        sendResult = await whatsappSendText({ to: fromPhone, text: replyText });

        if (!sendResult.ok) {
            logSendFailure({
                phoneNumberId,
                fromPhone,
                stage: String(session.stage),
                error: sendResult.error,
                status: sendResult.status,
                fbCode: sendResult?.raw?.error?.code,
            });
        } else {
            console.log('[whatsapp][sent_ok]', {
                phoneNumberId,
                to: fromPhone,
                stage: String(session.stage),
                messageId: sendResult.messageId,
            });
        }
    }

    return jsonOk({
        ok: true,
        received: true,
        phoneNumberId,
        fromPhone,
        session: {
            id: session.id,
            stage: session.stage,
            companyId: session.companyId,
            unitId: session.unitId,
        },
        send: sendResult,
    });
}
