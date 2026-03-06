import { ComplianceStatusBar } from '@/components/ui/ComplianceStatusBar';
import { SafeMeatButton } from '@/components/ui/SafeMeatButton';
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

export default function PostMortemScreen() {
    const { role = 'inspector' } = useLocalSearchParams<{ role: string }>();
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const [form, setForm] = useState({
        examined: '',
        approved: '',
        condemned: '',
        notes: ''
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        const approvedCount = parseInt(form.approved);

        if (isNaN(approvedCount) || approvedCount === 0) {
            Alert.alert(
                'Compliance Block',
                'Critical Rule: A Meat Safety Certificate cannot be issued if the approved quantity is zero.'
            );
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Alert.alert(
                'Post-Mortem Complete',
                'Inspection results recorded. This batch is now eligible for certificate issuance and QR generation.',
                [{ text: 'Issue Certificate', onPress: () => router.push('/batch-cert') }]
            );
        }, 1200);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={[]}>
            <SafeMeatHeader title="Post-Mortem Inspection" showBack />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', padding: 12, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(16, 185, 129, 0.1)', marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#10B981', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, gap: 4 }}>
                        <Ionicons name="shield-checkmark" size={12} color="#FFF" />
                        <Text style={{ color: '#FFF', fontSize: 8, fontWeight: '900' }}>INSPECTOR COMPLIANCE MODE</Text>
                    </View>
                    <Text style={{ fontSize: 11, fontWeight: '700', color: theme.muted }}>
                        Stage: {role === 'inspector' ? 'Post-Mortem' : 'Ante-Mortem'}
                    </Text>
                </View>

                <ComplianceStatusBar
                    status="compliant"
                    message="Inspector Compliance Mode"
                    subMessage="Direct ledger entry enabled"
                />

                <Text style={[styles.sectionTitle, { color: theme.text }]}>Inspection Results</Text>

                <SafeMeatInput
                    label="Animals Examined"
                    placeholder="e.g. 12"
                    icon="eye"
                    keyboardType="numeric"
                    value={form.examined}
                    onChangeText={(v) => setForm({ ...form, examined: v })}
                />

                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        <SafeMeatInput
                            label="Approved Quantity"
                            placeholder="e.g. 12"
                            icon="checkmark-circle"
                            keyboardType="numeric"
                            value={form.approved}
                            onChangeText={(v) => setForm({ ...form, approved: v })}
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                        <SafeMeatInput
                            label="Condemned / Rejected"
                            placeholder="e.g. 0"
                            icon="trash"
                            keyboardType="numeric"
                            value={form.condemned}
                            onChangeText={(v) => setForm({ ...form, condemned: v })}
                        />
                    </View>
                </View>

                <SafeMeatInput
                    label="Inspection Notes"
                    placeholder="Any specific observations..."
                    icon="document-text"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    style={{ height: 100 }}
                    value={form.notes}
                    onChangeText={(v) => setForm({ ...form, notes: v })}
                />

                <SafeMeatButton
                    title="Finalize Inspection"
                    onPress={handleSubmit}
                    loading={loading}
                    style={styles.submitBtn}
                />
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
    row: {
        flexDirection: 'row',
    },
    submitBtn: {
        marginTop: 20,
        marginBottom: 40,
    },
});
