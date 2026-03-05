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

export default function LogisticsScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const [phase, setPhase] = useState(1); // 1: Warehouse, 2: Transport, 3: Delivery
    const [warehouseForm, setWarehouseForm] = useState({ temp: '2.5°C', bay: 'BAY-04' });
    const [transportForm, setTransportForm] = useState({ vehicle: '', driver: '', destination: '' });
    const [deliveryForm, setDeliveryForm] = useState({ receiver: '', quantity: '' });

    const handleWarehouseSubmit = () => {
        setPhase(2);
    };

    const handleTransportSubmit = () => {
        setPhase(3);
    };

    const handleDeliverySubmit = () => {
        Alert.alert(
            'Delivery Confirmed',
            'Batch status updated to RECEIVED. Traceability cycle complete.',
            [{ text: 'Back to Dashboard', onPress: () => router.push('/(tabs)') }]
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={[]}>
            <SafeMeatHeader title="Logistics & Transport" showBack />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Phase Indicator */}
                <View style={styles.phases}>
                    {[1, 2, 3].map((p) => (
                        <View
                            key={p}
                            style={[
                                styles.phaseItem,
                                { borderBottomColor: phase === p ? theme.primary : 'transparent' }
                            ]}
                        >
                            <Text style={[
                                styles.phaseText,
                                { color: phase === p ? theme.primary : theme.muted }
                            ]}>
                                {p === 1 ? 'STORAGE' : p === 2 ? 'TRANSPORT' : 'DELIVERY'}
                            </Text>
                        </View>
                    ))}
                </View>

                {phase === 1 && (
                    <View>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Warehouse Storage</Text>
                        <SafeMeatCard>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.muted }]}>Current Batch</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>BTCH-2024-8842</Text>
                            </View>
                        </SafeMeatCard>

                        <SafeMeatInput
                            label="Entry Temperature"
                            placeholder="e.g. 2.0°C"
                            value={warehouseForm.temp}
                            onChangeText={(v) => setWarehouseForm({ ...warehouseForm, temp: v })}
                        />
                        <SafeMeatInput
                            label="Storage Bay"
                            placeholder="e.g. COLD-STORAGE-A"
                            value={warehouseForm.bay}
                            onChangeText={(v) => setWarehouseForm({ ...warehouseForm, bay: v })}
                        />

                        <SafeMeatButton
                            title="Record Storage Entry"
                            onPress={handleWarehouseSubmit}
                            style={{ marginTop: 16 }}
                        />
                    </View>
                )}

                {phase === 2 && (
                    <View>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Dispatch Transport</Text>
                        <SafeMeatInput
                            label="Vehicle Plate"
                            placeholder="e.g. RAD 456 B"
                            value={transportForm.vehicle}
                            onChangeText={(v) => setTransportForm({ ...transportForm, vehicle: v })}
                        />
                        <SafeMeatInput
                            label="Driver Name"
                            placeholder="e.g. Mike Smith"
                            value={transportForm.driver}
                            onChangeText={(v) => setTransportForm({ ...transportForm, driver: v })}
                        />
                        <SafeMeatInput
                            label="Destination Facility"
                            placeholder="e.g. Central Retail Hub"
                            value={transportForm.destination}
                            onChangeText={(v) => setTransportForm({ ...transportForm, destination: v })}
                        />

                        <SafeMeatButton
                            title="Confirm Departure"
                            onPress={handleTransportSubmit}
                            style={{ marginTop: 16 }}
                        />
                    </View>
                )}

                {phase === 3 && (
                    <View>
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Delivery Confirmation</Text>
                        <SafeMeatCard style={{ marginBottom: 24 }}>
                            <View style={styles.summaryItem}>
                                <Ionicons name="location" size={16} color={theme.primary} />
                                <Text style={[styles.summaryText, { color: theme.text }]}>
                                    Arrived at: {transportForm.destination || 'Retail Hub'}
                                </Text>
                            </View>
                        </SafeMeatCard>

                        <SafeMeatInput
                            label="Received Quantity"
                            placeholder="0"
                            keyboardType="numeric"
                            value={deliveryForm.quantity}
                            onChangeText={(v) => setDeliveryForm({ ...deliveryForm, quantity: v })}
                        />
                        <SafeMeatInput
                            label="Receiver Name"
                            placeholder="e.g. Jane Doe"
                            value={deliveryForm.receiver}
                            onChangeText={(v) => setDeliveryForm({ ...deliveryForm, receiver: v })}
                        />

                        <SafeMeatButton
                            title="Confirm Receipt"
                            onPress={handleDeliverySubmit}
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
    phases: {
        flexDirection: 'row',
        marginBottom: 32,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    phaseItem: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderBottomWidth: 3,
    },
    phaseText: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: '600',
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '700',
    },
    summaryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    summaryText: {
        fontSize: 15,
        fontWeight: '600',
    },
});
