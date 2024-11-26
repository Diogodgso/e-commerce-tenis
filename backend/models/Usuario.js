const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');
const app = express();



const sequelize = new Sequelize({
  username: 'postgres',
  password: '@123',
  database: 'ecommerce_db',
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

const User = sequelize.define('User', {
  name: {    type: DataTypes.STRING,   allowNull: false,  },
  email: {    type: DataTypes.STRING,    allowNull: false, unique: true,  },
  password: {  type: DataTypes.STRING,  allowNull: false, },
  cpf: {    type: DataTypes.STRING,    allowNull: true,  },
  telefone: {  type: DataTypes.STRING, allowNull: true,  }
}, {});

app.use(express.json());
app.use(cors());

// Rota para cadastro de usuário
app.post('/auth/register', async (req, res) => {
  const { name, email, password, cpf, telefone } = req.body;
  try {
    const user = await User.create({ name, email, password, cpf, telefone });
    res.status(201).json({ id: user.id, name: user.name });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
});

module.exports = User;
