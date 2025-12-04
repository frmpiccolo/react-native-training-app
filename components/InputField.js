import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import theme from '../themes/AppTheme';

/**
 * Componente de campo de entrada com rótulo.
 * Permite customização através de props e centraliza estilos.
 */
export default function InputField({ label, value, onChangeText, secureTextEntry = false, keyboardType = 'default' }) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.input}
        placeholder=""
        placeholderTextColor={theme.colors.textSecondary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    marginBottom: 4,
    color: theme.colors.textPrimary,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: theme.colors.textPrimary,
  },
});