const CartItem = require('../models/CartItem');  // Certifique-se de que o modelo CartItem está correto

const CarrinhoController = {

  // Adicionar item ao carrinho
  addItem: async (req, res) => {
    const { userId, itemId, quantity, name, tamanho, valor } = req.body;

    // Verifica se os dados obrigatórios estão presentes
    if (!userId || !itemId || !quantity || !name || !tamanho || !valor) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantidade deve ser maior que zero.' });
    }

    try {
      // Verifica se o item já está no carrinho
      let cartItem = await CartItem.findOne({ where: { userId, itemId } });
      if (cartItem) {
        // Atualiza a quantidade do item existente
        cartItem.quantity += quantity;
        await cartItem.save();
        return res.status(200).json({ message: 'Quantidade atualizada no carrinho.', cartItem });
      } else {
        // Cria um novo item no carrinho
        cartItem = await CartItem.create({ userId, itemId, quantity, name, tamanho, valor });
        return res.status(201).json({ message: 'Item adicionado ao carrinho.', cartItem });
      }
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
      res.status(500).json({ message: 'Erro ao adicionar item ao carrinho.' });
    }
  },

  // Remover item do carrinho
  removeItem: async (req, res) => {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res.status(400).json({ message: 'userId e itemId são obrigatórios.' });
    }

    try {
      const result = await CartItem.destroy({ where: { userId, itemId } });
      if (result === 0) {
        return res.status(404).json({ message: 'Item não encontrado no carrinho.' });
      }
      res.status(200).json({ message: 'Item removido do carrinho.' });
    } catch (error) {
      console.error('Erro ao remover item do carrinho:', error);
      res.status(500).json({ message: 'Erro ao remover item do carrinho.' });
    }
  },

  // Limpar o carrinho
  clearCart: async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId é obrigatório.' });
    }

    try {
      await CartItem.destroy({ where: { userId } });
      res.status(200).json({ message: 'Carrinho limpo com sucesso.' });
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      res.status(500).json({ message: 'Erro ao limpar carrinho.' });
    }
  },

  // Obter carrinho do usuário
  getCart: async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'userId é obrigatório.' });
    }

    try {
      const cart = await CartItem.findAll({ where: { userId } });

      if (cart.length === 0) {
        return res.status(404).json({ message: 'Carrinho vazio' });
      }

      res.status(200).json(cart);
    } catch (error) {
      console.error('Erro ao obter carrinho:', error);
      res.status(500).json({ message: 'Erro ao obter carrinho.' });
    }
  }
};

module.exports = CarrinhoController;
