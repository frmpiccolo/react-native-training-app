// Contexto global para armazenar variáveis acessíveis em todo o aplicativo.
// Este contexto usa AsyncStorage para
// persistir certos valores entre sessões. Todos os comentários estão em
// português para facilitar o entendimento durante o treinamento.

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Lista de chaves que devem ser persistidas no armazenamento do dispositivo.
const DeviceVariables = ['token', 'userName', 'selectedCondoId'];

// Contexto para armazenar os valores atuais.
const GlobalVariablesContext = createContext({});
// Contexto para expor a função de atualização de valores.
const GlobalVariablesUpdateContext = createContext(() => {});

/**
 * Provedor de contexto global.
 * Carrega valores persistidos no AsyncStorage ao iniciar e
 * fornece métodos para atualizar esses valores.
 */
export const GlobalVariableProvider = ({ children }) => {
  const [values, setValues] = useState({});

  // Carrega valores salvos no dispositivo quando o provedor é montado.
  useEffect(() => {
    async function loadPersistedValues() {
      try {
        const pairs = await Promise.all(
          DeviceVariables.map(async (key) => {
            const stored = await AsyncStorage.getItem(key);
            return [key, stored];
          })
        );
        const initialValues = {};
        pairs.forEach(([key, value]) => {
          if (value !== null) {
            initialValues[key] = value;
          }
        });
        setValues(initialValues);
      } catch (err) {
        console.error('Falha ao carregar valores persistidos:', err);
      }
    }
    loadPersistedValues();
  }, []);

  /**
   * Atualiza uma variável global.
   * Se a chave estiver listada em DeviceVariables, o valor será salvo no
   * AsyncStorage para persistência entre sessões.
   * @param {{ key: string, value: any }} param0 Par chave/valor a ser definido
   */
  const setGlobalVariable = async ({ key, value }) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (DeviceVariables.includes(key)) {
      try {
        await AsyncStorage.setItem(key, String(value));
      } catch (err) {
        console.error('Falha ao salvar valor persistido:', err);
      }
    }
  };

  return (
    <GlobalVariablesContext.Provider value={values}>
      <GlobalVariablesUpdateContext.Provider value={setGlobalVariable}>
        {children}
      </GlobalVariablesUpdateContext.Provider>
    </GlobalVariablesContext.Provider>
  );
};

/**
 * Hook para acessar valores globais.
 * @returns {Object} Objeto contendo todas as variáveis globais
 */
export const useGlobalValues = () => {
  return useContext(GlobalVariablesContext);
};

/**
 * Hook para atualizar valores globais.
 * @returns {Function} Função que recebe um objeto { key, value }
 */
export const useSetGlobalVariable = () => {
  return useContext(GlobalVariablesUpdateContext);
};