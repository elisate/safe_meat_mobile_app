import { SafeMeatButton } from '@/components/ui/SafeMeatButton';
import { SafeMeatCard } from '@/components/ui/SafeMeatCard';
import { SafeMeatHeader } from '@/components/ui/SafeMeatHeader';
import { SafeMeatInput } from '@/components/ui/SafeMeatInput';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    useColorScheme,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AnimalIntakeScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const [form, setForm] = useState({
        supplier: '',
        farmOrigin: '',
        species: '',
        quantity: '',
        vehicle: '',
        driver: '',
        healthCert: '',
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        if (!form.supplier || !form.quantity) {
            Alert.alert('Error', 'Please fill in required fields (Supplier & Quantity)');
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Alert.alert(
                'Success',
                'Animal intake recorded successfully. Backend validation pending.',
                [{ text: 'OK', onPress: () => router.back() }]
            );
        }, 1500);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={[]}>
            <SafeMeatHeader title="Animal Intake" showBack />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    <SafeMeatCard>
                        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Source Details</Text>

                        <SafeMeatInput
                            label="Supplier Name *"
                            placeholder="e.g. ABC Livestock"
                            value={form.supplier}
                            onChangeText={(v) => setForm({ ...form, supplier: v })}
                        />

                        <SafeMeatInput
                            label="Farm Origin"
                            placeholder="e.g. Green Valley Farm"
                            value={form.farmOrigin}
                            onChangeText={(v) => setForm({ ...form, farmOrigin: v })}
                        />

                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 8 }}>
                                <SafeMeatInput
                                    label="Species"
                                    placeholder="e.g. Bovine"
                                    value={form.species}
                                    onChangeText={(v) => setForm({ ...form, species: v })}
                                />
                            </View>
                            <View style={{ flex: 1, marginLeft: 8 }}>
                                <SafeMeatInput
                                    label="Quantity *"
                                    placeholder="0"
                                    keyboardType="numeric"
                                    value={form.quantity}
                                    onChangeText={(v) => setForm({ ...form, quantity: v })}
                                />
                            </View>
                        </View>
                    </SafeMeatCard>

                    <SafeMeatCard variant="glass">
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Logistics & Health</Text>

                        <SafeMeatInput
                            label="Vehicle Plate"
                            placeholder="e.g. RAD 123 A"
                            value={form.vehicle}
                            onChangeText={(v) => setForm({ ...form, vehicle: v })}
                        />

                        <SafeMeatInput
                            label="Driver Name"
                            placeholder="e.g. John Doe"
                            value={form.driver}
                            onChangeText={(v) => setForm({ ...form, driver: v })}
                        />

                        <SafeMeatInput
                            label="Health Certificate #"
                            placeholder="CERT-XXXX-XXXX"
                            value={form.healthCert}
                            onChangeText={(v) => setForm({ ...form, healthCert: v })}
                        />
                    </SafeMeatCard>

                    <SafeMeatButton
                        title="Submit Records"
                        onPress={handleSubmit}
                        loading={loading}
                        style={styles.submitBtn}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
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
        fontSize: 14,
        fontWeight: '800',
        marginBottom: 24,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
    },
    row: {
        flexDirection: 'row',
    },
    submitBtn: {
        marginTop: 8,
        marginBottom: 40,
    },
});
