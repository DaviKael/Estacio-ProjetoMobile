# 👋

Esse é um projeto [Expo](https://expo.dev) de um app de notícias em tempo real.

## Requisitos:
[Python](https://www.python.org/downloads/)

[Node.js](https://nodejs.org/pt/download)

[Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR&pli=1)

[Android SDK](https://developer.android.com/?hl=pt-br)

## Setup

Clone este repositório com ```git clone https://github.com/DaviKael/Estacio-ProjetoMobile```

#### Na pasta raiz do projeto:

1. Instale as dependências com:

   ```bash
   npm install
   ```

2. Inicie o app

   ```bash
    npx expo start
   ```

3. Crie um novo terminal e navegue para a pasta `API` e instale as dependencias:
   ```bash
    pip install -r requirements.txt
   ```

4. Rode o fastapi com o comando
   ```bash
    fastapi run
   ```

   se preferir em modo de desenvolvedor (ou caso tenha algum problema ao rodar ```fastapi run```)
    ```bash
    fastapi dev main.py
   ```
<br>

No terminal em que você iniciou o expo, você vai achar opções para abrir o app como:

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

Escolha como abrir e teste em seu ambiente de desenvolvimento.

Você pode continuar desenvolvendo o front end no diretório `app`.

Ao final dos passos acima você já deve ver no app 4 botões para buscar categorias específicas e uma barra de busca para pesquisar notícias manualmente.
