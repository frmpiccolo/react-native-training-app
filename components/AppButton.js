import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import theme from '../themes/AppTheme';

/**
 * Um botão reutilizável para o app de treinamento.
 * Utiliza Pressable para melhor feedback visual e aceita texto e função onPress.
 * Comentários em português para aprendizado.
 */
export default function AppButton({ title, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        style,
      ]}
    >
      <Text style={styles.buttonText}>{title ?? ''}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});