import { SafeMeatInput } from '@/components/ui/SafeMeatInput';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const ROLES: Array<{ id: string; name: string; icon: any; color: string; description: string }> = [
    { id: 'inspector', name: 'Inspector', icon: 'shield-checkmark', color: '#059669', description: 'Ante & Post-Mortem' },
    { id: 'operator', name: 'Operator', icon: 'hammer', color: '#3B82F6', description: 'Slaughter Execution' },
    { id: 'manager', name: 'Manager', icon: 'cube', color: '#8B5CF6', description: 'Warehouse Storage' },
    { id: 'driver', name: 'Driver', icon: 'car', color: '#F59E0B', description: 'Transport & Trips' },
    { id: 'retail', name: 'Retail', icon: 'cart', color: '#EC4899', description: 'Delivery & Receipt' },
];

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState('inspector');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const theme = Colors['dark']; // login is always dark

    const selected = ROLES.find(r => r.id === selectedRole)!;

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.replace(`/(tabs)?role=${selectedRole}`);
        }, 1500);
    };

    return (
        <SafeAreaView style={[styles.root, { backgroundColor: '#020617' }]} edges={['top', 'bottom']}>
            <StatusBar style="light" />

            {/* Decorative background circles */}
            <View style={[styles.bgCircle, styles.bgCircle1, { backgroundColor: selected.color + '22' }]} />
            <View style={[styles.bgCircle, styles.bgCircle2, { backgroundColor: selected.color + '14' }]} />

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
                        <View style={[styles.logoBox, { backgroundColor: selected.color }]}>
                            <Text style={styles.logoText}>SM</Text>
                        </View>
                        <Text style={styles.appName}>Safe Meat Pro</Text>
                        <Text style={styles.appTagline}>Compliance & Traceability Platform</Text>
                    </View>

                    {/* ── ROLE CARDS ── */}
                    <Text style={styles.sectionLabel}>Select Your Role</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.roleRow}
                    >
                        {ROLES.map((role) => {
                            const isActive = selectedRole === role.id;
                            return (
                                <TouchableOpacity
                                    key={role.id}
                                    onPress={() => setSelectedRole(role.id)}
                                    activeOpacity={0.8}
                                    style={[
                                        styles.roleCard,
                                        {
                                            backgroundColor: isActive ? role.color : '#0F172A',
                                            borderColor: isActive ? role.color : '#1E293B',
                                        },
                                    ]}
                                >
                                    <View style={[styles.roleIconWrap, { backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : role.color + '20' }]}>
                                        <Ionicons name={role.icon} size={22} color={isActive ? '#FFF' : role.color} />
                                    </View>
                                    <Text style={[styles.roleName, { color: isActive ? '#FFF' : '#94A3B8' }]}>
                                        {role.name}
                                    </Text>
                                    <Text style={[styles.roleDesc, { color: isActive ? 'rgba(255,255,255,0.75)' : '#475569' }]}>
                                        {role.description}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>

                    {/* ── FORM CARD ── */}
                    <View style={styles.formCard}>
                        <Text style={styles.formTitle}>Sign In</Text>
                        <Text style={styles.formSub}>
                            Signed in as{' '}
                            <Text style={[styles.roleHighlight, { color: selected.color }]}>
                                {selected.name}
                            </Text>
                        </Text>

                        <View style={styles.inputGroup}>
                            <View style={styles.inputIcon}>
                                <Ionicons name="mail-outline" size={18} color="#64748B" />
                            </View>
                            <SafeMeatInput
                                label=""
                                placeholder="Email address"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholderTextColor="#475569"
                                style={styles.inputField}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <View style={styles.inputIcon}>
                                <Ionicons name="lock-closed-outline" size={18} color="#64748B" />
                            </View>
                            <SafeMeatInput
                                label=""
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                                placeholderTextColor="#475569"
                                style={styles.inputField}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(v => !v)} style={styles.eyeBtn}>
                                <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color="#64748B" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.forgotRow}>
                            <Text style={styles.forgotText}>Forgot password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handleLogin}
                            activeOpacity={0.85}
                            disabled={loading}
                            style={[styles.signInBtn, { backgroundColor: selected.color, opacity: loading ? 0.8 : 1 }]}
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
                    </View>

                    {/* ── FOOTER ── */}
                    <Text style={styles.footer}>
                        Safe Meat Pro v1.0 · Secure Connection · HTTPS
                    </Text>
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
    // ── LOGO
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
    // ── ROLE SELECTOR
    sectionLabel: {
        color: '#64748B',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        marginBottom: 14,
    },
    roleRow: {
        gap: 12,
        paddingRight: 24,
        marginBottom: 32,
    },
    roleCard: {
        width: 120,
        borderRadius: 20,
        borderWidth: 1.5,
        padding: 16,
        gap: 8,
    },
    roleIconWrap: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    roleName: {
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: -0.2,
    },
    roleDesc: {
        fontSize: 11,
        fontWeight: '600',
        lineHeight: 16,
    },
    // ── FORM CARD
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
    roleHighlight: {
        fontWeight: '800',
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E293B',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#334155',
        marginBottom: 14,
        paddingHorizontal: 16,
        height: 58,
    },
    inputIcon: {
        marginRight: 12,
    },
    inputField: {
        flex: 1,
        color: '#F8FAFC',
        fontSize: 15,
        fontWeight: '600',
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    eyeBtn: {
        padding: 4,
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
    // ── FOOTER
    footer: {
        color: '#1E293B',
        fontSize: 11,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 0.3,
    },
});
