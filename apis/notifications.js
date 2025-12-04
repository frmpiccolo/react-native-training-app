// Funções para simular a consulta de notificações recebidas pelo usuário.

/**
 * Retorna uma lista de notificações simples com título, mensagem e data.
 *
 * @returns {Promise<Array<{id: number, title: string, message: string, date: string}>>}
 */
export function fetchNotifications() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: 'Bem-vindo ao condomínio!',
          message: 'Sua conta foi criada com sucesso. Aproveite o app.',
          date: '2025-06-05',
        },
        {
          id: 2,
          title: 'Nova atividade na academia',
          message: 'Treino funcional às 19h de quinta-feira. Participe!',
          date: '2025-07-01',
        },
      ]);
    }, 800);
  });
}