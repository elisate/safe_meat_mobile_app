import { SafeMeatCard } from '@/components/ui/SafeMeatCard';
import { SafeMeatHeader } from '@/components/ui/SafeMeatHeader';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

interface Module {
  id: string;
  title: string;
  icon: string;
  color: string;
  route: string;
  description: string;
  badge?: string;
}

interface RoleConfig {
  greeting: string;
  subtitle: string;
  stats: Array<{ label: string; value: string; icon: string; color: string }>;
  modules: Module[];
}

const DASHBOARD_CONFIG: Record<string, RoleConfig> = {
  inspector: {
    greeting: 'Inspector Dashboard',
    subtitle: 'Health & Compliance Overview',
    stats: [
      { label: 'Pending', value: '4', icon: 'time-outline', color: '#F59E0B' },
      { label: 'Approved', value: '52', icon: 'checkmark-circle', color: '#10B981' },
      { label: 'Rejected', value: '3', icon: 'close-circle', color: '#E11D48' },
    ],
    modules: [
      { id: 'sessions', title: 'Slaughter Sessions', icon: 'calendar', color: '#F59E0B', route: '/slaughter-ops', description: 'View your assigned sessions for today', badge: '4' },
      { id: 'ante', title: 'Ante-Mortem Inspection', icon: 'eye', color: '#10B981', route: '/inspection', description: 'Pre-slaughter animal health check' },
      { id: 'post', title: 'Post-Mortem Inspection', icon: 'shield-checkmark', color: '#059669', route: '/inspection', description: 'Post-slaughter quality assessment' },
      { id: 'cert', title: 'Issue Certificates', icon: 'document-text', color: '#3B82F6', route: '/batch-cert', description: 'Issue health & compliance certificates' },
    ],
  },
  operator: {
    greeting: 'Operator Dashboard',
    subtitle: 'Slaughterhouse Operations',
    stats: [
      { label: 'Planned', value: '180', icon: 'calendar-outline', color: '#3B82F6' },
      { label: 'Slaughtered', value: '156', icon: 'checkmark-done', color: '#10B981' },
      { label: 'Batches', value: '8', icon: 'cube-outline', color: '#8B5CF6' },
    ],
    modules: [
      { id: 'intake', title: 'Animal Intake', icon: 'add-circle', color: '#10B981', route: '/animal-intake', description: 'Register arriving animals & supplier info' },
      { id: 'slaughter', title: 'Slaughter Execution', icon: 'hammer', color: '#3B82F6', route: '/slaughter-ops', description: 'Record actual slaughter count & time' },
      { id: 'batch', title: 'Batch Creation', icon: 'cube', color: '#8B5CF6', route: '/batch-cert', description: 'Create batch linked to slaughter run' },
      { id: 'logs', title: 'Daily Logs', icon: 'time', color: '#64748B', route: '/slaughter-ops', description: 'View today\'s operational performance' },
    ],
  },
  manager: {
    greeting: 'Manager Dashboard',
    subtitle: 'Warehouse & Storage Control',
    stats: [
      { label: 'In Storage', value: '24', icon: 'cube-outline', color: '#8B5CF6' },
      { label: 'Released', value: '12', icon: 'open-outline', color: '#10B981' },
      { label: 'Alerts', value: '2', icon: 'warning-outline', color: '#F59E0B' },
    ],
    modules: [
      { id: 'warehouse', title: 'Storage Entry', icon: 'cube', color: '#8B5CF6', route: '/logistics', description: 'Record batch entry & temperature at entry' },
      { id: 'temp', title: 'Temperature Logs', icon: 'thermometer', color: '#F59E0B', route: '/logistics', description: 'Monitor cold chain compliance' },
      { id: 'release', title: 'Stock Release', icon: 'open', color: '#10B981', route: '/logistics', description: 'Approve batch dispatch to transport' },
    ],
  },
  driver: {
    greeting: 'Driver Dashboard',
    subtitle: 'Transport & Delivery',
    stats: [
      { label: 'Active Trips', value: '1', icon: 'car-outline', color: '#F59E0B' },
      { label: 'Completed', value: '9', icon: 'checkmark-circle', color: '#10B981' },
      { label: 'Distance', value: '142km', icon: 'map-outline', color: '#3B82F6' },
    ],
    modules: [
      { id: 'transport', title: 'Start Transport Trip', icon: 'car', color: '#F59E0B', route: '/logistics', description: 'Create trip, enter vehicle & destination' },
      { id: 'active', title: 'Active Deliveries', icon: 'map', color: '#10B981', route: '/logistics', description: 'Track your current delivery route' },
      { id: 'confirm', title: 'Confirm Departure', icon: 'checkmark-done-circle', color: '#059669', route: '/logistics', description: 'Mark departure from warehouse' },
    ],
  },
  retail: {
    greeting: 'Retail Dashboard',
    subtitle: 'Delivery & Receipt',
    stats: [
      { label: 'Pending', value: '3', icon: 'time-outline', color: '#F59E0B' },
      { label: 'Received', value: '28', icon: 'cart', color: '#10B981' },
      { label: 'Returns', value: '0', icon: 'return-down-back', color: '#E11D48' },
    ],
    modules: [
      { id: 'receive', title: 'Delivery Confirmation', icon: 'cart', color: '#10B981', route: '/logistics', description: 'Confirm meat receipt & enter quantity' },
      { id: 'logs', title: 'Receipt History', icon: 'receipt', color: '#64748B', route: '/logistics', description: 'View past delivery records' },
    ],
  },
};

