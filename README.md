# e-commerce-tenis
Projeto ionic e-commerce-tenis

# passo a passo para instalação do banco de dados ecommerce_db (considerando que já tenha o postgress instalado)
1. Acessando o PostgreSQL
Primeiro, abra o terminal e acesse o PostgreSQL:
psql -U postgres

*obs: Se o seu usuário não for postgres, substitua por seu nome de usuário.

3. Criar o Banco de Dados
Depois de acessar o PostgreSQL, crie o banco de dados ecommerce_db com o comando:

CREATE DATABASE ecommerce_db

3. Conectar ao Banco de Dados
Agora, conecte-se ao banco de dados recém-criado:

\c ecommerce_db;

# comando para rodar o front e backend

C:\"pasta do projeto"\E-commerce-de-Tenis\front>ionic serve

C:\"pasta do projeto"\E-commerce-de-Tenis\backend>node app.js
