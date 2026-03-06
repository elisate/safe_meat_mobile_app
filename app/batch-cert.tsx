import { SafeMeatButton } from '@/components/ui/SafeMeatButton';
import { SafeMeatCard } from '@/components/ui/SafeMeatCard';
import { SafeMeatHeader } from '@/components/ui/SafeMeatHeader';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    ScrollView,
    Share,
    StyleSheet,
    Text,
    useColorScheme,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BatchCertScreen() {
    const { role = 'inspector', batchCode: paramBatchCode } = useLocalSearchParams<{ role: string, batchCode: string }>();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const [hasCert, setHasCert] = useState(false);

    // Mock Data based on brief requirements
    const batchDetails = {
        code: paramBatchCode || "BTCH-2024-8842",
        certNo: "CERT-TRC-9901",
        facility: "Centra Slaughterhouse A-1",
        inspector: role === 'inspector' ? "Dr. J. Miller (Sr. Inspector)" : "On-Site Inspector",
        species: "Bovine (Grade A)",
        date: "March 03, 2026",
        status: "COMPLIANT"
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Safe Meat Safety Certificate\nNo: ${batchDetails.certNo}\nInspector: ${batchDetails.inspector}\nFacility: ${batchDetails.facility}\nBatch: ${batchDetails.code}\nVerify at: https://safemeat.pro/verify/${batchDetails.certNo}`,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={[]}>
            <SafeMeatHeader title="Batch & Certificate" showBack />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* ── Compliance Intelligence ── */}
                <View style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.1)', marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#10B981', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, gap: 4 }}>
                        <Ionicons name="shield-checkmark" size={12} color="#FFF" />
                        <Text style={{ color: '#FFF', fontSize: 8, fontWeight: '900' }}>CERTIFICATION READY</Text>
                    </View>
                    <Text style={{ fontSize: 11, fontWeight: '700', color: theme.muted }}>
                        Compliant Traceability
                    </Text>
                </View>

                <Text style={[styles.sectionTitle, { color: theme.text }]}>Active Batch</Text>

                <SafeMeatCard>
                    <View style={styles.batchInfo}>
                        <Text style={[styles.batchLabel, { color: theme.muted }]}>BATCH CODE</Text>
                        <Text style={[styles.batchCode, { color: theme.primary }]}>{batchDetails.code}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: theme.muted }]}>Status</Text>
                        <View style={[styles.statusTag, { backgroundColor: theme.primary + '18' }]}>
                            <Text style={[styles.statusText, { color: theme.primary }]}>{batchDetails.status}</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: theme.muted }]}>Facility</Text>
                        <Text style={[styles.infoValue, { color: theme.text }]}>{batchDetails.facility}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: theme.muted }]}>Inspector</Text>
                        <Text style={[styles.infoValue, { color: theme.text }]}>{batchDetails.inspector}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: theme.muted }]}>Species</Text>
                        <Text style={[styles.infoValue, { color: theme.text }]}>{batchDetails.species}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: theme.muted }]}>Date</Text>
                        <Text style={[styles.infoValue, { color: theme.text }]}>{batchDetails.date}</Text>
                    </View>

                    {!hasCert && (
                        <SafeMeatButton
                            title="Issue Meat Safety Certificate"
                            onPress={() => setHasCert(true)}
                            style={{ marginTop: 24 }}
                        />
                    )}
                </SafeMeatCard>

                {hasCert && (
                    <View style={styles.certSection}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Compliance Certificate</Text>
                        <SafeMeatCard variant="elevated" style={styles.certCard}>
                            <View style={styles.certBadge}>
                                <Ionicons name="shield-checkmark" size={16} color="#FFF" />
                                <Text style={styles.certBadgeText}>VERIFIED BY SAFE MEAT PRO</Text>
                            </View>

                            <View style={styles.qrPlaceholder}>
                                <Ionicons name="qr-code" size={140} color={theme.text} />
                                <Text style={[styles.certNo, { color: theme.muted }]}>{batchDetails.certNo}</Text>
                            </View>

                            <Text style={[styles.certDesc, { color: theme.muted }]}>
                                This document certifies that the meat products in batch {batchDetails.code} have been inspected and approved for consumption.
                            </Text>

                            <View style={styles.certActions}>
                                <SafeMeatButton
                                    title="Share Certificate"
                                    variant="outline"
                                    onPress={handleShare}
                                    style={{ flex: 1, marginRight: 8 }}
                                />
                                <SafeMeatButton
                                    title="Print Label"
                                    onPress={() => { }}
                                    style={{ flex: 1, marginLeft: 8 }}
                                />
                            </View>
                        </SafeMeatCard>
                    </View>
                )}
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
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 20,
    },
    batchInfo: {
        paddingVertical: 8,
    },
    batchLabel: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 4,
    },
    batchCode: {
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: -1,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        marginVertical: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    infoLabel: {
        fontSize: 13,
        fontWeight: '600',
    },
    infoValue: {
        fontSize: 13,
        fontWeight: '700',
    },
    statusTag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '800',
    },
    certSection: {
        marginTop: 12,
    },
    certCard: {
        alignItems: 'center',
        padding: 24,
        borderRadius: 32,
    },
    certBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#10B981',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
        marginBottom: 20,
    },
    certBadgeText: {
        color: '#FFF',
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    qrPlaceholder: {
        alignItems: 'center',
        marginBottom: 20,
    },
    certNo: {
        fontSize: 14,
        fontWeight: '700',
        marginTop: 12,
        letterSpacing: 2,
    },
    certDesc: {
        fontSize: 13,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 18,
    },
    certActions: {
        flexDirection: 'row',
        width: '100%',
    },
});
