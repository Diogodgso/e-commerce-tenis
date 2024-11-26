// routes/produtos.js

const express = require('express');
const router = express.Router();
const ProdutosController = require('../ProdutosController');

// Criar um novo produto
router.post('/create', ProdutosController.createProduct);

// Obter todos os produtos
router.get('/', ProdutosController.getAllProducts);

// Obter um produto por ID
router.get('/:produtoId', ProdutosController.getProductById);

// Atualizar um produto
router.put('/:produtoId', ProdutosController.updateProduct);

// Deletar um produto
router.delete('/:produtoId', ProdutosController.deleteProduct);

module.exports = router;
