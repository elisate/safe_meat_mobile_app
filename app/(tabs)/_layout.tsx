import { Tabs, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Platform, useColorScheme, View } from 'react-native'; // Added View
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import "../../global.css";
import { HapticTab } from '@/components/haptic-tab';
import { Ionicons } from '@expo/vector-icons';

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
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={24}
                color={color}
              />
              {/* This View creates the red line seen in your image */}
              {focused && (
                <View 
                  style={{ 
                    position: 'absolute', 
                    bottom: -32, // Adjust based on height
                    width: 35, 
                    height: 4, 
                    backgroundColor: '#10B981', 
                    borderRadius: 2 
                  }} 
                />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="scan"
        options={{
          title: 'Verify',
          href: (role === 'operator' || role === 'driver') ? null : undefined,
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center', width: '100%' }}>
              <Ionicons
                name={focused ? 'qr-code' : 'qr-code-outline'}
                size={24}
                color={color}
              />
              {focused && (
                <View 
                  style={{ 
                    position: 'absolute', 
                    bottom: -32, 
                    width: 35, 
                    height: 4, 
                    backgroundColor: '#10B981', 
                    borderRadius: 2 
                  }} 
                />
              )}
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
              <Ionicons
                name={focused ? 'person-circle' : 'person-circle-outline'}
                size={24}
                color={color}
              />
              {focused && (
                <View 
                  style={{ 
                    position: 'absolute', 
                    bottom: -32, 
                    width: 35, 
                    height: 4, 
                    backgroundColor: '#10B981', 
                    borderRadius: 2 
                  }} 
                />
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}