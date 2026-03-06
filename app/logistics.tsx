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

export default function LogisticsScreen() {
    const { role = 'manager' } = useLocalSearchParams<{ role: string }>();
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const isManager = role === 'manager';
    const isRetail = role === 'retail';
    const [phase, setPhase] = useState(isRetail ? 3 : (isManager ? 1 : 2));
    const [warehouseForm, setWarehouseForm] = useState({ temp: '2.5°C', bay: 'BAY-04', batch: 'BTCH-2024-8842' });
    const [transportForm, setTransportForm] = useState({
        vehicle: 'RAD 456 B',
        driver: 'John Smith',
        destination: 'Central Retail Hub',
        batch: 'BTCH-RE-9901'
    });
    const [deliveryForm, setDeliveryForm] = useState({
        receiver: 'Sarah Johnson',
        quantity: '48',
        batch: 'BTCH-RE-9901',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    });

    const handleWarehouseSubmit = () => {
        Alert.alert(
            'Storage Recorded',
            `Batch ${warehouseForm.batch} successfully stored in ${warehouseForm.bay} at ${warehouseForm.temp}.\n\nCompliance status: COLD CHAIN MAINTAINED.`,
            [{ text: 'OK', onPress: () => isManager ? router.push(`/(tabs)?role=${role}`) : setPhase(2) }]
        );
    };

    const handleTempUpdate = () => {
        Alert.alert(
            'Temperature Logged',
            `Real - time temperature of ${warehouseForm.temp} recorded for ${warehouseForm.batch}.`,
            [{ text: 'View History', onPress: () => { } }]
        );
    };

    const handleTransportSubmit = () => {
        // ── Backend Validation Workflow Mirroring ──
        const mockValidations = {
            hasValidCertificate: true,
            isBatchApproved: true,
            isStorageReleased: false // Set to false to demonstrate compliance block
        };

        if (!mockValidations.hasValidCertificate) {
            Alert.alert('✋ Transport Blocked', 'Critical: Meat Safety Certificate for this batch is INVALID or EXPIRED.');
            return;
        }

        if (!mockValidations.isBatchApproved) {
            Alert.alert('✋ Transport Blocked', 'Critical: Batch has not been approved by the Inspector for transport.');
            return;
        }

        if (!mockValidations.isStorageReleased) {
            Alert.alert(
                '✋ Transport Blocked',
                'Critical: Warehouse Storage has not RELEASED this batch for transport yet. Please contact the Warehouse Manager.',
                [{ text: 'Request Release', style: 'default' }, { text: 'Cancel', style: 'cancel' }]
            );
            return;
        }

        Alert.alert(
            'Departure Confirmed',
            `Trip started for Batch ${transportForm.batch}.\nDestination: ${transportForm.destination}`,
            [{ text: 'OK', onPress: () => setPhase(3) }]
        );
    };

    const handleDeliverySubmit = () => {
        Alert.alert(
            'Delivery Confirmed',
            `Successfully received ${deliveryForm.quantity} units for Batch ${deliveryForm.batch}.\n\nInventory updated. Traceability cycle complete.`,
            [{ text: 'View Receipts', onPress: () => router.push(isRetail ? `/(tabs)?role=${role}` : '/(tabs)') }]
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
                        <ComplianceStatusBar
                            status="compliant"
                            message="Storage Intelligence Active"
                            subMessage="Temp monitoring within safety thresholds"
                        />
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Warehouse Storage</Text>
                        <SafeMeatCard>
                            <View style={styles.infoRow}>
                                <Text style={[styles.infoLabel, { color: theme.muted }]}>Current Batch</Text>
                                <Text style={[styles.infoValue, { color: theme.text }]}>{warehouseForm.batch}</Text>
                            </View>
                        </SafeMeatCard>

                        <SafeMeatInput
                            label="Entry Temperature"
                            placeholder="e.g. 2.0°C"
                            icon="thermometer"
                            value={warehouseForm.temp}
                            onChangeText={(v) => setWarehouseForm({ ...warehouseForm, temp: v })}
                        />
                        <SafeMeatInput
                            label="Storage Bay"
                            placeholder="e.g. COLD-STORAGE-A"
                            icon="layers"
                            value={warehouseForm.bay}
                            onChangeText={(v) => setWarehouseForm({ ...warehouseForm, bay: v })}
                        />

                        <SafeMeatButton
                            title="Record Storage Entry"
                            onPress={handleWarehouseSubmit}
                            style={{ marginTop: 16 }}
                        />

                        {isManager && (
                            <SafeMeatButton
                                title="Update Temperature Log"
                                variant="outline"
                                onPress={handleTempUpdate}
                                style={{ marginTop: 12 }}
                            />
                        )}
                    </View>
                )}

                {phase === 2 && (
                    <View>
                        <ComplianceStatusBar
                            status="pending"
                            message="Awaiting Dispatch Approval"
                            subMessage="Verify safety certificates before departure"
                        />
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Dispatch Transport</Text>
                        <SafeMeatInput
                            label="Vehicle Plate"
                            placeholder="e.g. RAD 456 B"
                            icon="car"
                            value={transportForm.vehicle}
                            onChangeText={(v) => setTransportForm({ ...transportForm, vehicle: v })}
                        />
                        <SafeMeatInput
                            label="Driver Name"
                            placeholder="e.g. Mike Smith"
                            icon="person"
                            value={transportForm.driver}
                            onChangeText={(v) => setTransportForm({ ...transportForm, driver: v })}
                        />
                        <SafeMeatInput
                            label="Destination Facility"
                            placeholder="e.g. Central Retail Hub"
                            icon="location"
                            value={transportForm.destination}
                            onChangeText={(v) => setTransportForm({ ...transportForm, destination: v })}
                        />

                        <SafeMeatInput
                            label="Batch to Transport"
                            placeholder="e.g. BTCH-XXXX-XXXX"
                            icon="cube"
                            value={transportForm.batch}
                            onChangeText={(v) => setTransportForm({ ...transportForm, batch: v })}
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
                        <ComplianceStatusBar
                            status="compliant"
                            message="Delivery Traceability Cycle"
                            subMessage="Completing end-to-end meat lifecycle"
                        />
                        <Text style={[styles.sectionTitle, { color: theme.text }]}>Delivery Confirmation</Text>
                        <SafeMeatCard style={{ marginBottom: 24 }}>
                            <View style={styles.summaryItem}>
                                <Ionicons name="cube" size={16} color={theme.primary} />
                                <Text style={[styles.summaryText, { color: theme.text }]}>
                                    Batch: {deliveryForm.batch}
                                </Text>
                            </View>
                            <View style={[styles.summaryItem, { marginTop: 10 }]}>
                                <Ionicons name="location" size={16} color={theme.primary} />
                                <Text style={[styles.summaryText, { color: theme.text }]}>
                                    Arrived at: {transportForm.destination || 'Retail Hub'}
                                </Text>
                            </View>
                        </SafeMeatCard>

                        <SafeMeatInput
                            label="Received Quantity"
                            placeholder="0"
                            icon="cart"
                            keyboardType="numeric"
                            value={deliveryForm.quantity}
                            onChangeText={(v) => setDeliveryForm({ ...deliveryForm, quantity: v })}
                        />
                        <SafeMeatInput
                            label="Receiver Name"
                            placeholder="e.g. Jane Doe"
                            icon="person-circle"
                            value={deliveryForm.receiver}
                            onChangeText={(v) => setDeliveryForm({ ...deliveryForm, receiver: v })}
                        />
                        <SafeMeatInput
                            label="Delivery Date"
                            placeholder="e.g. March 06, 2026"
                            icon="calendar"
                            value={deliveryForm.date}
                            onChangeText={(v) => setDeliveryForm({ ...deliveryForm, date: v })}
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
