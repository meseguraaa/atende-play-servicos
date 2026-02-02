import { StyleSheet } from 'react-native';

export const UI = {
    brand: {
        name: 'BarberShop',
        primary: '#7C6CFF',
        primaryText: '#0B0B10',
    },

    /**
     * Cores base (fundação)
     */
    colors: {
        bg: '#05070C',
        card: '#4c4c4c',
        cardBorder: 'rgba(255,255,255,0.08)',
        text: '#F8FAFC',
        textMuted: '#9CA3AF',
        textDim: 'rgba(255,255,255,0.65)',
        danger: '#F97373',
        success: '#00ff3c',
        divider: 'rgba(255,255,255,0.12)',
        white: '#FFFFFF',
        black: '#0B0B10',

        // overlays/utilidades (reduzir hardcode)
        overlay08: 'rgba(255,255,255,0.08)',
        overlay10: 'rgba(255,255,255,0.10)',
        overlay12: 'rgba(255,255,255,0.12)',
        overlay18: 'rgba(255,255,255,0.18)',

        black28: 'rgba(0,0,0,0.28)',
        black05: 'rgba(0,0,0,0.05)',
        black08: 'rgba(0,0,0,0.08)',
        black10: 'rgba(0,0,0,0.10)',
        black45: 'rgba(0,0,0,0.45)',

        // “ink” (pretos usados em telas claras, ex: Home)
        ink: '#141414',
        inkPure: '#000000',
    },

    /**
     * Overlays globais (Auth/Home usam)
     */
    overlay: {
        dim: 'rgba(0,0,0,0.55)',
    },

    radius: {
        card: 18,
        input: 12,
        pill: 999,
    },

    spacing: {
        screenX: 22,
        headerH: 62,
        cardPad: 18,
    },

    shadow: {
        card: {
            shadowColor: '#fff',
            shadowOpacity: 0.35,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 10 },
            elevation: 12,
        },
    },

    /**
     * =========================================================
     * AUTH (login / signup / forgot / reset)
     * =========================================================
     */
    auth: {
        inputBg: 'rgba(255,255,255,0.08)',
        inputBorder: 'rgba(255,255,255,0.22)',
        inputText: '#FFFFFF',
        link: 'rgba(255,255,255,0.92)',

        // ✅ ADICIONADOS: usados pelo login.tsx
        placeholder: 'rgba(255,255,255,0.55)',

        // ✅ ADICIONADOS: login.tsx usa UI.auth.google.brand
        google: {
            brand: '#4285F4',
        },
    },

    /**
     * =========================================================
     * HOME (tela clara dentro do app)
     * =========================================================
     */
    home: {
        // fundos claros
        surface: '#FFFFFF',

        // textos em área clara
        text: '#141414',
        textMuted: 'rgba(0,0,0,0.55)',
        textSubtle: 'rgba(0,0,0,0.48)',
        textFaint: 'rgba(0,0,0,0.40)',
        textDim: 'rgba(0,0,0,0.65)',

        // separadores/linhas
        separator: 'rgba(0,0,0,0.10)',
        divider: 'rgba(0,0,0,0.08)',

        // cards/pills/badges do Home
        heroBg: 'rgba(124,108,255,0.22)',
        heroBorder: 'rgba(124,108,255,0.35)',

        darkPillBg: 'rgba(20,20,20,0.92)',
        darkPillBorder: 'rgba(255,255,255,0.22)',

        inServiceBg: 'rgba(255,193,7,0.95)',

        birthdayDotBg: 'rgba(124,108,255,0.95)',

        historyIconBg: 'rgba(124,108,255,0.18)',

        // botões “Ver todos” (pretão do home)
        ctaBg: '#141414',
        ctaText: '#FFFFFF',
        ctaBorder: '#141414',

        // botão de detalhe no card (borda e texto)
        detailBorder: '#141414',
        detailText: '#141414',

        // placeholder bg de imagens em área clara
        imagePlaceholder: 'rgba(0,0,0,0.05)',
    },
} as const;

export const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: UI.colors.bg },

    header: {
        height: UI.spacing.headerH,
        backgroundColor: UI.brand.primary,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        paddingHorizontal: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTitleWrap: { flexDirection: 'row', alignItems: 'center', gap: 10 },

    headerTitle: {
        color: UI.colors.white,
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.2,
    },

    body: {
        flex: 1,
        paddingHorizontal: UI.spacing.screenX,
        justifyContent: 'center',
    },

    card: {
        backgroundColor: `${UI.colors.card}B3`, // 70% transparência
        borderWidth: 1.5,
        borderColor: UI.brand.primary,
        borderRadius: UI.radius.card,
        padding: UI.spacing.cardPad,
    },

    title: {
        color: UI.colors.text,
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 14,
    },

    subtitle: {
        color: UI.colors.textMuted,
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',
    },

    messageError: { color: UI.colors.danger, marginTop: 12, fontSize: 13 },
    messageSuccess: { color: UI.colors.success, marginTop: 12, fontSize: 13 },

    dividerRow: {
        marginTop: 14,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    dividerLine: { flex: 1, height: 1, backgroundColor: UI.colors.divider },
    dividerText: {
        color: 'rgba(255,255,255,0.55)',
        fontSize: 12,
        fontWeight: '700',
    },

    providerStack: { gap: 12 },

    providerBtnFull: {
        width: '100%',
        backgroundColor: UI.colors.white,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 10,
    },

    providerBtnFullText: {
        color: UI.brand.primaryText,
        fontSize: 15,
        fontWeight: '600',
    },

    iconBtnHeader: {
        width: 38,
        height: 38,
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.12)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.18)',
        position: 'relative',
    },

    avatarHeader: {
        width: 34,
        height: 34,
        borderRadius: 17,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.70)',
        backgroundColor: UI.colors.card,
    },

    /* ------------------------------------------------------------------
     * Globais (reutilizados em Home/Products)
     * ------------------------------------------------------------------ */

    stickyRowBase: {
        backgroundColor: UI.colors.bg,
        paddingHorizontal: UI.spacing.screenX,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    avatar42: {
        width: 42,
        height: 42,
        borderRadius: 21,
        borderWidth: 2,
        borderColor: UI.brand.primary,
    },

    iconBtn42: {
        width: 42,
        height: 42,
        borderRadius: 21,
        backgroundColor: UI.colors.overlay08,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        borderWidth: 1,
        borderColor: UI.colors.cardBorder,
    },

    iconDot: {
        position: 'absolute',
        top: 10,
        right: 11,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: UI.brand.primary,
    },

    glassCard: {
        backgroundColor: UI.colors.overlay08,
        borderRadius: UI.radius.card,
        padding: 14,
        borderWidth: 1,
        borderColor: UI.colors.cardBorder,
    },

    pillPrimary: {
        backgroundColor: UI.brand.primary,
        borderRadius: UI.radius.pill,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
    },

    pillPrimaryText: {
        color: UI.colors.white,
        fontWeight: '800',
    },

    pillOutline: {
        borderRadius: UI.radius.pill,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: UI.colors.white,
    },

    pillOutlineText: {
        color: UI.brand.primaryText,
        fontWeight: '700',
    },
} as const);
