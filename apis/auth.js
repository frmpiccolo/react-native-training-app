// Funções relacionadas à autenticação do usuário.
// Estas funções simulam requisições de rede reais usando promessas e
// timeouts. Em um projeto de produção você faria chamadas HTTP para um
// backend. Os comentários são em português para fins de estudo.

/**
 * Simula um login de usuário.
 * Aceita qualquer combinação de CPF/CNPJ e senha que não seja vazia.
 * Retorna um token falso e informações básicas do usuário.
 *
 * @param {string} cpfCnpj CPF/CNPJ informado no login
 * @param {string} password Senha informada
 * @returns {Promise<{token: string, userName: string, condoId: string}>}
 */
export function login(cpfCnpj, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!cpfCnpj || !password) {
        reject(new Error('CPF/CNPJ e senha são obrigatórios'));
      } else {
        // Em uma aplicação real você validaria as credenciais com o servidor.
        resolve({
          token: 'fake-token-123',
          userName: 'Proprietário',
          condoId: '1',
        });
      }
    }, 1000);
  });
}