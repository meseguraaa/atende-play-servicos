// src/lib/whatsapp-cloud.ts
type WhatsAppSendTextParams = {
    to: string; // número/wa_id no formato internacional sem "+" (ex: 5511999999999)
    text: string;
    previewUrl?: boolean;
};

type WhatsAppSendResult =
    | { ok: true; messageId?: string; raw?: any }
    | { ok: false; error: string; status?: number; raw?: any };

function getEnv(name: string): string {
    const v = process.env[name];
    if (!v) throw new Error(`Missing env: ${name}`);
    return v;
}

function graphBaseUrl() {
    const version = process.env.WHATSAPP_GRAPH_VERSION || 'v24.0';
    return `https://graph.facebook.com/${version}`;
}

/**
 * Envia mensagem de texto (WhatsApp Cloud API).
 * Requisitos de env:
 * - WHATSAPP_ACCESS_TOKEN
 * - WHATSAPP_PHONE_NUMBER_ID
 * Opcional:
 * - WHATSAPP_GRAPH_VERSION (default: v24.0)
 */
export async function whatsappSendText(
    params: WhatsAppSendTextParams
): Promise<WhatsAppSendResult> {
    try {
        const token = getEnv('WHATSAPP_ACCESS_TOKEN');
        const phoneNumberId = getEnv('WHATSAPP_PHONE_NUMBER_ID');

        const url = `${graphBaseUrl()}/${phoneNumberId}/messages`;

        const payload = {
            messaging_product: 'whatsapp',
            to: params.to,
            type: 'text',
            text: {
                body: params.text,
                preview_url: params.previewUrl ?? false,
            },
        };

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const raw = await res.json().catch(() => null);

        if (!res.ok) {
            const errMsg =
                raw?.error?.message ||
                raw?.message ||
                `WhatsApp API error (status ${res.status})`;
            return { ok: false, error: errMsg, status: res.status, raw };
        }

        const messageId: string | undefined = raw?.messages?.[0]?.id;
        return { ok: true, messageId, raw };
    } catch (e: any) {
        return { ok: false, error: e?.message || 'Unknown error' };
    }
}

/**
 * Normaliza telefone:
 * - remove tudo que não é número
 * - remove "+" se existir
 */
export function normalizeWaPhone(input: string): string {
    return (input || '').replace(/[^\d]/g, '');
}
