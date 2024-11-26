// routes/pedidos.js

const express = require('express');
const router = express.Router();
const PedidosController = require('../pedidosController');

// Criar um novo pedido
router.post('/create', PedidosController.createOrder);

// Obter pedidos de um usuário
router.get('/:userId', PedidosController.getOrders);

// Atualizar status do pedido
router.put('/:pedidoId/status', PedidosController.updateOrderStatus);

module.exports = router;
