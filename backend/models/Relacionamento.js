// models/index.js (Relacionamento)

const Product = require('.Product');
const CartItem = require('./CartItem');
const Order = require('./Order');

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

Order.hasMany(CartItem);
CartItem.belongsTo(Order);

module.exports = {
  Product,
  CartItem,
  Order,
};
