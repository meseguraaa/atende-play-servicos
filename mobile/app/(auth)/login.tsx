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
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';

import { UI, styles } from '../../src/theme/client-theme';
import { useAuth } from '../../src/auth/auth-context';

WebBrowser.maybeCompleteAuthSession();

const API_BASE_URL =
    process.env.EXPO_PUBLIC_API_URL?.trim() ||
    (__DEV__ ? 'http://localhost:3000' : '');

// ✅ companyId obrigatório no fluxo mobile (multi-tenant REAL)
const COMPANY_ID = process.env.EXPO_PUBLIC_COMPANY_ID?.trim() || '';

// ✅ redirectUri (deep link do app)
// - Expo Go: exp://.../--/auth
// - Standalone: <scheme>://auth (dependendo do app.json/app.config)
const redirectUri = (() => {
    try {
        return AuthSession.makeRedirectUri({ path: 'auth' });
    } catch {
        // fallback (raro, mas evita crash)
        return 'exp://localhost:8081/--/auth';
    }
})();

function parseSessionParam(value: string): any | null {
    try {
        const decoded = decodeURIComponent(value);
        return JSON.parse(decoded);
    } catch {
        return null;
    }
}

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
        String(session?.user?.companyId ?? '').trim() ||
        String(session?.user?.company?.id ?? '').trim() ||
        String(session?.session?.companyId ?? '').trim() ||
        String(session?.data?.companyId ?? '').trim();

    if (already) return session;

    const next = { ...session };

    next.companyId = cid;

    if (next.user && typeof next.user === 'object') {
        next.user = { ...next.user, companyId: cid };
    }

    if (next.session && typeof next.session === 'object') {
        next.session = { ...next.session, companyId: cid };
        if (next.session.user && typeof next.session.user === 'object') {
            next.session.user = { ...next.session.user, companyId: cid };
        }
    }

    if (next.data && typeof next.data === 'object') {
        next.data = { ...next.data, companyId: cid };
        if (next.data.user && typeof next.data.user === 'object') {
            next.data.user = { ...next.data.user, companyId: cid };
        }
    }

    return next;
}

