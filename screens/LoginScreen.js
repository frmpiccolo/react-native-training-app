import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { login } from '../apis/auth';
import { useSetGlobalVariable } from '../context/GlobalVariableContext';
import InputField from '../components/InputField';
import AppButton from '../components/AppButton';
import theme from '../themes/AppTheme';

/**
 * Tela de login.
 * Permite que o usuário informe CPF/CNPJ e senha para acessar o app.
 * Ao realizar login com sucesso, grava o token e o nome do usuário no contexto global.
 */
export default function LoginScreen({ navigation }) {
  const [cpf, setCpf] = React.useState('');
  const [password, setPassword] = React.useState('');
  const setGlobalVariable = useSetGlobalVariable();

  // Configura a mutação de login
  const mutation = useMutation({
    mutationFn: () => login(cpf, password),
    onSuccess: (data) => {
      // Salva informações no contexto global
      setGlobalVariable({ key: 'token', value: data.token });
      setGlobalVariable({ key: 'userName', value: data.userName });
      setGlobalVariable({ key: 'selectedCondoId', value: data.condoId });
      // Navega para a tela inicial
      navigation.reset({
        index: 0,
        routes: [
          { name: 'MainHome' }
        ],
      });
    },
    onError: (error) => {
      Alert.alert('Erro de login', error.message);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Entrar'}</Text>
      <InputField
        label="CPF ou CNPJ"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />
      <InputField
        label="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {mutation.isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <AppButton
          title="Acessar"
          onPress={() => {
            mutation.mutate();
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: theme.colors.secondary,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    color: theme.colors.primary,
    textAlign: 'center',
  },
});