const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['@token123']; // O token será passado no header da requisição

  if (!token) {
    return res.status(403).json({ message: 'Token de autenticação não fornecido' });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    req.user = decoded; // Passa as informações do usuário decodificadas para a requisição
    next(); // Continuar para a próxima rota
  });
};

module.exports = authMiddleware;
