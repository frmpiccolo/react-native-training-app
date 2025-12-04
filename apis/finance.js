// Funções para simular chamadas de API relacionadas a dados financeiros.
// Estas funções retornam listas de cobranças para exibir na tela de extrato.

/**
 * Simula o carregamento de cobranças financeiras para o usuário logado.
 * Retorna uma lista de objetos contendo identificação, descrição,
 * data de vencimento, valor e status.
 *
 * @returns {Promise<Array<{id: number, description: string, dueDate: string, amount: number, status: string}>>}
 */
export function fetchCharges() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          description: 'Contribuição mensal de junho',
          dueDate: '2025-06-10',
          amount: 350.0,
          status: 'Pago',
        },
        {
          id: 2,
          description: 'Contribuição mensal de julho',
          dueDate: '2025-07-10',
          amount: 350.0,
          status: 'Aberto',
        },
        {
          id: 3,
          description: 'Serviço de manutenção de piscina',
          dueDate: '2025-07-20',
          amount: 150.0,
          status: 'Aberto',
        },
      ]);
    }, 1500);
  });
}