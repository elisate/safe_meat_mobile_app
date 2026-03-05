import { SafeMeatCard } from '@/components/ui/SafeMeatCard';
import { SafeMeatHeader } from '@/components/ui/SafeMeatHeader';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOCK_RESULT = {
    certNumber: 'CERT-TRC-9901',
    facilityName: 'Kigali Central Abattoir',
    inspector: 'Dr. A. Kalisa',
    slaughterDate: 'March 03, 2026',
    species: 'Bovine (Cattle)',
    batchCode: 'BTCH-2024-8842',
    originFarm: 'Green Valley Farm, Musanze',
    transportStatus: 'DELIVERED',
    deliveryStatus: 'CONFIRMED',
};

interface DetailRowProps {
    icon: any;
    label: string;
    value: string;
    valueColor?: string;
    theme: any;
}

const DetailRow = ({ icon, label, value, valueColor, theme }: DetailRowProps) => (
    <View style={rowStyles.row}>
        <View style={[rowStyles.iconBox, { backgroundColor: theme.primary + '12' }]}>
            <Ionicons name={icon} size={16} color={theme.primary} />
        </View>
        <View style={{ flex: 1 }}>
            <Text style={[rowStyles.label, { color: theme.muted }]}>{label}</Text>
            <Text style={[rowStyles.value, { color: valueColor ?? theme.text }]}>{value}</Text>
        </View>
    </View>
);

const rowStyles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 },
    iconBox: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    label: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 2 },
    value: { fontSize: 14, fontWeight: '700' },
});

export default function ScanScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const [scanned, setScanned] = useState(false);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['bottom']}>
            <StatusBar barStyle="light-content" backgroundColor="#10B981" />
            <SafeMeatHeader title="QR Verification" />

            {!scanned ? (
                <View style={styles.scannerWrapper}>
                    <View style={[styles.frame, { borderColor: theme.primary + '40' }]}>
                        <View style={[styles.corner, styles.tl, { borderColor: theme.primary }]} />
                        <View style={[styles.corner, styles.tr, { borderColor: theme.primary }]} />
                        <View style={[styles.corner, styles.bl, { borderColor: theme.primary }]} />
                        <View style={[styles.corner, styles.br, { borderColor: theme.primary }]} />
                        <Ionicons name="qr-code-outline" size={110} color={theme.muted} opacity={0.25} />
                    </View>

                    <Text style={[styles.hint, { color: theme.muted }]}>
                        Align the QR code within the frame to verify certificate compliance
                    </Text>

                    <TouchableOpacity
                        style={[styles.simulateBtn, { backgroundColor: theme.primary }]}
                        onPress={() => setScanned(true)}
                        activeOpacity={0.85}
                    >
                        <Ionicons name="scan-circle-outline" size={22} color="#FFF" />
                        <Text style={styles.simulateBtnText}>Simulate Scan</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.resultScroll} showsVerticalScrollIndicator={false}>
                    <View style={[styles.statusBanner, { backgroundColor: theme.success + '18', borderColor: theme.success + '40' }]}>
                        <View style={[styles.statusIconCircle, { backgroundColor: theme.success }]}>
                            <Ionicons name="checkmark" size={26} color="#FFF" />
                        </View>
                        <View>
                            <Text style={[styles.statusLabel, { color: theme.success }]}>✓ Verified Compliant</Text>
                            <Text style={[styles.certNum, { color: theme.muted }]}>{MOCK_RESULT.certNumber}</Text>
                        </View>
                    </View>

                    <SafeMeatCard style={styles.detailsCard}>
                        <Text style={[styles.cardSection, { color: theme.muted }]}>Certificate Details</Text>
                        <DetailRow icon="business" label="Facility" value={MOCK_RESULT.facilityName} theme={theme} />
                        <DetailRow icon="person-circle" label="Inspector" value={MOCK_RESULT.inspector} theme={theme} />
                        <DetailRow icon="calendar" label="Slaughter Date" value={MOCK_RESULT.slaughterDate} theme={theme} />
                        <DetailRow icon="paw" label="Species" value={MOCK_RESULT.species} theme={theme} />
                        <DetailRow icon="barcode" label="Batch Code" value={MOCK_RESULT.batchCode} theme={theme} valueColor={theme.primary} />
                        <DetailRow icon="leaf" label="Origin Farm" value={MOCK_RESULT.originFarm} theme={theme} />

                        <View style={[styles.divider, { backgroundColor: theme.border }]} />
                        <Text style={[styles.cardSection, { color: theme.muted }]}>Logistics Status</Text>
                        <DetailRow icon="car" label="Transport Status" value={MOCK_RESULT.transportStatus} theme={theme} valueColor={theme.success} />
                        <DetailRow icon="receipt" label="Delivery Status" value={MOCK_RESULT.deliveryStatus} theme={theme} valueColor={theme.success} />
                    </SafeMeatCard>

                    <TouchableOpacity
                        style={[styles.resetBtn, { borderColor: theme.primary }]}
                        onPress={() => setScanned(false)}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="qr-code-outline" size={18} color={theme.primary} />
                        <Text style={[styles.resetText, { color: theme.primary }]}>Scan Another</Text>
                    </TouchableOpacity>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scannerWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    frame: {
        width: 260,
        height: 260,
        borderRadius: 32,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        position: 'relative',
    },
    corner: {
        position: 'absolute',
        width: 36,
        height: 36,
        borderWidth: 4,
    },
    tl: { top: -2, left: -2, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 22 },
    tr: { top: -2, right: -2, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 22 },
    bl: { bottom: -2, left: -2, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 22 },
    br: { bottom: -2, right: -2, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 22 },
    hint: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 40,
    },
    simulateBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 36,
        paddingVertical: 18,
        borderRadius: 20,
    },
    simulateBtnText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '800',
    },
    resultScroll: {
        padding: 20,
        paddingBottom: 48,
    },
    statusBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        borderRadius: 20,
        borderWidth: 1,
        padding: 20,
        marginBottom: 16,
    },
    statusIconCircle: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusLabel: {
        fontSize: 18,
        fontWeight: '900',
        letterSpacing: -0.3,
    },
    certNum: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1.5,
        marginTop: 4,
    },
    detailsCard: {
        padding: 22,
        marginBottom: 16,
    },
    cardSection: {
        fontSize: 11,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginBottom: 18,
    },
    divider: {
        height: 1,
        marginVertical: 16,
    },
    resetBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        height: 56,
        borderRadius: 18,
        borderWidth: 1.5,
    },
    resetText: {
        fontSize: 16,
        fontWeight: '700',
    },
});
