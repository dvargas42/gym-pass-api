# App

Gympass style app.

## RFs (Requisitos funcionais)

- [] Deve ser possivel se cadastrar;
- [] Deve ser possível se autenticar;
- [] Deve ser possivel obter o perfil de um usuário logado;
- [] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [] Deve ser possível o usuário obter o seu histórico de chcke-ins;
- [] Deve ser possível o usuário buscar academias proxímas (até 10 km);
- [] Deve ser possível o usuário buscar academias pelo nome;
- [] Deve ser possível o usuário realizar check-in em uma academia;
- [] Deve ser possível ovalidar o check-in de um usuário;
- [] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [] O usuário não pode fazer 2 check-ins no mesmo dia;
- [] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [] O check-in só pode ser validado até 20 minutos após criado;
- [] O check-in só pode ser validado por administradores;
- [] o check-in só pode ser cadastrado por administradores;

## RNFs (Requisitos não-funcionais)

- [] A senha do usuário presa estar criptografada;
- [] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [] Todas listas de dados precisam estar paginada com 20 itens por página;
- [] O usuário deve ser dentificado por um JWT (JSON Web Token);

## Roteiro de desenvolvimento
Primeiro de tudo rodar
npm init -y

Intalando o typescript, atipagem de node, o tsx para hotreload e tsup para buildar o projeto.
npm i typescript @types/node tsx tsup -D

Criando o arquivo de configuração do typescript
npx tsc --init

Intalar a lib do fastify
npm i fastify

configurar o .npmrc para fixar as versões das libs

instalar o dotenv para lidar com as variáveis de ambiente
npm i dotenv

Intalando o zod para lidar com validar os dados
npm i zod

Instalando o ESlint para padronizar o código
npm i eslint -D

Rodando o eslint para configurar
npx eslint --init -> usar configuração do do obs

Foi escolhido o ORM Prisma para lidar com o banco de dados
npm i prisma -D

Rodar o prisma para criar o arquivo de configuração do banco de dados
npx prisma init

rodar para criar o arquivo de configuração do banco de dados
npx prisma generate

Instalando o banco de dados Postgres
npm i @prisma/client

Util para visualizar o banco de dados
npx prisma studio

Util para criar um novo migration baseada numa altera;'ao
npx prisma migrate dev

Util para rodar as migrations em produção ou dev
npx prisma migrate deploy


npm i bcryptjs

npm i vitest vite-tsconfig-paths -D

npm i @vitest/coverage-v8 -D

npm i @vitest/ui -D

npm i dayjs

npm i @fastify/jwt


Atualizando os pacotes do Vitest
npm i vitest@latest vite-tsconfig-paths@latest @vitest/ui@latest @vitest/coverage-v8@l
atest -D 

npm i vite -D

Para realizar chamadas http do teste para nossa aplicacao sem precisar colocar nossa aplicacao no ar
npm i supertest -D
npm i @types/supertest -D

escrever o refresh token nos cookies
npm i @fastify/cookie

 npx prisma migrate dev