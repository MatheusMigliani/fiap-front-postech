const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/environment');
const logger = require('../utils/logger');

class AuthService {
  /**
   * Registra um novo usuário
   * @param {Object} userData - { email, password, name, role }
   * @returns {Promise<Object>} - Usuário criado
   */
  async register({ email, password, name, role = 'user' }) {
    try {
      // Verificar se o email já existe
      const existingUser = await User.findOne({ email }).notDeleted();

      if (existingUser) {
        const error = new Error('Email já cadastrado');
        error.statusCode = 400;
        throw error;
      }

      // Criar novo usuário (senha será hasheada automaticamente pelo pre-save hook)
      const user = new User({
        email,
        password,
        name,
        role,
      });

      await user.save();
      logger.success(`Usuário registrado: ${email}`);

      // Retornar usuário sem a senha
      return user.toJSON();
    } catch (error) {
      logger.error('Erro ao registrar usuário:', error);
      throw error;
    }
  }

  /**
   * Autentica um usuário
   * @param {string} email - Email do usuário
   * @param {string} password - Senha do usuário
   * @returns {Promise<Object>} - { user, token }
   */
  async login(email, password) {
    try {
      // Buscar usuário com senha (select: false por padrão)
      const user = await User.findOne({ email })
        .select('+password')
        .notDeleted();

      if (!user) {
        const error = new Error('Credenciais inválidas');
        error.statusCode = 401;
        throw error;
      }

      // Verificar senha
      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        const error = new Error('Credenciais inválidas');
        error.statusCode = 401;
        throw error;
      }

      // Gerar token JWT
      const token = this.generateToken(user);
      logger.success(`Login realizado: ${email}`);

      // Retornar usuário sem a senha
      return {
        user: user.toJSON(),
        token,
      };
    } catch (error) {
      logger.error('Erro ao fazer login:', error);
      throw error;
    }
  }

  /**
   * Gera um token JWT para o usuário
   * @param {Object} user - Objeto do usuário
   * @returns {string} - Token JWT
   */
  generateToken(user) {
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiry,
    });
  }

  /**
   * Verifica e decodifica um token JWT
   * @param {string} token - Token JWT
   * @returns {Object} - Payload decodificado
   */
  verifyToken(token) {
    try {
      return jwt.verify(token, config.jwt.secret);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        const customError = new Error('Token expirado');
        customError.statusCode = 401;
        throw customError;
      }

      if (error.name === 'JsonWebTokenError') {
        const customError = new Error('Token inválido');
        customError.statusCode = 401;
        throw customError;
      }

      throw error;
    }
  }

  /**
   * Valida um token JWT e retorna o usuário
   * @param {string} token - Token JWT
   * @returns {Promise<Object>} - Usuário
   */
  async validateToken(token) {
    try {
      // Verificar e decodificar token
      const decoded = this.verifyToken(token);

      // Buscar usuário no banco de dados
      const user = await User.findById(decoded.id).notDeleted();

      if (!user) {
        const error = new Error('Usuário não encontrado');
        error.statusCode = 401;
        throw error;
      }

      return user.toJSON();
    } catch (error) {
      logger.error('Erro ao validar token:', error);
      throw error;
    }
  }
}

module.exports = new AuthService();
