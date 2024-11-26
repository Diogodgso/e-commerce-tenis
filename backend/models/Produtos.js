// models/Produto.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Ajuste o caminho conforme necessário

const Produto = sequelize.define('Produto', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estoque: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'Produtos',
  timestamps: true
});

module.exports = Produto;
