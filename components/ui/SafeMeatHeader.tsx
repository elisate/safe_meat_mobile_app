import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ROLE_COLORS: Record<string, string> = {
    inspector: '#059669',
    operator: '#3B82F6',
    manager: '#8B5CF6',
    driver: '#F59E0B',
    retail: '#EC4899',
};

const ROLE_LABELS: Record<string, string> = {
    inspector: 'Inspector',
    operator: 'Slaughterhouse Operator',
    manager: 'Warehouse Manager',
    driver: 'Transport Driver',
    retail: 'Retail Receiver',
};

const ROLE_ICONS: Record<string, any> = {
    inspector: 'shield-checkmark',
    operator: 'hammer',
    manager: 'cube',
    driver: 'car',
    retail: 'cart',
};

interface SafeMeatHeaderProps {
    title: string;
    role?: string;
    showBack?: boolean;
    onNotificationPress?: () => void;
}

export const SafeMeatHeader: React.FC<SafeMeatHeaderProps> = ({
    title,
    role,
    showBack,
    onNotificationPress,
}) => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Always use the brand green as the header BG
    const headerBg = '#10B981';

    return (
        <View
            style={[
                styles.header,
                {
                    backgroundColor: headerBg,
                    paddingTop: insets.top + 14,
                },
            ]}
        >
            <View style={styles.left}>
                {showBack ? (
                    <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
                        <Ionicons name="chevron-back" size={22} color="#FFF" />
                    </TouchableOpacity>
                ) : (
                    // Logo mark
                    <View style={styles.logoMark}>
                        <Ionicons name="shield-checkmark" size={20} color="#FFF" />
                    </View>
                )}
                <View style={{ flex: 1 }}>
                    <Text style={styles.appName} numberOfLines={1}>
                        {title}
                    </Text>
                    {role && (
                        <View style={styles.rolePill}>
                            <Ionicons
                                name={ROLE_ICONS[role] ?? 'person'}
                                size={10}
                                color="rgba(255,255,255,0.9)"
                            />
                            <Text style={styles.roleText}>
                                {ROLE_LABELS[role] ?? role.toUpperCase()}
                            </Text>
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.rightRow}>
                {/* Notification bell */}
                <TouchableOpacity
                    style={styles.iconBtn}
                    onPress={onNotificationPress}
                    activeOpacity={0.75}
                >
                    <Ionicons name="notifications-outline" size={22} color="#FFF" />
                    {/* Badge dot */}
                    <View style={styles.badge} />
                </TouchableOpacity>
                {/* SM monogram */}
                <View style={styles.monogram}>
                    <Text style={styles.monogramText}>SM</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 12,
        elevation: 8,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    logoMark: {
        width: 40,
        height: 40,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.18)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    appName: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '900',
        letterSpacing: -0.4,
    },
    rolePill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        marginTop: 3,
        backgroundColor: 'rgba(0,0,0,0.15)',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    roleText: {
        color: 'rgba(255,255,255,0.92)',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    rightRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    iconBtn: {
        width: 40,
        height: 40,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.18)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#F59E0B',
        borderWidth: 1.5,
        borderColor: '#10B981',
    },
    monogram: {
        width: 40,
        height: 40,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.22)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    monogramText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
});
