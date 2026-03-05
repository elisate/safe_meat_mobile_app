/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#0F172A', // Slate 900
    background: '#F8FAFC', // Slate 50
    primary: '#059669', // Emerald 600
    secondary: '#334155', // Slate 700
    accent: '#F59E0B', // Amber 500
    error: '#E11D48', // Rose 600
    success: '#10B981', // Emerald 500
    border: '#E2E8F0', // Slate 200
    muted: '#64748B', // Slate 500
    tint: '#059669',
    icon: '#94A3B8', // Slate 400
    tabIconDefault: '#94A3B8',
    tabIconSelected: '#059669',
    card: '#FFFFFF',
    glass: 'rgba(255, 255, 255, 0.7)',
  },
  dark: {
    text: '#F8FAFC',
    background: '#020617', // Slate 950
    primary: '#10B981',
    secondary: '#94A3B8',
    accent: '#FBBF24',
    error: '#FB7185',
    success: '#34D399',
    border: '#1E293B', // Slate 800
    muted: '#94A3B8',
    tint: '#10B981',
    icon: '#475569', // Slate 600
    tabIconDefault: '#475569',
    tabIconSelected: '#10B981',
    card: '#0F172A', // Slate 900
    glass: 'rgba(15, 23, 42, 0.7)',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
