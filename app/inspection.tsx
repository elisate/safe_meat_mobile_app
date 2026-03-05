import { SafeMeatButton } from '@/components/ui/SafeMeatButton';
import { SafeMeatHeader } from '@/components/ui/SafeMeatHeader';
import { SafeMeatInput } from '@/components/ui/SafeMeatInput';
import { Colors } from '@/constants/theme';
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

export default function PostMortemScreen() {
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
        if (parseInt(form.approved) === 0) {
            Alert.alert('Blocking Rule', 'Certificate cannot be issued if approved quantity is 0.');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Alert.alert(
                'Inspection Complete',
                'Post-mortem results recorded. Batch is now eligible for certificate issuance.',
                [{ text: 'View Batch', onPress: () => router.push('/batch-cert') }]
            );
        }, 1500);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={[]}>
            <SafeMeatHeader title="Post-Mortem Inspection" showBack />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Inspection Results</Text>

                <SafeMeatInput
                    label="Total Units Examined"
                    placeholder="0"
                    keyboardType="numeric"
                    value={form.examined}
                    onChangeText={(v) => setForm({ ...form, examined: v })}
                />

                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 8 }}>
                        <SafeMeatInput
                            label="Approved Qty"
                            placeholder="0"
                            keyboardType="numeric"
                            value={form.approved}
                            onChangeText={(v) => setForm({ ...form, approved: v })}
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                        <SafeMeatInput
                            label="Condemned Qty"
                            placeholder="0"
                            keyboardType="numeric"
                            value={form.condemned}
                            onChangeText={(v) => setForm({ ...form, condemned: v })}
                        />
                    </View>
                </View>

                <SafeMeatInput
                    label="Detailed Notes"
                    placeholder="Record any defects or issues found..."
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
