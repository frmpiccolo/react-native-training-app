import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchNotifications } from '../apis/notifications';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AppButton from '../components/AppButton';
import theme from '../themes/AppTheme';

/**
 * Tela de notificações.
 * Exibe uma lista de notificações carregadas e permite agendar uma notificação local de teste.
 */
export default function NotificationScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
  });

  const [permissionGranted, setPermissionGranted] = useState(false);

  // Solicita permissão para notificações assim que a tela monta
  useEffect(() => {
    async function requestPermission() {
      if (!Device.isDevice) {
        return;
      }
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;
      if (status !== 'granted') {
        const res = await Notifications.requestPermissionsAsync();
        finalStatus = res.status;
      }
      setPermissionGranted(finalStatus === 'granted');
    }
    requestPermission();
  }, []);

  // Agenda uma notificação local
  const scheduleLocalNotification = async () => {
    if (!permissionGranted) {
      Alert.alert('Permissão necessária', 'Habilite notificações nas configurações.');
      return;
    }
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Exemplo de notificação',
        body: 'Esta notificação foi agendada manualmente.',
      },
      trigger: { seconds: 5 },
    });
    Alert.alert('Notificação agendada', 'Você receberá a notificação em 5 segundos.');
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Erro ao carregar notificações.</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationMessage}>{item.message}</Text>
            <Text style={styles.notificationDate}>{`${item.date}`}</Text>
          </View>
        )}
      />
      <AppButton title="Agendar notificação" onPress={scheduleLocalNotification} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    backgroundColor: theme.colors.secondary,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  notificationItem: {
    backgroundColor: theme.colors.cardBackground,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  notificationMessage: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginVertical: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'right',
  },
  error: {
    color: theme.colors.error,
    fontSize: 16,
  },
});