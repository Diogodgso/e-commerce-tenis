module.exports = {
    username: 'postgres',        // Usuário do PostgreSQL
    password: '@123',       // Senha do PostgreSQL
    database: 'ecommerce_db',    // Nome do banco de dados (você pode usar o nome do seu banco de dados)
    host: 'localhost',           // Host do banco de dados (pode ser localhost se estiver rodando localmente)
    dialect: 'postgres',         // Definindo o PostgreSQL como banco de dados
    port: 5432,                  // Porta padrão do PostgreSQL
    logging: false               // Desativa o log das queries no console (pode ser true para debugar)
  };
  