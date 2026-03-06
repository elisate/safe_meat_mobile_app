import { SafeMeatInput } from '@/components/ui/SafeMeatInput';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
    const [email, setEmail] = useState('admin@safemeat.com');
    const [password, setPassword] = useState('password123');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const BRAND_COLOR = '#059669';

    const quickLogin = (role: string) => {
        const emailMap: Record<string, string> = {
            inspector: 'admin@safemeat.com',
            operator: 'operator@safemeat.com',
            manager: 'manager@safemeat.com',
            driver: 'driver@safemeat.com',
            retail: 'retail@safemeat.com',
        };
        setEmail(emailMap[role]);
        setPassword('password123');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.replace(`/(tabs)?role=${role}`);
        }, 1200);
    };

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);

            // Map email to role for testing different dashboards
            let role = 'inspector'; // Default
            const emailLower = email.toLowerCase().trim();

            if (emailLower.includes('operator')) role = 'operator';
            else if (emailLower.includes('manager')) role = 'manager';
            else if (emailLower.includes('driver')) role = 'driver';
            else if (emailLower.includes('retail')) role = 'retail';
            else if (emailLower.includes('admin')) role = 'inspector';

            router.replace(`/(tabs)?role=${role}`);
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
            <StatusBar style="light" />

            {/* Decorative background circles */}
            <View style={[styles.bgCircle, styles.bgCircle1, { backgroundColor: BRAND_COLOR + '22' }]} />
            <View style={[styles.bgCircle, styles.bgCircle2, { backgroundColor: BRAND_COLOR + '14' }]} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* ── LOGO ── */}
                    <View style={styles.logoSection}>
                        <View style={[styles.logoBox, { backgroundColor: BRAND_COLOR }]}>
                            <Text style={styles.logoText}>SM</Text>
                        </View>
                        <Text style={styles.appName}>Safe Meat Pro</Text>
                        <Text style={styles.appTagline}>Compliance & Traceability Platform</Text>
                    </View>

                    {/* ── FORM CARD ── */}
                    <View style={styles.formCard}>
                        <Text style={styles.formTitle}>Sign In</Text>
                        <Text style={styles.formSub}>
                            Welcome back! Enter your details or use Quick Login.
                        </Text>

                        <SafeMeatInput
                            label="Email Address"
                            placeholder="e.g. admin@safemeat.com"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#475569"
                        />

                        <SafeMeatInput
                            label="Password"
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholderTextColor="#475569"
                        />

                        <TouchableOpacity style={styles.forgotRow}>
                            <Text style={styles.forgotText}>Forgot password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleLogin}
                            activeOpacity={0.85}
                            disabled={loading}
                            style={[styles.signInBtn, { backgroundColor: BRAND_COLOR, opacity: loading ? 0.8 : 1 }]}
                        >
                            {loading ? (
                                <Text style={styles.signInText}>Authenticating…</Text>
                            ) : (
                                <>
                                    <Ionicons name="log-in-outline" size={20} color="#FFF" />
                                    <Text style={styles.signInText}>Sign In</Text>
                                </>
                            )}
                        </TouchableOpacity>

                        {/* ── QUICK LOGIN ── */}
                        <View style={styles.quickLoginSection}>
                            <Text style={styles.quickLoginTitle}>Quick Test Login</Text>
                            <View style={styles.quickLoginGrid}>
                                {[
                                    { label: 'Insp', role: 'inspector', color: '#059669' },
                                    { label: 'Oper', role: 'operator', color: '#3B82F6' },
                                    { label: 'Mgr', role: 'manager', color: '#8B5CF6' },
                                    { label: 'Driv', role: 'driver', color: '#F59E0B' },
                                    { label: 'Retl', role: 'retail', color: '#EC4899' },
                                ].map((item) => (
                                    <TouchableOpacity
                                        key={item.role}
                                        onPress={() => quickLogin(item.role)}
                                        style={[styles.quickBtn, { borderColor: item.color + '40' }]}
                                    >
                                        <Text style={[styles.quickBtnText, { color: item.color }]}>{item.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </View>

                    {/* ── FOOTER ──
                    <View style={styles.footerContainer}>
                        <Text style={styles.footer}>
                            Safe Meat Pro v1.0 · Secure Connection · HTTPS
                        </Text>
                    </View> */}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#020617',
    },
    bgCircle: {
        position: 'absolute',
        borderRadius: 999,
    },
    bgCircle1: {
        width: 380,
        height: 380,
        top: -120,
        right: -100,
    },
    bgCircle2: {
        width: 280,
        height: 280,
        bottom: 60,
        left: -80,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 40,
    },
    logoSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoBox: {
        width: 76,
        height: 76,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 16,
    },
    logoText: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: '900',
        letterSpacing: -1,
    },
    appName: {
        color: '#F8FAFC',
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: -0.8,
    },
    appTagline: {
        color: '#64748B',
        fontSize: 13,
        fontWeight: '600',
        marginTop: 6,
        letterSpacing: 0.2,
    },
    formCard: {
        backgroundColor: '#0F172A',
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#1E293B',
        padding: 28,
        marginBottom: 24,
    },
    formTitle: {
        color: '#F8FAFC',
        fontSize: 22,
        fontWeight: '900',
        letterSpacing: -0.5,
        marginBottom: 6,
    },
    formSub: {
        color: '#64748B',
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 28,
    },
    forgotRow: {
        alignSelf: 'flex-end',
        marginBottom: 28,
    },
    forgotText: {
        color: '#64748B',
        fontSize: 13,
        fontWeight: '700',
    },
    signInBtn: {
        height: 60,
        borderRadius: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    signInText: {
        color: '#FFF',
        fontSize: 17,
        fontWeight: '800',
        letterSpacing: -0.3,
    },
    quickLoginSection: {
        marginTop: 32,
        paddingTop: 24,
        borderTopWidth: 1,
        borderTopColor: '#1E293B',
    },
    quickLoginTitle: {
        color: '#475569',
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1,
        textAlign: 'center',
        marginBottom: 16,
    },
    quickLoginGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 8,
    },
    quickBtn: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        backgroundColor: 'rgba(255,255,255,0.03)',
    },
    quickBtnText: {
        fontSize: 11,
        fontWeight: '700',
    },
    footerContainer: {
        marginTop: 8,
        paddingBottom: 20,
    },
    footer: {
        color: '#1E293B',
        fontSize: 11,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 0.3,
    },
});


