// app/(auth)/login.tsx
import { useMemo, useState } from 'react';
import {
    View,
    Text,
    Pressable,
    ActivityIndicator,
    Platform,
    Alert,
    ImageBackground,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { UI, styles } from '../../src/theme/client-theme';
import { useAuth } from '../../src/auth/auth-context';

WebBrowser.maybeCompleteAuthSession();

const API_BASE_URL =
    process.env.EXPO_PUBLIC_API_URL?.trim() ||
    (__DEV__ ? 'http://localhost:3000' : '');

const COMPANY_ID = process.env.EXPO_PUBLIC_COMPANY_ID?.trim() || '';

// ✅ Deep link scheme do app (precisa existir no app config: scheme)
const APP_SCHEME = (process.env.EXPO_PUBLIC_APP_SCHEME || 'atendeplay').trim();

// ✅ redirectUri NATIVO (deep link) para o backend redirecionar de volta pro app
const redirectUri = (() => {
    const native = `${APP_SCHEME}://auth-callback`;

    try {
        return AuthSession.makeRedirectUri({ path: 'auth-callback', native });
    } catch {
        return native;
    }
})();

function safeParseUrl(raw: string): URL | null {
    try {
        return new URL(raw);
    } catch {
        return null;
    }
}

function ensureCompanyIdInSession(session: any, companyId: string) {
    if (!session || typeof session !== 'object') return session;

    const cid = String(companyId || '').trim();
    if (!cid) return session;

    const already =
        String(session?.companyId ?? '').trim() ||
        String(session?.company_id ?? '').trim() ||
        String(session?.tenantId ?? '').trim() ||
        String(session?.tenant_id ?? '').trim() ||
        String(session?.user?.companyId ?? '').trim();

    if (already) return session;

    return {
        ...session,
        companyId: cid,
        user: session.user ? { ...session.user, companyId: cid } : session.user,
    };
}

function normalizeEmail(v: string) {
    return String(v ?? '')
        .trim()
        .toLowerCase();
}

function mapLoginError(codeOrMsg: string) {
    const c = String(codeOrMsg || '').trim();

    if (!c) return 'Não foi possível entrar. Verifique seus dados.';

    // códigos do backend
    if (c === 'missing_company_id') return 'Empresa não informada.';
    if (c === 'missing_email') return 'Informe seu email.';
    if (c === 'missing_password') return 'Informe sua senha.';
    if (c === 'invalid_credentials') return 'Email ou senha inválidos.';
    if (c === 'user_inactive') return 'Usuário inativo.';
    if (c === 'company_not_allowed')
        return 'Você não tem acesso a esta empresa.';
    if (c === 'company_not_found') return 'Empresa não encontrada.';
    if (c === 'company_inactive') return 'Empresa inativa.';
    if (c === 'password_login_not_enabled')
        return 'Este usuário não tem senha cadastrada. Entre com Google ou redefina sua senha.';

    // mensagens genéricas
    return c;
}

function parseBoolish(v: string | null): boolean {
    const s = String(v ?? '').trim();
    if (!s) return false;
    return s === '1' || s.toLowerCase() === 'true' || s.toLowerCase() === 'yes';
}

export default function Login() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { signIn, refreshMe } = useAuth();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    // ✅ NEW: não “congela” o valor na primeira render
    const apiOk = useMemo(() => Boolean(API_BASE_URL), [API_BASE_URL]);
    const companyOk = useMemo(() => Boolean(COMPANY_ID), [COMPANY_ID]);

    const emailOk = useMemo(() => normalizeEmail(email).length > 3, [email]);
    const passOk = useMemo(
        () => String(password ?? '').length >= 1,
        [password]
    );

    async function handleGoogleLogin() {
        if (loading) return;

        try {
            if (!apiOk) return;

            setLoading(true);

            const start = new URL(
                `${API_BASE_URL}/api/mobile/auth/google/start`
            );

            // ✅ manda companyId pro backend (tenant fixo do app)
            if (COMPANY_ID) start.searchParams.set('companyId', COMPANY_ID);

            // ✅ CRÍTICO: redirect_uri precisa ser deep link do app
            start.searchParams.set('redirect_uri', String(redirectUri));

            // ✅ DEBUG: descobrir qual redirect_uri o app está enviando (e a URL final)
            console.log('[GOOGLE] APP_SCHEME:', APP_SCHEME);
            console.log('[GOOGLE] COMPANY_ID:', COMPANY_ID);
            console.log('[GOOGLE] redirect_uri:', String(redirectUri));
            console.log('[GOOGLE] startUrl:', start.toString());

            const result = await WebBrowser.openAuthSessionAsync(
                start.toString(),
                String(redirectUri),
                { preferEphemeralSession: Platform.OS === 'ios' }
            );

            if (result.type !== 'success' || !result.url) return;

            const url = safeParseUrl(result.url);
            if (!url) return;

            // ✅ auth-redirect devolve token JWT e params extras
            const token = String(url.searchParams.get('token') || '').trim();

            // ✅ companyId resolve com prioridade do redirect; cai no env se faltar
            const resolvedCompanyId =
                String(url.searchParams.get('companyId') || '').trim() ||
                COMPANY_ID;

            const error = String(url.searchParams.get('error') || '').trim();
            const message = String(
                url.searchParams.get('message') || ''
            ).trim();

            if (error) {
                Alert.alert('Login', message || mapLoginError(error));
                return;
            }

            if (!token) {
                Alert.alert(
                    'Login',
                    'Não recebemos o token do login. Tente novamente.'
                );
                return;
            }

            const profile_complete = parseBoolish(
                url.searchParams.get('profile_complete')
            );

            // ✅ payload compatível com o que suas rotas mobile esperam
            const payload = ensureCompanyIdInSession(
                {
                    token,
                    companyId: resolvedCompanyId || null,
                    profile_complete,
                },
                resolvedCompanyId
            );

            await signIn(JSON.stringify(payload));
            await refreshMe();
        } catch {
            Alert.alert('Login', 'Erro inesperado ao autenticar.');
        } finally {
            setLoading(false);
        }
    }

    async function handleEmailLogin() {
        if (loading) return;

        const e = normalizeEmail(email);
        const p = String(password ?? '');

        if (!apiOk) return;

        if (!COMPANY_ID) {
            Alert.alert(
                'Login',
                'Empresa não configurada no app (EXPO_PUBLIC_COMPANY_ID).'
            );
            return;
        }

        if (!e) {
            Alert.alert('Login', 'Informe seu email.');
            return;
        }
        if (!p) {
            Alert.alert('Login', 'Informe sua senha.');
            return;
        }

        try {
            setLoading(true);

            const endpoint = `${API_BASE_URL}/api/mobile/auth/login`;

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-company-id': COMPANY_ID,
                },
                body: JSON.stringify({
                    email: e,
                    password: p,
                    companyId: COMPANY_ID,
                }),
            });

            let json: any = null;
            try {
                json = await res.json();
            } catch {
                json = null;
            }

            const ok = Boolean(res.ok) && Boolean(json?.ok !== false);
            if (!ok) {
                const raw =
                    String(json?.error ?? json?.message ?? '').trim() ||
                    (res.status ? `HTTP_${res.status}` : '');
                Alert.alert('Login', mapLoginError(raw));
                return;
            }

            const payloadRaw = json?.data ?? json;
            const payload = ensureCompanyIdInSession(payloadRaw, COMPANY_ID);

            await signIn(JSON.stringify(payload));
            await refreshMe();
        } catch {
            Alert.alert('Login', 'Erro inesperado ao entrar.');
        } finally {
            setLoading(false);
        }
    }

    function handleForgotPassword() {
        router.push('/(auth)/forgot-password');
    }

    function handleGoSignup() {
        router.push('/(auth)/signup');
    }

    const keyboardOffset =
        UI.spacing.headerH + insets.top + (Platform.OS === 'ios' ? 8 : 0);

    const canSignup = apiOk && !loading;
    const canLogin = apiOk && companyOk && emailOk && passOk && !loading;

    return (
        <View style={styles.screen}>
            <StatusBar style="light" backgroundColor={UI.brand.primary} />

            <View
                pointerEvents="none"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: insets.top + 2,
                    backgroundColor: UI.brand.primary,
                }}
            />

            <View
                style={[
                    styles.header,
                    {
                        height: UI.spacing.headerH + insets.top,
                        paddingTop: insets.top,
                    },
                ]}
            >
                <View style={styles.headerTitleWrap}>
                    <FontAwesome5
                        name="cut"
                        size={18}
                        color={UI.colors.white}
                    />
                    <Text style={styles.headerTitle}>{UI.brand.name}</Text>
                </View>
            </View>

            <ImageBackground
                source={require('../../assets/images/home.png')}
                resizeMode="cover"
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.55)' }}>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        keyboardVerticalOffset={keyboardOffset}
                    >
                        <ScrollView
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: 'flex-end',
                                paddingTop: 24,
                                paddingBottom:
                                    24 + (insets.bottom ? insets.bottom : 0),
                            }}
                            keyboardShouldPersistTaps="handled"
                            keyboardDismissMode={
                                Platform.OS === 'ios' ? 'interactive' : 'none'
                            }
                            showsVerticalScrollIndicator={false}
                            contentInsetAdjustmentBehavior={
                                Platform.OS === 'ios' ? 'never' : undefined
                            }
                        >
                            <View
                                style={[
                                    styles.body,
                                    {
                                        paddingBottom: 0,
                                    },
                                ]}
                            >
                                <View style={[styles.card, UI.shadow.card]}>
                                    <Text
                                        style={[
                                            styles.title,
                                            { textAlign: 'center' },
                                        ]}
                                    >
                                        Acesse sua conta
                                    </Text>

                                    <View style={{ gap: 10, marginTop: 12 }}>
                                        <TextInput
                                            placeholder="Email"
                                            placeholderTextColor="rgba(255,255,255,0.6)"
                                            value={email}
                                            onChangeText={setEmail}
                                            style={local.input}
                                            editable={!loading}
                                            autoCapitalize="none"
                                            keyboardType="email-address"
                                            returnKeyType="next"
                                        />

                                        <View style={{ position: 'relative' }}>
                                            <TextInput
                                                placeholder="Senha"
                                                placeholderTextColor="rgba(255,255,255,0.6)"
                                                value={password}
                                                onChangeText={setPassword}
                                                secureTextEntry={!showPass}
                                                style={local.input}
                                                editable={!loading}
                                                returnKeyType="done"
                                                onSubmitEditing={() => {
                                                    if (canLogin) {
                                                        handleEmailLogin();
                                                    }
                                                }}
                                            />

                                            <Pressable
                                                onPress={() =>
                                                    setShowPass((v) => !v)
                                                }
                                                style={local.eyeBtn}
                                                hitSlop={10}
                                                disabled={loading}
                                            >
                                                <FontAwesome5
                                                    name={
                                                        showPass
                                                            ? 'eye-slash'
                                                            : 'eye'
                                                    }
                                                    size={14}
                                                    color="#fff"
                                                />
                                            </Pressable>
                                        </View>

                                        <Pressable
                                            onPress={handleEmailLogin}
                                            style={({ pressed }) => [
                                                local.loginBtn,
                                                !canLogin && { opacity: 0.55 },
                                                pressed &&
                                                    canLogin && {
                                                        opacity: 0.85,
                                                    },
                                            ]}
                                            disabled={!canLogin}
                                        >
                                            {loading ? (
                                                <ActivityIndicator
                                                    color={
                                                        UI.brand.primaryText ??
                                                        UI.colors.white
                                                    }
                                                />
                                            ) : (
                                                <Text
                                                    style={local.loginBtnText}
                                                >
                                                    Entrar
                                                </Text>
                                            )}
                                        </Pressable>

                                        <Pressable
                                            onPress={handleForgotPassword}
                                            style={({ pressed }) => [
                                                local.forgotBtn,
                                                pressed && { opacity: 0.85 },
                                                loading && { opacity: 0.6 },
                                            ]}
                                            hitSlop={10}
                                            disabled={loading}
                                        >
                                            <Text style={local.linkText}>
                                                Esqueci minha senha
                                            </Text>
                                        </Pressable>
                                    </View>

                                    <View style={{ marginVertical: 14 }}>
                                        <Pressable
                                            onPress={handleGoogleLogin}
                                            style={[
                                                styles.providerBtnFull,
                                                loading && { opacity: 0.7 },
                                            ]}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <ActivityIndicator
                                                    color={
                                                        UI.brand.primaryText ??
                                                        UI.colors.white
                                                    }
                                                />
                                            ) : (
                                                <AntDesign
                                                    name="google"
                                                    size={20}
                                                    color="#DB4437"
                                                />
                                            )}

                                            <Text
                                                style={
                                                    styles.providerBtnFullText
                                                }
                                            >
                                                Continuar com Google
                                            </Text>
                                        </Pressable>
                                    </View>

                                    <Pressable
                                        onPress={handleGoSignup}
                                        style={({ pressed }) => [
                                            local.signupBtn,
                                            !canSignup && { opacity: 0.55 },
                                            pressed &&
                                                canSignup && { opacity: 0.85 },
                                        ]}
                                        disabled={!canSignup}
                                    >
                                        <Text style={local.signupBtnText}>
                                            Faça seu cadastro
                                        </Text>
                                    </Pressable>

                                    {__DEV__ && (!apiOk || !companyOk) ? (
                                        <View style={{ marginTop: 12 }}>
                                            {!apiOk ? (
                                                <Text style={styles.subtitle}>
                                                    Configure
                                                    EXPO_PUBLIC_API_URL
                                                </Text>
                                            ) : null}
                                            {!companyOk ? (
                                                <Text style={styles.subtitle}>
                                                    Configure
                                                    EXPO_PUBLIC_COMPANY_ID
                                                </Text>
                                            ) : null}
                                        </View>
                                    ) : null}
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </ImageBackground>
        </View>
    );
}

const local = {
    input: {
        height: 48,
        borderRadius: 12,
        paddingHorizontal: 14,
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.22)',
        color: '#fff',
    },
    eyeBtn: {
        position: 'absolute' as const,
        right: 14,
        top: 14,
    },

    forgotBtn: {
        alignSelf: 'flex-end' as const,
        marginTop: 8,
        marginBottom: 12,
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    linkText: {
        color: '#fff',
        fontSize: 13,
        textDecorationLine: 'underline' as const,
    },

    loginBtn: {
        height: 48,
        borderRadius: 12,
        backgroundColor: UI.brand.primary,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        marginTop: 6,
    },
    loginBtnText: {
        color: UI.colors.white,
        fontSize: 15,
        fontWeight: '800' as const,
        letterSpacing: 0.2,
    },

    signupBtn: {
        height: 48,
        borderRadius: 12,
        backgroundColor: UI.brand.primary,
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
    },
    signupBtnText: {
        color: UI.colors.white,
        fontSize: 15,
        fontWeight: '700' as const,
    },
};
