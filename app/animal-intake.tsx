import { ComplianceStatusBar } from '@/components/ui/ComplianceStatusBar';
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
        certDetails: '', // Renamed from healthCert
        certExpiry: '', // Renamed from healthCertExpiry, removed default
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        if (!form.supplier || !form.quantity || !form.certDetails) { // Updated validation
            Alert.alert('Missing Info', 'Please fill in mandatory fields.'); // Updated message
            return;
        }

        // ── Backend Compliance Rule Mirroring ──
        const expiryDate = new Date(form.certExpiry); // Updated state name
        const today = new Date('2026-03-06'); // System date as per prompt metadata

        if (expiryDate < today) {
            Alert.alert(
                'Compliance Blocked', // Updated title
                'Animal health certificate has expired. Slaughter is legally prohibited.', // Updated message
                [{ text: 'Notify Inspector', style: 'destructive' }] // Updated button
            );
            return;
        }

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            Alert.alert('Intake Recorded', 'Animals registered and awaiting inspection.'); // Updated message
            router.push('/(tabs)?role=operator'); // Updated navigation
        }, 1500);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={[]}>
            <SafeMeatHeader title="Animal Intake" showBack />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <ComplianceStatusBar
                        status="compliant"
                        message="Compliance Check Enabled"
                        subMessage="Automated health certificate validation active"
                    />
                    <Text style={[styles.title, { color: theme.text }]}>Animal Intake</Text>

                    <SafeMeatCard>
                        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Source Details</Text>

                        <SafeMeatInput
                            label="Supplier Name *"
                            placeholder="e.g. ABC Livestock"
                            icon="business" // Added icon
                            value={form.supplier}
                            onChangeText={(v) => setForm({ ...form, supplier: v })}
                        />

                        <SafeMeatInput
                            label="Farm Origin"
                            placeholder="e.g. Musanze District"
                            icon="pin"
                            value={form.farmOrigin}
                            onChangeText={(v) => setForm({ ...form, farmOrigin: v })}
                        />
                        <SafeMeatInput
                            label="Animal Species"
                            placeholder="e.g. Bovine (Cattle)"
                            icon="bug"
                            value={form.species}
                            onChangeText={(v) => setForm({ ...form, species: v })}
                        />
                        <SafeMeatInput
                            label="Quantity"
                            placeholder="e.g. 12"
                            icon="list"
                            keyboardType="numeric"
                            value={form.quantity}
                            onChangeText={(v) => setForm({ ...form, quantity: v })}
                        />
                    </SafeMeatCard>

                    <View style={{ height: 20 }} />

                    <SafeMeatCard>
                        <SafeMeatInput
                            label="Vehicle Plate"
                            placeholder="e.g. RAE 123 A"
                            icon="car"
                            value={form.vehicle}
                            onChangeText={(v) => setForm({ ...form, vehicle: v })}
                        />
                        <SafeMeatInput
                            label="Driver Name"
                            placeholder="e.g. John Doe"
                            icon="person"
                            value={form.driver}
                            onChangeText={(v) => setForm({ ...form, driver: v })}
                        />
                        <SafeMeatInput
                            label="Health Cert Details"
                            placeholder="e.g. CERT-2024-9981"
                            icon="document"
                            value={form.certDetails}
                            onChangeText={(v) => setForm({ ...form, certDetails: v })}
                        />
                        <SafeMeatInput
                            label="Health Cert Expire Date"
                            placeholder="e.g. 2026-03-30"
                            icon="calendar"
                            value={form.certExpiry}
                            onChangeText={(v) => setForm({ ...form, certExpiry: v })}
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
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        marginBottom: 20,
        letterSpacing: -0.5,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 16,
    },
    row: {
        flexDirection: 'row',
    },
    submitBtn: {
        marginTop: 8,
        marginBottom: 40,
    },
});
