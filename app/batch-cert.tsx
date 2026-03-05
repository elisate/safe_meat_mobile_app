import { SafeMeatButton } from '@/components/ui/SafeMeatButton';
import { SafeMeatCard } from '@/components/ui/SafeMeatCard';
import { SafeMeatHeader } from '@/components/ui/SafeMeatHeader';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
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
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const [hasCert, setHasCert] = useState(false);
    const batchCode = "BTCH-2024-8842";
    const certNo = "CERT-TRC-9901";

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Safe Meat Certificate: ${certNo}\nBatch: ${batchCode}\nVerified at: https://safemeat.pro/verify/${certNo}`,
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={[]}>
            <SafeMeatHeader title="Batch & Certificate" showBack />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Active Batch</Text>

                <SafeMeatCard>
                    <View style={styles.batchInfo}>
                        <Text style={[styles.batchLabel, { color: theme.muted }]}>BATCH CODE</Text>
                        <Text style={[styles.batchCode, { color: theme.primary }]}>{batchCode}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: theme.muted }]}>Status</Text>
                        <View style={[styles.statusTag, { backgroundColor: theme.success + '15' }]}>
                            <Text style={[styles.statusText, { color: theme.success }]}>COMPLIANT</Text>
                        </View>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={[styles.infoLabel, { color: theme.muted }]}>Slaughter Date</Text>
                        <Text style={[styles.infoValue, { color: theme.text }]}>March 03, 2026</Text>
                    </View>

                    {!hasCert && (
                        <SafeMeatButton
                            title="Generate Certificate"
                            onPress={() => setHasCert(true)}
                            style={{ marginTop: 24 }}
                        />
                    )}
                </SafeMeatCard>

                {hasCert && (
                    <View style={styles.certSection}>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Digital Certificate</Text>
                        <SafeMeatCard style={styles.certCard}>
                            <View style={styles.qrPlaceholder}>
                                <Ionicons name="qr-code" size={120} color={theme.text} />
                                <Text style={[styles.certNo, { color: theme.muted }]}>{certNo}</Text>
                            </View>

                            <Text style={[styles.certDesc, { color: theme.muted }]}>
                                Scan this QR code or share the link to verify compliance and animal origin.
                            </Text>

                            <View style={styles.certActions}>
                                <SafeMeatButton
                                    title="Share Link"
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
        fontSize: 14,
        fontWeight: '600',
    },
    infoValue: {
        fontSize: 14,
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
        padding: 32,
    },
    qrPlaceholder: {
        alignItems: 'center',
        marginBottom: 24,
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