export default function DashboardScreen() {
  const { role = 'inspector' } = useLocalSearchParams<{ role: string }>();
  const colorScheme = useColorScheme() ?? 'light';
  const theme = Colors[colorScheme];
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();

  const cfg = DASHBOARD_CONFIG[role as string] || DASHBOARD_CONFIG.inspector;

  const renderModule = (module: Module) => (
    <TouchableOpacity
      key={module.id}
      onPress={() => router.push(module.route as any)}
      activeOpacity={0.8}
      style={styles.moduleWrapper}
    >
      <SafeMeatCard style={styles.moduleCard}>
        <View style={[styles.iconBox, { backgroundColor: module.color + (colorScheme === 'dark' ? '28' : '18') }]}>
          <Ionicons name={module.icon as any} size={26} color={module.color} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.moduleTitle, { color: theme.text }]}>{module.title}</Text>
          <Text style={[styles.moduleSubtitle, { color: theme.muted }]}>{module.description}</Text>
        </View>
        {module.badge && (
          <View style={[styles.badgePill, { backgroundColor: '#F59E0B' }]}>
            <Text style={styles.badgeText}>{module.badge}</Text>
          </View>
        )}
        <View style={[styles.chevronBox, { backgroundColor: theme.primary + '15' }]}>
          <Ionicons name="chevron-forward" size={14} color={theme.primary} />
        </View>
      </SafeMeatCard>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={[]}>
      <StatusBar barStyle="light-content" backgroundColor="#10B981" />
      <SafeMeatHeader title="Safe Meat Pro" role={role as string} />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: tabBarHeight + 16 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.heroSection}>
          <Text style={[styles.welcomeText, { color: theme.text }]}>{cfg.greeting}</Text>
          <Text style={[styles.subtitleText, { color: theme.muted }]}>{cfg.subtitle}</Text>
          <Text style={[styles.dateText, { color: theme.muted }]}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </Text>
        </View>

        {/* Stats Row */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsScroll}>
          {cfg.stats.map((stat, i) => (
            <SafeMeatCard key={i} variant="elevated" style={styles.statCard}>
              <View style={[styles.statIconWrap, { backgroundColor: stat.color + '18' }]}>
                <Ionicons name={stat.icon as any} size={20} color={stat.color} />
              </View>
              <Text style={[styles.statValue, { color: theme.text }]}>{stat.value}</Text>
              <Text style={[styles.statLabel, { color: theme.muted }]}>{stat.label}</Text>
            </SafeMeatCard>
          ))}
        </ScrollView>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Operational Modules</Text>
          <View style={[styles.sectionBadge, { backgroundColor: theme.primary + '18' }]}>
            <Text style={[styles.sectionBadgeText, { color: theme.primary }]}>{cfg.modules.length} features</Text>
          </View>
        </View>

        {/* Module Cards */}
        <View style={styles.modulesGrid}>
          {cfg.modules.map(renderModule)}
        </View>

        {/* Compliance Health */}
        {/* <SafeMeatCard variant="glass" style={styles.flowCard}>
          <View style={styles.flowHeader}>
            <View style={[styles.flowIconWrap, { backgroundColor: '#10B981' + '20' }]}>
              <Ionicons name="shield-checkmark" size={20} color="#10B981" />
            </View>
            <Text style={[styles.flowTitle, { color: theme.text }]}>Compliance Health</Text>
            <Text style={[styles.flowPct, { color: '#10B981' }]}>94%</Text>
          </View>
          <View style={[styles.healthBarBg, { backgroundColor: theme.border }]}>
            <View style={[styles.healthBarFill, { width: '94%' }]} />
          </View>
          <Text style={[styles.flowDesc, { color: theme.muted }]}>
            Operations 94% compliant. No safety breaches in last 24h. All logs synced with backend.
          </Text>
        </SafeMeatCard> */}
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
    // paddingBottom is set dynamically via tabBarHeight
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
  modulesGrid: {
    gap: 0,
    marginBottom: 4,
  },
  moduleWrapper: {
    width: '100%',
  },
  moduleCard: {
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
  moduleTitle: {
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  moduleSubtitle: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
    lineHeight: 16,
  },
  badgePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    marginRight: 8,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
  },
  chevronBox: {
    width: 30,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flowCard: {
    marginTop: 16,
    padding: 20,
    borderRadius: 24,
  },
  flowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  flowIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flowTitle: {
    fontSize: 16,
    fontWeight: '800',
    flex: 1,
  },
  flowPct: {
    fontSize: 17,
    fontWeight: '900',
  },
  healthBarBg: {
    height: 7,
    borderRadius: 4,
    marginBottom: 14,
    overflow: 'hidden',
  },
  healthBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  flowDesc: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
});
