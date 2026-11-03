# Lista de Filmes — React Native + Expo

Aplicativo desenvolvido para a atividade **App lista de filmes com React Native / Expo**.

## Funcionalidades

- Consumo da API REST OMDb usando `fetch`.
- Listagem de filmes relacionados ao Homem-Aranha, com título, ano e pôster.
- Navegação entre a lista e a tela de detalhes com React Navigation.
- Tela de detalhes com gênero, diretor, elenco, duração, avaliação IMDb e sinopse.
- Estilização com React Native Paper e tema escuro.
- Indicadores de carregamento, mensagens de erro e opção de tentar novamente na listagem.

## Tecnologias

- React Native e Expo
- TypeScript
- React Navigation (native stack)
- React Native Paper
- OMDb API

## Executar

Requisitos: Node.js e npm. Para testar no celular, instale o Expo Go.

```bash
npm install
npx expo start
```

Abra o QR Code pelo Expo Go. Para verificar tipos:

```bash
npm run typecheck
```

## Estrutura

```text
App.tsx
src/
  screens/
    HomeScreen.tsx
    DetailsScreen.tsx
  types/
    navigation.ts
    omdb.ts
```

## API

Busca: https://www.omdbapi.com/?s=spider%20man&apikey=1cd66749

Detalhes: `https://www.omdbapi.com/?i=ID_DO_FILME&apikey=1cd66749`

A chave de API foi fornecida no enunciado da atividade. A aplicação depende de conexão com a internet e da disponibilidade da API.

## Publicação no GitHub

1. Crie um repositório **público** chamado `lista-filmes-expo` no GitHub, sem inicializar com README.
2. Na pasta do projeto, execute:

```bash
git init
git add .
git commit -m "Aplicativo de lista de filmes com Expo"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/lista-filmes-expo.git
git push -u origin main
```

3. Substitua `SEU-USUARIO` pelo seu usuário do GitHub.
4. Envie o link do repositório público no AVA.

**Observação:** o GitHub também permite enviar os arquivos pelo navegador. Descompacte o ZIP e envie os arquivos e pastas internos, não o ZIP como um único arquivo.
