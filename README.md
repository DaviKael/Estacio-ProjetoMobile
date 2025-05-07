# 👋

Esse é um projeto [Expo](https://expo.dev) criado com [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Setup do Projeto

1. Instale as dependências com:

   ```bash
   npm install
   ```

2. Inicie o app

   ```bash
    npx expo start
   ```
3. Navegue para a pasta `API` e inicie o FastAPI:
   ```bash
    fastapi dev main.py
   ```

No terminal, você vai achar opções para abrir o app como:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

Escolha como abrir e teste em seu ambiente de desenvolvimento.

Você pode continuar desenvolvendo o front no diretório `app`. Esse projeto usa rotas [file-based](https://docs.expo.dev/router/introduction).

Ao final dos passos acima você já deve ver no app "Testando 1, 2, 3..."