import { SafeMeatButton } from '@/components/ui/SafeMeatButton';
import { SafeMeatCard } from '@/components/ui/SafeMeatCard';
import { SafeMeatHeader } from '@/components/ui/SafeMeatHeader';
import { SafeMeatInput } from '@/components/ui/SafeMeatInput';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const [step, setStep] = useState(1); // 1: Session, 2: Ante-Mortem, 3: Execution
    const [anteForm, setAnteForm] = useState({ examined: '', approved: '', rejected: '', notes: '' });
    const [execForm, setExecForm] = useState({ count: '', time: new Date().toLocaleTimeString() });

    const handleAnteSubmit = () => {
        if (parseInt(anteForm.approved) === 0) {
            Alert.alert('Compliance Alert', 'Slaughter cannot proceed if 0 animals are approved.');
            return;
        }
        setStep(3);
    };

    const handleExecSubmit = () => {
        Alert.alert(
            'Success',
            'Slaughter execution recorded. Batch code will be auto-generated.',
            [{ text: 'OK', onPress: () => router.push('/batch-cert') }]
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={[]}>
            <SafeMeatHeader title="Slaughter Operations" showBack />

            <ScrollView contentContainerStyle={styles.scrollContent}>
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

                {step === 1 && (
                    <View>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Assigned Session</Text>
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
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Ante-Mortem Inspection</Text>
                        <SafeMeatInput
                            label="Number Examined"
                            placeholder="0"
                            keyboardType="numeric"
                            value={anteForm.examined}
                            onChangeText={(v) => setAnteForm({ ...anteForm, examined: v })}
                        />
                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 8 }}>
                                <SafeMeatInput
                                    label="Approved"
                                    placeholder="0"
                                    keyboardType="numeric"
                                    value={anteForm.approved}
                                    onChangeText={(v) => setAnteForm({ ...anteForm, approved: v })}
                                />
                            </View>
                            <View style={{ flex: 1, marginLeft: 8 }}>
                                <SafeMeatInput
                                    label="Rejected"
                                    placeholder="0"
                                    keyboardType="numeric"
                                    value={anteForm.rejected}
                                    onChangeText={(v) => setAnteForm({ ...anteForm, rejected: v })}
                                />
                            </View>
                        </View>
                        <SafeMeatInput
                            label="Inspector Notes"
                            placeholder="Add observations..."
                            multiline
                            numberOfLines={3}
                            textAlignVertical="top"
                            style={{ height: 80 }}
                            value={anteForm.notes}
                            onChangeText={(v) => setAnteForm({ ...anteForm, notes: v })}
                        />
                        <SafeMeatButton
                            title="Confirm & Proceed"
                            onPress={handleAnteSubmit}
                            style={{ marginTop: 16 }}
                        />
                    </View>
                )}

                {step === 3 && (
                    <View>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Execution Confirmation</Text>
                        <SafeMeatCard style={{ marginBottom: 24 }}>
                            <Text style={[styles.summaryText, { color: theme.muted }]}>
                                Ante-Mortem: {anteForm.approved} Approved / {anteForm.rejected} Rejected
                            </Text>
                        </SafeMeatCard>

                        <SafeMeatInput
                            label="Actual Slaughtered Count"
                            placeholder="0"
                            keyboardType="numeric"
                            value={execForm.count}
                            onChangeText={(v) => setExecForm({ ...execForm, count: v })}
                        />
                        <SafeMeatInput
                            label="Execution Time"
                            value={execForm.time}
                            editable={false}
                        />
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
        padding: 24,
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
});
