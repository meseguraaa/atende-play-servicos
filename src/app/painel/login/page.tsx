// src/app/painel/login/page.tsx
import { loginPainel } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { headers } from 'next/headers';

type ErrorCode =
    | 'credenciais'
    | 'permissao'
    | 'missing_company'
    | 'missing_unit'
    | 'tenant_not_found'
    | 'desconhecido'
    | undefined;

function getErrorMessage(code: ErrorCode): string | null {
    if (!code) return null;

    switch (code) {
        case 'credenciais':
            return 'E-mail ou senha inválidos.';
        case 'permissao':
            return 'Você não tem permissão para acessar este painel.';
        case 'missing_company':
            return 'Sua conta não tem vínculo com esta empresa.';
        case 'missing_unit':
            return 'Sua conta admin não tem unidade vinculada nesta empresa.';
        case 'tenant_not_found':
            return 'Não foi possível identificar a empresa pelo subdomínio.';
        case 'desconhecido':
        default:
            return 'Ocorreu um erro ao fazer login. Tente novamente.';
    }
}

export default async function PainelLoginPage({
    searchParams,
}: {
    searchParams?: Promise<{ error?: string }>;
}) {
    const sp = (await searchParams) ?? {};
    const rawError = (sp.error ?? '') as ErrorCode;

    // ✅ Em DEV (localhost), não "prende" o usuário com tenant_not_found na URL
    const host = (await headers()).get('host') ?? '';
    const isLocalhost =
        host.includes('localhost') || host.startsWith('127.0.0.1');

    const error: ErrorCode =
        isLocalhost && rawError === 'tenant_not_found' ? undefined : rawError;

    const errorMessage = getErrorMessage(error);

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-lg rounded-2xl bg-background-secondary border border-border-primary shadow-lg px-8 py-10 space-y-8">
                <header className="space-y-2">
                    <h1 className="text-title text-content-primary">
                        Acesse sua conta
                    </h1>
                    <p className="text-paragraph-small text-content-tertiary">
                        Painel disponível apenas para <b>Administradores</b> e{' '}
                        <b>Profissionais</b>.
                    </p>
                </header>

                {errorMessage && (
                    <div className="text-paragraph-small text-destructive bg-destructive/10 border border-destructive/40 rounded-md px-3 py-2">
                        {errorMessage}
                    </div>
                )}

                <form action={loginPainel} className="space-y-5">
                    <div className="space-y-2">
                        <Label
                            htmlFor="email"
                            className="text-label-small text-content-secondary"
                        >
                            E-mail
                        </Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            placeholder="Seu e-mail"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label
                            htmlFor="password"
                            className="text-label-small text-content-secondary"
                        >
                            Senha
                        </Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            placeholder="Sua senha"
                        />
                    </div>

                    <Button type="submit" className="w-full" variant="brand">
                        Entrar
                    </Button>
                </form>
            </div>
        </div>
    );
}
