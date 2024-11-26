require('dotenv').config(); // Isso vai carregar as variáveis do arquivo .env
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Inicializando o app e o Sequelize
const app = express();

// Configuração do Sequelize para se conectar ao PostgreSQL
const sequelize = new Sequelize({
  username: 'postgres',
  password: '@123',
  database: 'ecommerce_db',
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  logging: false // Desativa o log das queries no console
});

// Definição do modelo User
const User = sequelize.define('User', {
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  cpf: { type: DataTypes.STRING, allowNull: true },
  telefone: { type: DataTypes.STRING, allowNull: true }
}, {});

const CartItem = sequelize.define('CartItem', {
  userId: { type: DataTypes.INTEGER, allowNull: false },
  itemId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  tamanho: { type: DataTypes.STRING, allowNull: true },
  valor: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, {});

app.use(cors());
app.use(express.json()); // Middleware para lidar com JSON no corpo das requisições

// Rota para login
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Verificar a senha (bcrypt)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Senha incorreta.' });
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, senha: user.senha },
      process.env.JWT_SECRET || '@token123', // Chave secreta do token
      { expiresIn: '1h' }
    );

    res.status(200).json({
      id: user.id,
      senha: user.senha,
      token,
    });
  } catch (error) {
    console.error('Erro ao fazer login no backend:', error.message);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// Rota para registro de usuários
app.post('/auth/register', async (req, res) => {
  const { name, email, password, cpf, telefone } = req.body;
  
  // Verifique se os campos obrigatórios estão presentes
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
  }

  try {
    // Verificar se o email já está cadastrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    // Criação do hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo usuário
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      cpf,
      telefone,
    });

    // Gerar token JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || '@token123', // Chave secreta do token
      { expiresIn: '1h' }
    );

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      token,
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error.message);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 5001;

sequelize.sync()
  .then(() => {
    console.log('Banco de dados e tabelas sincronizados');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });


  sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((err) => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });