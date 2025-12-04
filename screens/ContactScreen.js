import React from 'react';
import { View, Text, StyleSheet, Linking, Alert } from 'react-native';
import AppButton from '../components/AppButton';
import theme from '../themes/AppTheme';
import GeneralLayout from '../components/GeneralLayout';

/**
 * Tela de contato.
 * Mostra informações de contato do condomínio e permite ligar ou enviar e-mail.
 */
export default function ContactScreen() {
  const phoneNumber = '+5511999999999';
  const email = 'contato@condominio.com';

  const handleCall = () => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch(() => Alert.alert('Erro', 'Não foi possível iniciar a chamada.'));
  };

  const handleEmail = () => {
    const url = `mailto:${email}`;
    Linking.openURL(url).catch(() => Alert.alert('Erro', 'Não foi possível abrir o cliente de e-mail.'));
  };

  return (    
    <View style={styles.container}>
      <Text style={styles.title}>Contato</Text>
      <Text style={styles.info}>Telefone: {phoneNumber}</Text>
      <Text style={styles.info}>E-mail: {email}</Text>
      <AppButton title="Ligar" onPress={handleCall} />
      <AppButton title="Enviar e-mail" onPress={handleEmail} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    backgroundColor: theme.colors.secondary,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    marginBottom: 8,
  },
});