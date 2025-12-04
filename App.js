import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GlobalVariableProvider } from './context/GlobalVariableContext';
import AppNavigator from './navigation/AppNavigator';
import theme from './themes/AppTheme';

// Cria uma instância do QueryClient para o React Query
const queryClient = new QueryClient();

/**
 * Componente raiz do aplicativo.
 * Envolve a navegação e o contexto global com provedores adequados.
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <GlobalVariableProvider>
        <QueryClientProvider client={queryClient}>
          {/* Define a cor da barra de status para combinar com o tema */}
          <StatusBar
            barStyle="light-content"
            backgroundColor={theme.colors.primary}
          />
          <AppNavigator />
        </QueryClientProvider>
      </GlobalVariableProvider>
    </SafeAreaProvider>
  );
}