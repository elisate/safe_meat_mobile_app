import { SafeMeatCard } from '@/components/ui/SafeMeatCard';
import { SafeMeatHeader } from '@/components/ui/SafeMeatHeader';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StorageScreen() {
    const { role = 'manager' } = useLocalSearchParams<{ role: string }>();
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const tabBarHeight = useBottomTabBarHeight();

    const stats = [
        { label: 'In Storage', value: '24', icon: 'cube-outline', color: '#8B5CF6' },
        { label: 'Released', value: '12', icon: 'open-outline', color: '#10B981' },
        { label: 'Alerts', value: '2', icon: 'warning-outline', color: '#F59E0B' },
    ];

    const tasks = [
        {
            id: '1',
            title: 'Batch Storage Entry',
            subtitle: 'Record arrival in warehouse',
            icon: 'download',
            color: '#8B5CF6',
            route: '/logistics',
            description: 'Log arrival time, section, and temperature'
        },
        {
            id: '2',
            title: 'Temperature Monitoring',
            subtitle: 'Cold chain compliance',
            icon: 'thermometer',
            color: '#F59E0B',
            route: '/logistics',
            description: 'View real-time logs and history'
        },
        {
            id: '3',
            title: 'Stock Release',
            subtitle: 'Approve dispatch',
            icon: 'share-social',
            color: '#10B981',
            route: '/logistics',
            description: 'Authorize transport for compliant batches'
        }
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={[]}>
            <StatusBar barStyle="light-content" backgroundColor="#10B981" />
            <SafeMeatHeader title="Storage Hub" role={role as string} />

            <ScrollView
                contentContainerStyle={[styles.scrollContent, { paddingBottom: tabBarHeight + 20 }]}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero section to match dashboard */}
                <View style={styles.heroSection}>
                    <Text style={[styles.welcomeText, { color: theme.text }]}>Warehouse Control</Text>
                    <Text style={[styles.subtitleText, { color: theme.muted }]}>Storage & Cold Chain Management</Text>
                    <Text style={[styles.dateText, { color: theme.muted }]}>
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </Text>
                </View>

                {/* Stats Row to match dashboard */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsScroll}>
                    {stats.map((stat, i) => (
                        <SafeMeatCard key={i} variant="elevated" style={styles.statCard}>
                            <View style={[styles.statIconWrap, { backgroundColor: stat.color + '18' }]}>
                                <Ionicons name={stat.icon as any} size={20} color={stat.color} />
                            </View>
                            <Text style={[styles.statValue, { color: theme.text }]}>{stat.value}</Text>
                            <Text style={[styles.statLabel, { color: theme.muted }]}>{stat.label}</Text>
                        </SafeMeatCard>
                    ))}
                </ScrollView>

                <View style={styles.sectionHeader}>
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Management Tasks</Text>
                    <View style={[styles.sectionBadge, { backgroundColor: theme.primary + '18' }]}>
                        <Text style={[styles.sectionBadgeText, { color: theme.primary }]}>Active inventory</Text>
                    </View>
                </View>

                {tasks.map((task) => (
                    <TouchableOpacity
                        key={task.id}
                        onPress={() => router.push(`${task.route}?role=${role}`)}
                        activeOpacity={0.8}
                    >
                        <SafeMeatCard style={styles.taskCard}>
                            <View style={[styles.iconBox, { backgroundColor: task.color + '18' }]}>
                                <Ionicons name={task.icon as any} size={24} color={task.color} />
                            </View>
                            <View style={styles.taskInfo}>
                                <Text style={[styles.taskTitle, { color: theme.text }]}>{task.title}</Text>
                                <Text style={[styles.taskSubtitle, { color: theme.muted }]}>{task.description}</Text>
                            </View>
                            <View style={[styles.chevronBox, { backgroundColor: theme.primary + '15' }]}>
                                <Ionicons name="chevron-forward" size={14} color={theme.primary} />
                            </View>
                        </SafeMeatCard>
                    </TouchableOpacity>
                ))}
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
        paddingTop: 16,
    },
    heroSection: {
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    subtitleText: {
        fontSize: 13,
        fontWeight: '600',
        marginTop: 2,
    },
    dateText: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 6,
        opacity: 0.7,
    },
    statsScroll: {
        gap: 12,
        paddingRight: 20,
        marginBottom: 28,
    },
    statCard: {
        width: 110,
        padding: 16,
        marginBottom: 0,
        borderRadius: 20,
        alignItems: 'flex-start',
    },
    statIconWrap: {
        width: 38,
        height: 38,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '900',
        letterSpacing: -0.8,
    },
    statLabel: {
        fontSize: 11,
        fontWeight: '700',
        marginTop: 2,
        textTransform: 'uppercase',
        letterSpacing: 0.4,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 17,
        fontWeight: '800',
    },
    sectionBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    sectionBadgeText: {
        fontSize: 11,
        fontWeight: '700',
    },
    taskCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 12,
        borderRadius: 20,
    },
    iconBox: {
        width: 52,
        height: 52,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    taskInfo: {
        flex: 1,
    },
    taskTitle: {
        fontSize: 15,
        fontWeight: '800',
        letterSpacing: -0.2,
    },
    taskSubtitle: {
        fontSize: 12,
        fontWeight: '500',
        marginTop: 2,
        lineHeight: 16,
    },
    chevronBox: {
        width: 30,
        height: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
