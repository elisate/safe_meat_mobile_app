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

export default function TransportScreen() {
    const { role = 'driver' } = useLocalSearchParams<{ role: string }>();
    const router = useRouter();
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const tabBarHeight = useBottomTabBarHeight();

    const stats = [
        { label: 'Trips Today', value: '4', icon: 'car-outline', color: '#F59E0B' },
        { label: 'Batches Moved', value: '12', icon: 'cube-outline', color: '#8B5CF6' },
        { label: 'Distance', value: '142km', icon: 'map-outline', color: '#3B82F6' },
    ];

    const tasks = [
        {
            id: '1',
            title: 'Create Transport Trip',
            subtitle: 'Start new delivery',
            icon: 'add-circle',
            color: '#F59E0B',
            route: '/logistics',
            description: 'Enter vehicle, destination, and select batch'
        },
        {
            id: '2',
            title: 'Active Trips',
            subtitle: 'Monitor current deliveries',
            icon: 'map',
            color: '#10B981',
            route: '/logistics',
            description: 'Track your route and confirmation status'
        },
        {
            id: '3',
            title: 'Trip History',
            subtitle: 'View past deliveries',
            icon: 'time',
            color: '#64748B',
            route: '/logistics',
            description: 'Summary of all completed transport tasks'
        }
    ];

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={[]}>
            <StatusBar barStyle="light-content" backgroundColor="#10B981" />
            <SafeMeatHeader title="Transport Hub" role={role as string} />

            <ScrollView
                contentContainerStyle={[styles.scrollContent, { paddingBottom: tabBarHeight + 20 }]}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero section to match dashboard */}
                <View style={styles.heroSection}>
                    <Text style={[styles.welcomeText, { color: theme.text }]}>Logistics Control</Text>
                    <Text style={[styles.subtitleText, { color: theme.muted }]}>Meat Distribution & Tracking</Text>
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
                    <Text style={[styles.sectionTitle, { color: theme.text }]}>Distribution Workflow</Text>
                    <View style={[styles.sectionBadge, { backgroundColor: theme.primary + '18' }]}>
                        <Text style={[styles.sectionBadgeText, { color: theme.primary }]}>Active Trip</Text>
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
