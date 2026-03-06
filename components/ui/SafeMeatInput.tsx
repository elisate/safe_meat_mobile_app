import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

interface SafeMeatInputProps extends TextInputProps {
    label: string;
    error?: string;
    containerStyle?: any;
}

export const SafeMeatInput: React.FC<SafeMeatInputProps> = ({
    label,
    error,
    containerStyle,
    onFocus,
    onBlur,
    secureTextEntry,
    ...props
}) => {
    const colorScheme = useColorScheme() ?? 'light';
    const theme = Colors[colorScheme];
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleFocus = (e: any) => {
        setIsFocused(true);
        onFocus?.(e);
    };

    const handleBlur = (e: any) => {
        setIsFocused(false);
        onBlur?.(e);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[styles.label, { color: isFocused ? theme.primary : theme.muted }]}>
                {label}
            </Text>
            <View
                style={[
                    styles.inputWrapper,
                    {
                        backgroundColor: isFocused ? theme.card : (colorScheme === 'light' ? '#F1F5F9' : '#1E293B'),
                        borderColor: error ? theme.error : (isFocused ? theme.primary : 'transparent'),
                    }
                ]}
            >
                <TextInput
                    style={[
                        styles.input,
                        { color: theme.text }
                    ]}
                    placeholderTextColor={theme.muted}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    {...props}
                />
                {secureTextEntry && (
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
                        <Ionicons
                            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={theme.muted}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={[styles.error, { color: theme.error }]}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        width: '100%',
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 8,
        marginLeft: 4,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    inputWrapper: {
        height: 60,
        borderRadius: 18,
        borderWidth: 2,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        fontWeight: '500',
    },
    toggleButton: {
        padding: 4,
    },
    error: {
        fontSize: 12,
        marginTop: 6,
        marginLeft: 4,
        fontWeight: '600',
    },
});