export default function Login() {
    const insets = useSafeAreaInsets();
    const { signIn, refreshMe } = useAuth();

    const [loading, setLoading] = useState(false);

    const apiOk = useMemo(() => Boolean(API_BASE_URL), []);
    const companyOk = useMemo(() => Boolean(COMPANY_ID), []);

    async function handleGoogleLogin() {
        if (loading) return;

        try {
            if (!apiOk) {
                Alert.alert(
                    'Login',
                    'API do app não configurada (EXPO_PUBLIC_API_URL).'
                );
                return;
            }

            if (!companyOk) {
                Alert.alert(
                    'Login',
                    'Aplicativo sem empresa configurada (EXPO_PUBLIC_COMPANY_ID).'
                );
                return;
            }

            setLoading(true);

            /**
             * ✅ Fluxo: /api/mobile/auth/google/start
             * ⚠️ IMPORTANTE: não faça encode manual no redirect_uri.
             * URLSearchParams já codifica e evita o bug exp%253A... (double-encode).
             */
            const start = new URL(
                `${API_BASE_URL}/api/mobile/auth/google/start`
            );
            start.searchParams.set('companyId', COMPANY_ID);
            start.searchParams.set('redirect_uri', String(redirectUri));

            const result = await WebBrowser.openAuthSessionAsync(
                start.toString(),
                String(redirectUri),
                {
                    // ✅ iOS: melhora dev/test (cookies menos “grudados”)
                    preferEphemeralSession: Platform.OS === 'ios',
                }
            );

            // usuário cancelou/fechou
            if (result.type !== 'success' || !result.url) return;

            const url = safeParseUrl(result.url);
            if (!url) {
                Alert.alert(
                    'Login',
                    'Retorno inválido do login. Tente novamente.'
                );
                return;
            }

            const error = url.searchParams.get('error');
            const message = url.searchParams.get('message');

            if (error) {
                Alert.alert(
                    'Login',
                    message || `Não foi possível autenticar (${error}).`
                );
                return;
            }

            // ✅ payload do /api/mobile/auth-redirect
            const tokenParam = url.searchParams.get('token');

            // compat: se algum fluxo ainda devolver "session"
            const sessionParam = url.searchParams.get('session');

            if (tokenParam) {
                const parsed = parseSessionParam(tokenParam);
                if (!parsed) {
                    Alert.alert(
                        'Login',
                        'Token inválido retornado pelo login. Tente novamente.'
                    );
                    return;
                }

                const payload = ensureCompanyIdInSession(parsed, COMPANY_ID);

                await signIn(JSON.stringify(payload));

                try {
                    await refreshMe();
                } catch {
                    // ok
                }
                return;
            }

            if (sessionParam) {
                const parsed = parseSessionParam(sessionParam);
                if (!parsed) {
                    Alert.alert(
                        'Login',
                        'Sessão inválida retornada pelo login. Tente novamente.'
                    );
                    return;
                }

                const session = ensureCompanyIdInSession(parsed, COMPANY_ID);

                await signIn(JSON.stringify(session));

                try {
                    await refreshMe();
                } catch {
                    // ok
                }
                return;
            }

            Alert.alert(
                'Login',
                'Não recebemos token do login. Tente novamente.'
            );
        } catch {
            Alert.alert('Login', 'Erro inesperado ao autenticar.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.screen}>
            <StatusBar style="light" backgroundColor={UI.brand.primary} />

            {/* Safe-area */}
            <View
                pointerEvents="none"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: insets.top + 2,
                    backgroundColor: UI.brand.primary,
                    zIndex: 10,
                }}
            />

            {/* Header */}
            <View
                style={[
                    styles.header,
                    {
                        height: UI.spacing.headerH + insets.top,
                        paddingTop: insets.top,
                        borderBottomLeftRadius: 14,
                        borderBottomRightRadius: 14,
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

            {/* Background */}
            <ImageBackground
                source={require('../../assets/images/home.png')}
                resizeMode="cover"
                style={{ flex: 1 }}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.55)' }}>
                    <View
                        style={[
                            styles.body,
                            {
                                flex: 1,
                                justifyContent: 'flex-end',
                                paddingBottom: '25%',
                            },
                        ]}
                    >
                        <View style={[styles.card, UI.shadow.card]}>
                            <Text
                                style={[
                                    styles.title,
                                    {
                                        textAlign: 'center',
                                        fontSize: 26,
                                        marginBottom: 10,
                                    },
                                ]}
                            >
                                Acesse sua conta
                            </Text>

                            <Text
                                style={[
                                    styles.subtitle,
                                    {
                                        textAlign: 'center',
                                        fontSize: 15,
                                        marginBottom: 18,
                                    },
                                ]}
                            >
                                Entre com sua conta social
                            </Text>

                            <View style={styles.providerStack}>
                                <Pressable
                                    onPress={handleGoogleLogin}
                                    disabled={loading}
                                    style={[
                                        styles.providerBtnFull,
                                        loading && { opacity: 0.85 },
                                    ]}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 12,
                                        }}
                                    >
                                        {loading ? (
                                            <ActivityIndicator
                                                color={UI.brand.primaryText}
                                            />
                                        ) : (
                                            <AntDesign
                                                name="google"
                                                size={22}
                                                color="#DB4437"
                                            />
                                        )}
                                        <Text
                                            style={styles.providerBtnFullText}
                                        >
                                            Continuar com Google
                                        </Text>
                                    </View>
                                </Pressable>
                            </View>

                            {/* dica útil em dev */}
                            {__DEV__ && (!apiOk || !companyOk) ? (
                                <View style={{ marginTop: 12 }}>
                                    {!apiOk ? (
                                        <Text style={styles.subtitle}>
                                            Configure EXPO_PUBLIC_API_URL (ex:
                                            https://xxxx.ngrok-free.dev)
                                        </Text>
                                    ) : null}
                                    {!companyOk ? (
                                        <Text style={styles.subtitle}>
                                            Configure EXPO_PUBLIC_COMPANY_ID (id
                                            da empresa no banco)
                                        </Text>
                                    ) : null}
                                </View>
                            ) : null}
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}
