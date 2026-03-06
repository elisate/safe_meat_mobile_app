import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import "../../global.css";
// Internal Components
import { HapticTab } from '@/components/haptic-tab';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === 'dark';

  // ── DEVICE UI STANDARDIZATION ──────────────────────────────────────────
  // We use extra generous padding and height for Android to ensure the 
  // "Dashboard", "Verify", and "Profile" labels are completely clear 
  // of the system navigation bar (Back, Home, Recents).
  const ANDROID_BOTTOM_PADDING = 34;
  const TAB_BAR_HEIGHT = Platform.OS === 'ios' ? 65 + insets.bottom : 95;

  return (
    <Tabs
      screenOptions={{
        // ── Colors ──────────────────────────────────────────────
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: isDark ? '#475569' : '#94A3B8',

        // ── Header ──────────────────────────────────────────────
        headerShown: false,

        // ── Keyboard Behavior ───────────────────────────────────
        tabBarHideOnKeyboard: true,

        // ── Haptic button ───────────────────────────────────────
        tabBarButton: HapticTab,

        // ── Tab bar Style ───────────────────────────────────────
        tabBarStyle: {
          backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
          borderTopColor: isDark ? '#1E293B' : '#E2E8F0',
          borderTopWidth: 1,

          height: TAB_BAR_HEIGHT,
          paddingTop: 12,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom + 8 : ANDROID_BOTTOM_PADDING,

          // Elevation and Premium Shadows
          elevation: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -6 },
          shadowOpacity: isDark ? 0.4 : 0.08,
          shadowRadius: 15,
        },

        // ── Label style ──────────────────────────────────────────
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '800',
          letterSpacing: 0.3,
          paddingBottom: Platform.OS === 'ios' ? 0 : 5,
        },
      }}
    >
      {/* ── Dashboard ── */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'grid' : 'grid-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* ── Verify / Scan ── */}
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Verify',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'qr-code' : 'qr-code-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* ── Profile ── */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? 'person-circle' : 'person-circle-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />

      {/* ── Explore (Hidden from Bar) ── */}
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}