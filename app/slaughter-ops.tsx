import { ComplianceStatusBar } from '@/components/ui/ComplianceStatusBar';
import { SafeMeatButton } from '@/components/ui/SafeMeatButton';
import { SafeMeatCard } from '@/components/ui/SafeMeatCard';
import { SafeMeatHeader } from '@/components/ui/SafeMeatHeader';
import { SafeMeatInput } from '@/components/ui/SafeMeatInput';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SlaughterOpsScreen() {
    const { role = 'inspector' } = useLocalSearchParams<{ role: string }>();
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const isInspector = role === 'inspector';
    const isOperator = role === 'operator';
    const [step, setStep] = useState(1); // 1: Session, 2: Ante-Mortem, 3: Execution
    const [anteForm, setAnteForm] = useState({ examined: '50', approved: '48', rejected: '2', notes: 'Visible defects on 2 units.' });
    const [execForm, setExecForm] = useState({ count: '', time: new Date().toLocaleTimeString() });

    const handleAnteSubmit = () => {
        const approvedCount = parseInt(anteForm.approved);
        if (isNaN(approvedCount) || approvedCount === 0) {
            Alert.alert(
                'Compliance Block',
                'Critical Rule: Slaughter cannot proceed if zero animals are approved during Ante-Mortem inspection.'
            );
            return;
        }

        if (isInspector) {
            Alert.alert(
                'Ante-Mortem Complete',
                'Animal health check recorded. Operational team can now proceed with slaughter execution.',
                [{ text: 'Return Home', onPress: () => router.push(`/(tabs)?role=${role}`) }]
            );
        } else {
            setStep(3);
        }
    };

    const handleExecSubmit = () => {
        const batchCode = `BTCH-RE-990-${Math.floor(100 + Math.random() * 900)}`;
        Alert.alert(
            'Slaughter Execution Confirmed',
            `Batch ${batchCode} has been automatically created.\n\nTime: ${execForm.time}\nCount: ${execForm.count}`,
            [{ text: 'View Batch Details', onPress: () => router.push(`/batch-cert?role=${role}&batchCode=${batchCode}`) }]
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={[]}>
            <SafeMeatHeader title="Slaughter Operations" showBack />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* ── Compliance Intelligence ── */}
                <View style={styles.complianceHeader}>
                    <View style={styles.complianceBadge}>
                        <Ionicons name="shield-checkmark" size={12} color="#FFF" />
                        <Text style={styles.complianceBadgeText}>INSPECTOR COMPLIANCE MODE</Text>
                    </View>
                    <Text style={[styles.complianceStatus, { color: theme.muted }]}>
                        Stage: {step === 1 ? 'Session Review' : step === 2 ? 'Ante-Mortem' : 'Execution Review'}
                    </Text>
                </View>

                {/* Step Indicator */}
                <View style={styles.stepper}>
                    {[1, 2, 3].map((s) => (
                        <View
                            key={s}
                            style={[
                                styles.stepCircle,
                                { backgroundColor: step >= s ? theme.primary : theme.border }
                            ]}
                        >
                            <Text style={styles.stepText}>{s}</Text>
                        </View>
                    ))}
                </View>
                <ComplianceStatusBar
                    status={step === 1 ? 'pending' : 'compliant'}
                    message={isInspector ? 'Inspector Safety Mode' : 'Operational Protocol Active'}
                    subMessage={step === 1 ? 'Awaiting session verification' : 'Pre-slaughter data validated'}
                />

                {step === 1 && (
                    <View>
                        <Text style={[styles.title, { color: theme.text }]}>Today's Sessions</Text>
                        <SafeMeatCard>
                            <View style={styles.sessionHeader}>
                                <Text style={[styles.sessionCode, { color: theme.primary }]}>SS-2024-001</Text>
                                <View style={[styles.tag, { backgroundColor: theme.primary + '15' }]}>
                                    <Text style={[styles.tagText, { color: theme.primary }]}>ACTIVE</Text>
                                </View>
                            </View>
                            <View style={styles.detailRow}>
                                <Ionicons name="paw" size={16} color={theme.muted} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Species: Bovine</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Ionicons name="list" size={16} color={theme.muted} />
                                <Text style={[styles.detailText, { color: theme.text }]}>Planned: 50 Units</Text>
                            </View>
                            <SafeMeatButton
                                title="Start Ante-Mortem"
                                onPress={() => setStep(2)}
                                style={{ marginTop: 16 }}
                            />
                        </SafeMeatCard>
                    </View>
                )}

                {step === 2 && (
                    <View>
                        <Text style={[styles.title, { color: theme.text }]}>Ante-Mortem Inspection</Text>
                        <SafeMeatCard>
                            <SafeMeatInput
                                label="Animals Examined"
                                placeholder="0"
                                icon="eye"
                                keyboardType="numeric"
                                value={anteForm.examined}
                                onChangeText={(v) => setAnteForm({ ...anteForm, examined: v })}
                            />
                            <View style={styles.row}>
                                <View style={{ flex: 1, marginRight: 8 }}>
                                    <SafeMeatInput
                                        label="Approved"
                                        placeholder="0"
                                        icon="checkmark-circle"
                                        keyboardType="numeric"
                                        value={anteForm.approved}
                                        onChangeText={(v) => setAnteForm({ ...anteForm, approved: v })}
                                    />
                                </View>
                                <View style={{ flex: 1, marginLeft: 8 }}>
                                    <SafeMeatInput
                                        label="Rejected"
                                        placeholder="0"
                                        icon="trash"
                                        keyboardType="numeric"
                                        value={anteForm.rejected}
                                        onChangeText={(v) => setAnteForm({ ...anteForm, rejected: v })}
                                    />
                                </View>
                            </View>
                            <SafeMeatInput
                                label="Inspector Notes"
                                placeholder="Any defects or health concerns..."
                                icon="document-text"
                                multiline
                                value={anteForm.notes}
                                onChangeText={(v) => setAnteForm({ ...anteForm, notes: v })}
                            />
                        </SafeMeatCard>
                        <SafeMeatButton
                            title="Confirm & Proceed"
                            onPress={handleAnteSubmit}
                            style={{ marginTop: 16 }}
                        />
                    </View>
                )}

                {step === 3 && (
                    <View>
                        <Text style={[styles.title, { color: theme.text }]}>Slaughter Execution</Text>
                        <SafeMeatCard style={{ marginBottom: 24 }}>
                            <Text style={[styles.summaryText, { color: theme.muted }]}>
                                Ante-Mortem: {anteForm.approved} Approved / {anteForm.rejected} Rejected
                            </Text>
                        </SafeMeatCard>

                        <SafeMeatCard>
                            <SafeMeatInput
                                label="Actual Slaughtered Count"
                                placeholder="Enter final number"
                                icon="list"
                                keyboardType="numeric"
                                value={execForm.count}
                                onChangeText={(v) => setExecForm({ ...execForm, count: v })}
                            />
                            <SafeMeatInput
                                label="Slaughter Time"
                                placeholder="e.g. 14:30"
                                icon="time"
                                value={execForm.time}
                                onChangeText={(v) => setExecForm({ ...execForm, time: v })}
                            />
                        </SafeMeatCard>
                        <SafeMeatButton
                            title="Finalize Execution"
                            onPress={handleExecSubmit}
                            style={{ marginTop: 16 }}
                        />
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
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        marginBottom: 20,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 13,
        fontWeight: '600',
        marginTop: 2,
    },
    stepper: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 32,
    },
    stepCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepText: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 20,
    },
    sessionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sessionCode: {
        fontSize: 18,
        fontWeight: '700',
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    tagText: {
        fontSize: 10,
        fontWeight: '800',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },
    detailText: {
        fontSize: 15,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
    },
    summaryText: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    complianceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: 'rgba(16, 185, 129, 0.05)',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(16, 185, 129, 0.1)',
    },
    complianceBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#10B981',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },
    complianceBadgeText: {
        color: '#FFF',
        fontSize: 8,
        fontWeight: '900',
    },
    complianceStatus: {
        fontSize: 11,
        fontWeight: '700',
    },
});
