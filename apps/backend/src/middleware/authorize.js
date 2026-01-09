const logger = require('../utils/logger');

/**
 * Middleware para autorização baseada em roles
 * Higher-order function que retorna um middleware configurado
 * @param {...string} allowedRoles - Roles permitidas (ex: 'admin', 'user')
 * @returns {Function} - Middleware de autorização
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // Verificar se o usuário está autenticado
    if (!req.user) {
      logger.warn('Tentativa de acesso sem autenticação');
      return res.status(401).json({
        success: false,
        message: 'Autenticação necessária',
      });
    }

    // Verificar se o role do usuário está nas roles permitidas
    if (!allowedRoles.includes(req.user.role)) {
      logger.warn(`Acesso negado para usuário ${req.user.email} com role ${req.user.role}`);
      return res.status(403).json({
        success: false,
        message: 'Acesso negado. Você não tem permissão para acessar este recurso.',
      });
    }

    // Usuário autorizado, continuar
    next();
  };
};

module.exports = authorize;
