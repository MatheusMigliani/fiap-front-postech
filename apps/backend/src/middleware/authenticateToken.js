const authService = require('../services/authService');
const config = require('../config/environment');
const logger = require('../utils/logger');

/**
 * Middleware para autenticar requisições usando JWT em cookies httpOnly
 * Valida o token e popula req.user com os dados do usuário
 */
const authenticateToken = async (req, res, next) => {
  try {
    // Buscar token do cookie
    const token = req.cookies[config.cookie.name];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Autenticação necessária. Token não fornecido.',
      });
    }

    // Validar token e buscar usuário
    const user = await authService.validateToken(token);

    // Popular req.user com os dados do usuário
    req.user = user;

    // Continuar para o próximo middleware
    next();
  } catch (error) {
    logger.error('Erro na autenticação:', error.message);

    return res.status(401).json({
      success: false,
      message: error.message || 'Token inválido ou expirado',
    });
  }
};

module.exports = authenticateToken;
