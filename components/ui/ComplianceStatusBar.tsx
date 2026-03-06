import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

interface ComplianceStatusBarProps {
    status: 'compliant' | 'pending' | 'blocked';
    message: string;
    subMessage?: string;
}

export const ComplianceStatusBar: React.FC<ComplianceStatusBarProps> = ({ status, message, subMessage }) => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const getColors = () => {
        switch (status) {
            case 'compliant': return { bg: '#10B981', text: '#FFFFFF', icon: 'shield-checkmark' };
            case 'pending': return { bg: '#F59E0B', text: '#FFFFFF', icon: 'time' };
            case 'blocked': return { bg: '#EF4444', text: '#FFFFFF', icon: 'alert-circle' };
            default: return { bg: '#64748B', text: '#FFFFFF', icon: 'help-circle' };
        }
    };

    const config = getColors();

    return (
        <View style={[styles.container, { backgroundColor: config.bg }]}>
            <View style={styles.iconWrap}>
                <Ionicons name={config.icon as any} size={20} color={config.text} />
            </View>
            <View style={styles.content}>
                <Text style={[styles.message, { color: config.text }]}>{message}</Text>
                {subMessage && <Text style={[styles.subMessage, { color: config.text + 'CC' }]}>{subMessage}</Text>}
            </View>
            <View style={styles.indicatorWrap}>
                <View style={[styles.indicator, { backgroundColor: config.text + '40' }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    iconWrap: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    content: {
        flex: 1,
    },
    message: {
        fontSize: 14,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    subMessage: {
        fontSize: 11,
        fontWeight: '600',
        marginTop: 1,
    },
    indicatorWrap: {
        marginLeft: 8,
    },
    indicator: {
        width: 4,
        height: 20,
        borderRadius: 2,
    },
});
