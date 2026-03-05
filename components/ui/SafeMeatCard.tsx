import { Colors } from '@/constants/theme';
import React from 'react';
import { StyleSheet, View, ViewStyle, useColorScheme } from 'react-native';

interface SafeMeatCardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    variant?: 'default' | 'glass' | 'outline' | 'elevated';
}

export const SafeMeatCard: React.FC<SafeMeatCardProps> = ({
    children,
    style,
    variant = 'default'
}) => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];

    const getVariantStyles = () => {
        switch (variant) {
            case 'glass':
                return {
                    backgroundColor: theme.glass,
                    borderWidth: 1.5,
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    borderWidth: 1.5,
                    borderColor: theme.border,
                    shadowOpacity: 0,
                    elevation: 0,
                };
            case 'elevated':
                return {
                    backgroundColor: theme.card,
                    shadowColor: theme.primary,
                    shadowOpacity: 0.12,
                    shadowRadius: 20,
                    elevation: 10,
                };
            default:
                return {
                    backgroundColor: theme.card,
                    borderColor: theme.border,
                };
        }
    };

    return (
        <View style={[
            styles.card,
            getVariantStyles(),
            style
        ]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.06,
        shadowRadius: 16,
        elevation: 4,
        marginBottom: 20,
    },
});
