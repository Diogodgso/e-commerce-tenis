const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Usuario'); // Modelo de usuário

const AuthController = {
  // Método para registrar usuários
  register: async (req, res) => {
    const { name, email, password, cpf, telefone } = req.body; // Incluindo name, cpf e telefone na desestruturação

    // Verifique se os campos obrigatórios estão presentes
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
    }

    try {
      // Verificar se o email já está cadastrado
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email já cadastrado.' });
      }

      // Criação do hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar novo usuário
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        cpf,
        telefone,
      });

      // Gerar token JWT
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET || '@token123', // Usando uma chave secreta no .env
        { expiresIn: '1h' }
      );

      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        token,
      });
    } catch (error) {
      console.error('Erro ao registrar usuário:', error.message);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },

  // Método para login de usuários
  login: async (req, res) => {
    const { email, password } = req.body;

    // Verifique se os campos obrigatórios estão presentes
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      // Verificar a senha
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Senha incorreta.' });
      }

      // Gerar token JWT
      let token;
      try {
        token = jwt.sign(
          { id: user.id, name: user.name },
          process.env.JWT_SECRET || '@token123', // Usando uma chave secreta no .env
          { expiresIn: '1h' }
        );
      } catch (tokenError) {
        console.error('Erro ao gerar token:', tokenError.message);
        return res.status(500).json({ message: 'Erro ao gerar token JWT.' });
      }

      res.status(200).json({
        id: user.id,
        name: user.name,
        token,
      });
    } catch (error) {
      console.error('Erro ao fazer login no controller:', error.message);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },
};

module.exports = AuthController;
