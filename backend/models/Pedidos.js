// models/Pedido.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Ajuste o caminho conforme necessário

const Pedido = sequelize.define('Pedido', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: { // Exemplo de status do pedido
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pendente'
  }
}, {
  tableName: 'Pedidos',
  timestamps: true
});

module.exports = Pedido;
