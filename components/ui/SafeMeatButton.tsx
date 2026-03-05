import { Colors } from '@/constants/theme';
import * as Haptics from 'expo-haptics';
import React from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TextStyle,
    useColorScheme,
    ViewStyle
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

interface SafeMeatButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'error' | 'glass';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const SafeMeatButton: React.FC<SafeMeatButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    style,
    textStyle,
}) => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePressIn = () => {
        if (!loading && !disabled) {
            scale.value = withSpring(0.96, { damping: 10, stiffness: 300 });
        }
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    const handlePress = () => {
        if (!loading && !disabled) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onPress();
        }
    };

    const getVariantStyles = () => {
        switch (variant) {
            case 'secondary':
                return {
                    button: { backgroundColor: theme.secondary },
                    text: { color: '#FFFFFF' },
                };
            case 'outline':
                return {
                    button: {
                        backgroundColor: 'transparent',
                        borderWidth: 1.5,
                        borderColor: theme.primary
                    },
                    text: { color: theme.primary },
                };
            case 'ghost':
                return {
                    button: { backgroundColor: 'transparent' },
                    text: { color: theme.primary },
                };
            case 'error':
                return {
                    button: { backgroundColor: theme.error },
                    text: { color: '#FFFFFF' },
                };
            case 'glass':
                return {
                    button: {
                        backgroundColor: theme.glass,
                        borderWidth: 1,
                        borderColor: 'rgba(255,255,255,0.1)'
                    },
                    text: { color: theme.text },
                };
            default:
                return {
                    button: { backgroundColor: theme.primary },
                    text: { color: '#FFFFFF' },
                };
        }
    };

    const variantStyles = getVariantStyles();

    return (
        <Pressable
            onPress={handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled || loading}
            style={style}
        >
            <Animated.View
                style={[
                    styles.button,
                    variantStyles.button,
                    disabled && styles.disabled,
                    animatedStyle,
                ]}
            >
                {loading ? (
                    <ActivityIndicator color={variantStyles.text.color} size="small" />
                ) : (
                    <Text style={[styles.text, variantStyles.text, textStyle]}>
                        {title}
                    </Text>
                )}
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 58,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 4,
    },
    text: {
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.2,
    },
    disabled: {
        opacity: 0.5,
    },
});
