import { SafeMeatCard } from '@/components/ui/SafeMeatCard';
import { SafeMeatHeader } from '@/components/ui/SafeMeatHeader';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ROLE_COLORS: Record<string, string> = {
    inspector: '#059669',
    operator: '#3B82F6',
    manager: '#8B5CF6',
    driver: '#F59E0B',
    retail: '#EC4899',
};

export default function ProfileScreen() {
    const router = useRouter();
    const { role = 'inspector' } = useLocalSearchParams<{ role: string }>();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const roleColor = ROLE_COLORS[role] ?? theme.primary;

    const handleLogout = () => {
        router.replace('/login');
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['bottom']}>
            <StatusBar barStyle="light-content" backgroundColor="#10B981" />
            <SafeMeatHeader title="User Profile" />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.userSection}>
                    <View style={[styles.avatar, { backgroundColor: theme.primary + '20' }]}>
                        <Ionicons name="person" size={40} color={theme.primary} />
                    </View>
                    <Text style={[styles.userName, { color: theme.text }]}>Albert Kalisa</Text>
                    <Text style={[styles.userEmail, { color: theme.muted }]}>albert.k@safemeat.pro</Text>

                    <View style={[styles.roleTag, { backgroundColor: theme.primary }]}>
                        <Text style={styles.roleText}>{role.toUpperCase()}</Text>
                    </View>
                </View>

                <Text style={[styles.sectionTitle, { color: theme.text }]}>Settings</Text>

                <SafeMeatCard style={styles.optionCard}>
                    <TouchableOpacity style={styles.optionItem}>
                        <Ionicons name="notifications-outline" size={24} color={theme.text} />
                        <Text style={[styles.optionLabel, { color: theme.text }]}>Notifications</Text>
                        <Ionicons name="chevron-forward" size={18} color={theme.muted} />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.optionItem}>
                        <Ionicons name="shield-outline" size={24} color={theme.text} />
                        <Text style={[styles.optionLabel, { color: theme.text }]}>Security</Text>
                        <Ionicons name="chevron-forward" size={18} color={theme.muted} />
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.optionItem}>
                        <Ionicons name="help-circle-outline" size={24} color={theme.text} />
                        <Text style={[styles.optionLabel, { color: theme.text }]}>Support</Text>
                        <Ionicons name="chevron-forward" size={18} color={theme.muted} />
                    </TouchableOpacity>
                </SafeMeatCard>

                <TouchableOpacity
                    style={[styles.logoutBtn, { borderColor: theme.error }]}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={20} color={theme.error} />
                    <Text style={[styles.logoutText, { color: theme.error }]}>Sign Out</Text>
                </TouchableOpacity>

                <Text style={[styles.version, { color: theme.muted }]}>Version 1.0.0 (Build 42)</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
    },
    userSection: {
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    userName: {
        fontSize: 24,
        fontWeight: '800',
    },
    userEmail: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 4,
    },
    roleTag: {
        marginTop: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    roleText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 16,
    },
    optionCard: {
        padding: 0,
        overflow: 'hidden',
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 16,
    },
    optionLabel: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    logoutBtn: {
        marginTop: 32,
        height: 56,
        borderRadius: 16,
        borderWidth: 1.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '700',
    },
    version: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '500',
        marginTop: 24,
        marginBottom: 40,
        opacity: 0.5,
    },
});
