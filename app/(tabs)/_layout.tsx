import { HapticTab } from '@/components/haptic-tab';
import { Ionicons } from '@expo/vector-icons';
import { Tabs, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, useColorScheme, View } from 'react-native'; // Added StyleSheet
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import "../../global.css";

export default function TabLayout() {
  const { role = 'inspector' } = useLocalSearchParams<{ role: string }>();
  const colorScheme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === 'dark';

  // ── DYNAMIC DIMENSIONS ──────────────────────────────────────────────
  // We use insets.bottom to dynamically handle the phone's navigation bar
  const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 65 + insets.bottom : 75 + insets.bottom;

  return (
    <Tabs
      screenOptions={{
        // ── Colors (Matching your image) ───────────────────────────
        tabBarActiveTintColor: '#10B981', // Airtel Red
        tabBarInactiveTintColor: isDark ? '#94A3B8' : '#717171',

        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarButton: HapticTab,

        // ── Tab Bar Container Style ───────────────────────────────
        tabBarStyle: {
          backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
          borderTopWidth: 0.5,
          borderTopColor: isDark ? '#1E293B' : '#E2E8F0',
          height: TAB_BAR_HEIGHT,
          // We use the safe area inset directly to avoid overlapping phone UI
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 10,
          elevation: 20,
        },

        // ── Label Style (Bold & Clean) ────────────────────────────
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          marginTop: 4,
        },

        // ── The "Red Underline" Indicator Logic ────────────────────
        // This targets the individual tab item to add that bottom bar
        tabBarItemStyle: {
          height: 55, // Fixed height for the touchable area
        },
      }}
    >
      {/* ── Home ── */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
              {focused && <View style={styles.indicator} />}
            </View>
          ),
        }}
      />

      {/* ── Operations (Operator Only) ── */}
      <Tabs.Screen
        name="operations"
        options={{
          title: 'Tasks',
          href: role === 'operator' ? undefined : null,
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Ionicons name={focused ? 'hammer' : 'hammer-outline'} size={24} color={color} />
              {focused && <View style={styles.indicator} />}
            </View>
          ),
        }}
      />

      {/* ── Storage (Manager Only) ── */}
      <Tabs.Screen
        name="storage"
        options={{
          title: 'Storage',
          href: role === 'manager' ? undefined : null,
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Ionicons name={focused ? 'cube' : 'cube-outline'} size={24} color={color} />
              {focused && <View style={styles.indicator} />}
            </View>
          ),
        }}
      />

      {/* ── Transport (Driver Only) ── */}
      <Tabs.Screen
        name="transport"
        options={{
          title: 'Transport',
          href: role === 'driver' ? undefined : null,
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Ionicons name={focused ? 'car' : 'car-outline'} size={24} color={color} />
              {focused && <View style={styles.indicator} />}
            </View>
          ),
        }}
      />

      {/* ── Receipts (Retail Only) ── */}
      <Tabs.Screen
        name="receipts"
        options={{
          title: 'Receipts',
          href: role === 'retail' ? undefined : null,
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Ionicons name={focused ? 'cart' : 'cart-outline'} size={24} color={color} />
              {focused && <View style={styles.indicator} />}
            </View>
          ),
        }}
      />

      {/* ── Inspections (Inspector Only) ── */}
      <Tabs.Screen
        name="inspections"
        options={{
          title: 'Tasks',
          href: role === 'inspector' ? undefined : null,
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Ionicons name={focused ? 'clipboard' : 'clipboard-outline'} size={24} color={color} />
              {focused && <View style={styles.indicator} />}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          title: role === 'inspector' ? 'Scan QR' : 'Verify',
          href: (role === 'operator' || role === 'driver') ? null : undefined,
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Ionicons name={focused ? 'qr-code' : 'qr-code-outline'} size={24} color={color} />
              {focused && <View style={styles.indicator} />}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={24} color={color} />
              {focused && <View style={styles.indicator} />}
            </View>
          ),
        }}
      />

      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    bottom: -32,
    width: 35,
    height: 4,
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
});