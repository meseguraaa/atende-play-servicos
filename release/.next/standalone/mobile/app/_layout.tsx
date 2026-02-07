import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, Platform } from 'react-native';

import { UI } from '../src/theme/client-theme';
import { AuthProvider } from '../src/auth/auth-context';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                {/* ✅ Base do app: garante que o topo (status bar) no ANDROID fique com o roxo brand */}
                <View style={{ flex: 1, backgroundColor: UI.brand.primary }}>
                    <StatusBar
                        style="light"
                        backgroundColor={UI.brand.primary}
                        // ✅ IMPORTANTÍSSIMO no Android: sem isso o background pode “sumir” (translúcido) e ficar preto
                        translucent={
                            Platform.OS === 'android' ? false : undefined
                        }
                    />

                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen
                            name="(app)"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="(auth)"
                            options={{ headerShown: false }}
                        />
                    </Stack>
                </View>
            </AuthProvider>
        </SafeAreaProvider>
    );
}
