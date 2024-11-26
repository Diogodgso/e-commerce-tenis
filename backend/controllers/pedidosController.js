// controllers/PedidosController.js

const Pedido = require('../models/Pedido');
const CartItem = require('../models/CartItem');

const PedidosController = {

  // Criar um novo pedido
  createOrder: async (req, res) => {
    const { userId, total } = req.body;
    try {
      // Cria o pedido
      const pedido = await Pedido.create({ userId, total });

      // Opcional: Mover itens do carrinho para um histórico de pedidos
      // Isso pode ser feito criando uma tabela de itens de pedidos e movendo os dados

      // Limpar o carrinho após a criação do pedido
      await CartItem.destroy({ where: { userId } });

      res.status(201).json(pedido);
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      res.status(500).json({ message: 'Erro ao criar pedido.' });
    }
  },

  // Obter pedidos de um usuário
  getOrders: async (req, res) => {
    const { userId } = req.params;
    try {
      const pedidos = await Pedido.findAll({ where: { userId } });
      res.status(200).json(pedidos);
    } catch (error) {
      console.error('Erro ao obter pedidos:', error);
      res.status(500).json({ message: 'Erro ao obter pedidos.' });
    }
  },

  // Atualizar status do pedido (exemplo: Pendente, Enviado, Entregue)
  updateOrderStatus: async (req, res) => {
    const { pedidoId } = req.params;
    const { status } = req.body;
    try {
      const pedido = await Pedido.findByPk(pedidoId);
      if (!pedido) {
        return res.status(404).json({ message: 'Pedido não encontrado.' });
      }
      pedido.status = status;
      await pedido.save();
      res.status(200).json(pedido);
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
      res.status(500).json({ message: 'Erro ao atualizar status do pedido.' });
    }
  }

};

module.exports = PedidosController;
