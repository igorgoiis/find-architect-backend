# Find Architect

<br>

> #### Este projeto é o backend da aplicação Find Architect, uma aplicação para ajudar cliente a encontrar arquitetos e enviar solicitações de seviços.

<br>

## 🛠 &nbsp;Tech Stack
![NodeJS](https://img.shields.io/badge/-NodeJS-05122A?style=flat&logo=node.js)&nbsp;
![NestJS](https://img.shields.io/badge/-NestJS-05122A?style=flat&logo=nestjs)&nbsp;
![TypeScript](https://img.shields.io/badge/-TypeScript-05122A?style=flat&logo=typescript)&nbsp;
![Prisma](https://img.shields.io/badge/-Prisma-05122A?style=flat&logo=prisma)&nbsp;
![JWT](https://img.shields.io/badge/-JWT-05122A?style=flat&logo=jwt)&nbsp;
![Jest](https://img.shields.io/badge/-Jest-05122A?style=flat&logo=jest)&nbsp;
![Apollo](https://img.shields.io/badge/-Apollo%20CLI-05122A?style=flat&logo=apollo)&nbsp;
![GraphQL](https://img.shields.io/badge/-GraphQL-05122A?style=flat&logo=graphql)&nbsp;
![PassportJS](https://img.shields.io/badge/-PassportJS-05122A?style=flat&logo=passport)&nbsp;
![EsLint](https://img.shields.io/badge/-EsLint-05122A?style=flat&logo=eslint)&nbsp;
![Prettier](https://img.shields.io/badge/-Prettier-05122A?style=flat&logo=prettier)&nbsp;
![Yarn](https://img.shields.io/badge/-Yarn-05122A?style=flat&logo=yarn)&nbsp;
![Git](https://img.shields.io/badge/-Git-05122A?style=flat&logo=git)&nbsp;****
![Visual Studio Code](https://img.shields.io/badge/-Visual%20Studio%20Code-05122A?style=flat&logo=visual-studio-code&logoColor=007ACC)&nbsp;

<br>
<br>

## 🚀 Funcionalidades

- Autenticação
- Cadastro de usuário
- CRUD usuário
- CRUD solicitações de serviços

<br>
<br>

## 💻 Pré-requisitos

<!---Estes são apenas requisitos de exemplo. Adicionar, duplicar ou remover conforme necessário--->
- O projeto foi desenvolvido em NestJS então será necessário instalar o Nest CLI. Para mais intruções [clique aqui](https://docs.nestjs.com/).
- Será necessário um banco de dados no projeto eu utilizei o Postgres em um container Docker.

<br>
<br>

## 🚀 Instalando

<br>

Para instalar o projeto, siga estas etapas:

<br>

- Clone o projeto:
```
git clone https://github.com/igorgoiis/find-architect-backend.git
```

<br>

- Entre na pasta e instale as dependências
```
cd ./find-architect-backend && yarn
```
<br>

- Crie um arquivo .env no diretório raiz do projeto, copie a linha abaixo para o arquivo e substitua USER, PASS e DB por o usuário a senha e o nome do banco de dados. E crie um secret e adicione no lugar do TOKEN



```
DATABASE_URL="postgresql://USER:PASS@localhost:5432/DB?schema=public"
JWT_SECRET=TOKEN
```
<br>

- Inicie o projeto


```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

<br>

[⬆ Voltar ao topo](#-find-architect)<br>