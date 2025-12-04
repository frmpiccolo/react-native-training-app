// Funções para simular o carregamento de comodidades do condomínio.

/**
 * Retorna uma lista de comodidades disponíveis para reserva.
 * Cada item contém um nome, descrição e o nome do arquivo de imagem
 * localizado em assets/. A tela de Comodidades fará o require do arquivo
 * com base no nome retornado.
 *
 * @returns {Promise<Array<{id: number, name: string, description: string, image: string}>>}
 */
export function fetchAmenities() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'Piscina',
          description: 'Piscina externa aquecida, aberta das 8h às 20h.',
          image: 'pool.png',
        },
        {
          id: 2,
          name: 'Academia',
          description: 'Academia completa com pesos livres e aparelhos de cardio.',
          image: 'gym.png',
        },
      ]);
    }, 1000);
  });
}