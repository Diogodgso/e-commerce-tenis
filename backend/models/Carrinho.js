// models/CartItem.js (itens do carrinho)
// models/CartItem.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Ajuste o caminho conforme necessário

const CartItem = sequelize.define('CartItem', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  itemId: { // Este campo deve referenciar um produto
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tamanho: {
    type: DataTypes.STRING,
    allowNull: true
  },
 
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }

}, {
  tableName: 'CartItems',
  timestamps: true
});

module.exports = CartItem;
