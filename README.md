# React Native e Expo: App de exemplo

Este repositório contém um **projeto de exemplo** desenvolvido para treinar a equipe no uso de **React Native** e **Expo**. O objetivo é oferecer um exemplo simples, porém funcional, que aborde os principais tópicos do treinamento: configuração do ambiente, arquitetura da aplicação, navegação com React Navigation, gerenciamento de estado com Context e React Query, utilização de módulos nativos do Expo e dicas de depuração.

## Sumário

1. [Pré‑requisitos](#pré-requisitos)
2. [Configuração do ambiente](#configuração-do-ambiente)
3. [Cenário de negócio](#cenário-de-negócio)
4. [Estrutura do projeto](#estrutura-do-projeto)
5. [Principais conceitos](#principais-conceitos)
6. [Como executar o app](#como-executar-o-app)
7. [Depuração e testes](#depuração-e-testes)
8. [Próximos passos](#próximos-passos)

## Pré‑requisitos

Antes de iniciar o projeto, verifique se seu ambiente atende aos seguintes requisitos:

* **Node.js LTS** – utilize versões pares (20, 22 ou 24) com suporte de longo prazo. Versões LTS recebem atualizações críticas por mais tempo.
* **Conhecimento em JavaScript (ES6)** – entender promises, async/await, funções e módulos é fundamental.
* **Expo CLI** – ferramenta de linha de comando para desenvolvimento, build e distribuição de apps Expo. Instale globalmente com `npm install -g expo-cli`.
* **Git** – para clonar o repositório e seguir o fluxo de trabalho recomendado.

* **Expo SDK 54** – este projeto foi criado usando o Expo SDK 54 (a versão listada no arquivo `package.json` é `"expo": "~54.x.x"`). Caso você esteja usando uma versão diferente do Expo Go ou da CLI, atualize para garantir compatibilidade.

## Configuração do ambiente

1. **Instale o Node.js LTS**. Acesse o site oficial do Node e baixe a versão marcada como LTS. Para confirmar a instalação, execute:

   ```bash
   node -v
   ```

   O comando deve retornar uma versão LTS, como `v22.x.x`.

2. **Instale o Expo CLI**:

   ```bash
   npm install -g expo-cli
   ```

   Após a instalação, verifique com `expo whoami`. Se não estiver logado, você poderá se registrar ou usar sem conta.

3. **Clone este repositório** usando Git. Substitua `<url-do-repositorio>` pela URL real e ajuste o nome da pasta conforme desejar. O exemplo abaixo assume que o projeto será clonado para uma pasta chamada `meu-aplicativo`:

   ```bash
   git clone <url-do-repositorio> meu-aplicativo
   cd meu-aplicativo
   ```

4. **Instale as dependências** com o gerenciador de pacotes de sua preferência (npm ou Yarn). Isso instalará todas as bibliotecas listadas em `package.json`:

   ```bash
   npm install
   # ou
   yarn install
   ```

5. **Execute o projeto**. O comando abaixo inicializa o servidor Metro e abre uma interface no navegador. Se você enfrentar problemas de cache ou timeouts ao carregar no dispositivo, utilize a flag `-c` para limpar o cache e defina o modo de conexão explicitamente (por exemplo `--localhost` para emuladores ou `--tunnel` para conexão remota):

   ```bash
   # Inicialização padrão
   npx expo start

   # Inicialização limpando cache
   npx expo start -c

   # Forçar uso do IP local (útil em emuladores)
   npx expo start --localhost

   # Alternativa para redes com restrições de firewall
   npx expo start --tunnel
   ```

   O Expo abrirá uma janela no navegador. A partir dela você pode escanear o QR code com o aplicativo **Expo Go** no seu dispositivo para iniciar o app em modo de desenvolvimento. Emuladores Android e iOS também são suportados.

## Cenário de negócio

Este projeto simula um **aplicativo de condomínio** voltado ao proprietário. Após realizar o login, o usuário tem acesso às principais funcionalidades:

* **Extrato financeiro** – lista de cobranças com valor, data de vencimento e status, permitindo gerar um boleto para pagamento.
* **Comodidades** – exibe banners e uma lista de comodidades (piscina, academia) com possibilidade de reserva.
* **Perfil** – mostra dados do usuário e permite alterar a foto usando a galeria do dispositivo via Expo Image Picker.
* **Notificações** – lista de avisos e possibilidade de agendar uma notificação local utilizando as APIs de notificações do Expo.
* **Contato** – informações para entrar em contato com a administração do condomínio, com botões para ligar ou enviar e‑mail.

Esse cenário foi pensado para cobrir de forma prática os conceitos apresentados no material de treinamento, mas de maneira simplificada para facilitar o entendimento.

## Estrutura do projeto

A estrutura segue as recomendações do treinamento, organizando os arquivos por responsabilidade:

```
meu-aplicativo/
├── App.js                 # Ponto de entrada do aplicativo
├── app.json               # Configurações do Expo
├── package.json           # Dependências e scripts
├── assets/                # Imagens e ícones utilizados no app
├── apis/                  # Funções que simulam chamadas de API
├── components/            # Componentes reutilizáveis (botão, cartão, campos de entrada)
├── context/               # Contexto global e armazenamento persistente
├── navigation/            # Configuração das rotas (Stack Navigator)
├── screens/               # Telas do aplicativo
├── themes/                # Paleta de cores e estilos globais
└── README.md              # Este documento
```

### Navegação

Utilizamos **React Navigation** como solução de roteamento padrão. O `NavigationContainer` envolve toda a navegação e um `Stack Navigator` empilha as telas, permitindo voltar à anterior de forma nativa. Cada tela é registrada no `AppNavigator` com um nome e um componente correspondente. Para navegar, usamos `navigation.navigate()` e, para resetar a pilha após o login, `navigation.reset()`.

### Estado global e React Query

O app demonstra três tipos de estado mencionados no treinamento:

* **Estado local** – controlado dentro de componentes com `useState` (ex.: campos de texto).
* **Estado global** – fornecido via `GlobalVariableContext`. Esse contexto guarda valores como token, nome do usuário e ID do condomínio e persiste dados importantes no `AsyncStorage`.
* **Estado remoto** – dados obtidos de “APIs” simuladas com **React Query**. O Query Client gerencia o cache, o carregamento e os erros. Hooks como `useQuery` e `useMutation` simplificam o consumo desses dados nas telas.

### Integrações Expo

O projeto inclui exemplos de integrações nativas fornecidas pelo Expo:

* **Image Picker** – na tela de Perfil, o usuário pode selecionar uma foto de perfil abrindo a galeria do dispositivo. O código solicita permissão e lança o seletor de imagens.
* **Notificações locais** – na tela de Notificações, o app solicita permissão e permite agendar uma notificação que será disparada após alguns segundos.

### Outros componentes

* **Componentes reutilizáveis** – `AppButton`, `InputField` e `Card` demonstram como encapsular estilos e comportamentos reutilizáveis.
* **Tema centralizado** – o arquivo `themes/AppTheme.js` define uma paleta de cores única para todo o app, permitindo ajustes globais com facilidade.

## Como executar o app

1. Certifique‑se de que instalou as dependências conforme indicado em [Configuração do ambiente](#configuração-do-ambiente).
2. Na raiz do projeto, execute `npx expo start`. O Expo CLI abrirá uma interface no navegador.
3. Para testar no dispositivo físico, instale o aplicativo **Expo Go** na App Store ou Google Play. Escaneie o QR code exibido para carregar o projeto.
4. Você também pode rodar em emuladores Android ou iOS disponíveis no computador.

Ao abrir o app, informe qualquer CPF/CNPJ e senha não vazios para simular um login. Explore as telas disponíveis a partir do menu principal.

## Depuração e testes

O Expo facilita ciclos rápidos de desenvolvimento com **hot reload** e integração com ferramentas de depuração. Algumas dicas:

* Agite o dispositivo ou pressione `Ctrl + M` (Android) ou `Cmd + D` (iOS) para abrir o menu de desenvolvedor.
* Utilize o **React Native DevTools** para inspecionar elementos, monitorar requisições e visualizar logs.
* Use `console.log` para imprimir valores e `console.error` para tratar erros. Em caso de falha, o app exibirá uma tela vermelha (RedBox) com o stack trace.

## Próximos passos

Este projeto é apenas o início. Algumas sugestões para expandir e praticar:

* Implementar novos módulos, como seleção de documentos (usando `expo-document-picker`) ou integração com câmera.
* Criar rotas protegidas e fluxo de logout.
* Conectar as APIs simuladas a um backend real.
* Adicionar testes unitários com Jest e React Native Testing Library, conforme recomendado no material.
* Automatizar builds e distribuição com **EAS Build** para gerar APK/AAB/IPA, seguindo as orientações do módulo de build.

Sinta‑se à vontade para modificar, experimentar e, principalmente, utilizar este projeto como base para aprofundar seus conhecimentos em desenvolvimento mobile com React Native e Expo.