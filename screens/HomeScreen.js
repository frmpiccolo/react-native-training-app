import { Text, StyleSheet, ScrollView } from 'react-native';
import { useGlobalValues } from '../context/GlobalVariableContext';
import AppButton from '../components/AppButton';
import theme from '../themes/AppTheme';
import GeneralLayout from '../components/GeneralLayout';

/**
 * Tela inicial após o login.
 * Exibe uma saudação ao usuário e apresenta as principais opções do app.
 */
export default function HomeScreen({ navigation }) {  
  const { userName } = useGlobalValues();
  const greetings = `Olá, ${userName || 'Visitante'}!`;

  return (
    <GeneralLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.greeting}>{greetings}</Text>
        <Text style={styles.subheading}>{'Escolha uma opção para continuar:'}</Text>
        <AppButton
          title="Extrato Financeiro"
          onPress={() => navigation.navigate('FinanceSummaryScreen')}
        />
        <AppButton
          title="Comodidades"
          onPress={() => navigation.navigate('AmenitiesScreen')}
        />
        <AppButton
          title="Meu Perfil"
          onPress={() => navigation.navigate('ProfileScreen')}
        />
        <AppButton
          title="Notificações"
          onPress={() => navigation.navigate('NotificationScreen')}
        />
        <AppButton
          title="Contato"
          onPress={() => navigation.navigate('ContactScreen')}
        />
      </ScrollView>
    </GeneralLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    backgroundColor: theme.colors.secondary,
    flexGrow: 1,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600',
    color: theme.colors.primary,
    marginBottom: 16,
  },
  subheading: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 24,
    textAlign: 'center',
  },
});