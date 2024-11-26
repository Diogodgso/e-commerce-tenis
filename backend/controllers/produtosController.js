// controllers/ProdutosController.js

const Produto = require('../models/Produto');

const ProdutosController = {

  // Criar um novo produto
  createProduct: async (req, res) => {
    const { name, descricao, preco, estoque, imageUrl } = req.body;
    try {
      const produto = await Produto.create({ name, descricao, preco, estoque, imageUrl });
      res.status(201).json(produto);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      res.status(500).json({ message: 'Erro ao criar produto.' });
    }
  },

  // Obter todos os produtos
  getAllProducts: async (req, res) => {
    try {
      const produtos = await Produto.findAll();
      res.status(200).json(produtos);
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
      res.status(500).json({ message: 'Erro ao obter produtos.' });
    }
  },

  // Obter um produto por ID
  getProductById: async (req, res) => {
    const { produtoId } = req.params;
    try {
      const produto = await Produto.findByPk(produtoId);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }
      res.status(200).json(produto);
    } catch (error) {
      console.error('Erro ao obter produto:', error);
      res.status(500).json({ message: 'Erro ao obter produto.' });
    }
  },

  // Atualizar um produto
  updateProduct: async (req, res) => {
    const { produtoId } = req.params;
    const { name, descricao, preco, estoque, imageUrl } = req.body;
    try {
      const produto = await Produto.findByPk(produtoId);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }
      produto.name = name || produto.name;
      produto.descricao = descricao || produto.descricao;
      produto.preco = preco || produto.preco;
      produto.estoque = estoque || produto.estoque;
      produto.imageUrl = imageUrl || produto.imageUrl;
      await produto.save();
      res.status(200).json(produto);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      res.status(500).json({ message: 'Erro ao atualizar produto.' });
    }
  },

  // Deletar um produto
  deleteProduct: async (req, res) => {
    const { produtoId } = req.params;
    try {
      const produto = await Produto.findByPk(produtoId);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado.' });
      }
      await produto.destroy();
      res.status(200).json({ message: 'Produto deletado com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      res.status(500).json({ message: 'Erro ao deletar produto.' });
    }
  }

};

module.exports = ProdutosController;
