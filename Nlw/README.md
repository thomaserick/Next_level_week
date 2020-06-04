# NEXT LEVEL WEEK

### Instalação

- chocolate
  - choco -v
- NodeJs
  - choco install nodejs-lts

### Dependencias BackEnd(NodeJs)

- npm install express
  - micro frameword lidar com Rotas
- npm install @typs/express -D (Em producao não vai)
  - argumentos do express
- npm install ts-node -D
  - executa os bin
- npm install typescrip -D
  - typeScrip
- npm tsc --init
  - cria o arquivo de config typescript
- npm install ts-node-dev -D
  - Watch de alteracao
- npm install knex
  - engine banco de dados
- npm install sqlite3
  - usa com Knex
- npx knex migrate:latest --knexfile knexfile.ts migrate:latest
  - Roda as migration do BD

* npx ts-node-dev src/server.ts
  - executa o servidor
  - adicionar no script do packge.json

### Dependencias FrontEnd(ReactJs)

- npx create-react-app web --template=typescript

-**Comandos**

- npm start
  - inicia a aplicacao

### Adendo

- Padrao comunidade Controller
- index
  - Listagem
- show
  - unico registro
- create
  - Cria
- update
  - Update
- delete
  -Deletar

-//Request Param: Parametros que vem na propria rota que identifica um recurso
-//Query Param> Parametros que vem na propria rota geralmente opcionais para filtros,paginacão
-//Request Body: Parametros para criacao/atualizacao de informações

**Helpers**

- [ReactJs](https://pt-br.reactjs.org/)

- [Format GitHub](https://help.github.com/en/articles/basic-writing-and-formatting-syntax)
