import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchCharges } from '../apis/finance';
import Card from '../components/Card';
import AppButton from '../components/AppButton';
import theme from '../themes/AppTheme';

/**
 * Tela de extrato financeiro.
 * Mostra as cobranças do usuário e permite abrir um boleto (simulado) para pagamento.
 */
export default function FinanceSummaryScreen() {
  // Use React Query para buscar as cobranças
  const { data, isLoading, error } = useQuery({
    queryKey: ['charges'],
    queryFn: fetchCharges,
  });

  // Função para simular geração de boleto
  const handleOpenTicket = (item) => {
    Alert.alert(
      'Gerar boleto',
      `Gerar segunda via para "${item.description}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'OK', onPress: () => Alert.alert('Boleto gerado', 'O boleto foi gerado com sucesso.') },
      ]
    );
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
        <Text style={styles.errorText}>Erro ao carregar dados financeiros.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Extrato Financeiro</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Card title={item.description} description={`Vencimento: ${item.dueDate}`}>            
            <View style={styles.chargeInfo}>
              <Text style={styles.amount}>{`R$ ${item.amount.toFixed(2)}`}</Text>
              <Text style={[styles.status, item.status === 'Pago' ? styles.paid : styles.open]}>{item.status}</Text>
            </View>
            <AppButton
              title="Ver boleto"
              onPress={() => handleOpenTicket(item)}
            />
          </Card>
        )}
      />
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
  chargeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
  },
  paid: {
    color: 'green',
  },
  open: {
    color: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 16,
  },
});