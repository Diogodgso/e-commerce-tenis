// routes/carrinho.js

const express = require('express');
const router = express.Router();
const CarrinhoController = require('..controllers/CarrinhoController');

// Adicionar item ao carrinho
router.post('/add', CarrinhoController.addItem);

// Remover item do carrinho
router.post('/remove', CarrinhoController.removeItem);

// Limpar o carrinho
router.post('/clear', CarrinhoController.clearCart);

// Obter carrinho do usuário
router.get('/:userId', CarrinhoController.getCart);

module.exports = router;
