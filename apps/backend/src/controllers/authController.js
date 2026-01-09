const authService = require('../services/authService');
const config = require('../config/environment');

class AuthController {
  /**
   * POST /auth/register - Registra um novo usuário
   */
  async register(req, res, next) {
    try {
      const { email, password, name, role } = req.body;

      const user = await authService.register({
        email,
        password,
        name,
        role,
      });

      res.status(201).json({
        success: true,
        message: 'Usuário registrado com sucesso',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /auth/login - Autentica um usuário e seta cookie httpOnly
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const { user, token } = await authService.login(email, password);

      // Setar cookie httpOnly com o token
      res.cookie(config.cookie.name, token, {
        httpOnly: config.cookie.httpOnly,
        secure: config.cookie.secure,
        sameSite: config.cookie.sameSite,
        maxAge: config.cookie.maxAge,
      });

      res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /auth/logout - Remove o cookie de autenticação
   */
  async logout(req, res, next) {
    try {
      // Limpar o cookie
      res.clearCookie(config.cookie.name, {
        httpOnly: config.cookie.httpOnly,
        secure: config.cookie.secure,
        sameSite: config.cookie.sameSite,
      });

      res.status(200).json({
        success: true,
        message: 'Logout realizado com sucesso',
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /auth/validate - Valida o token do cookie
   */
  async validateToken(req, res, next) {
    try {
      const token = req.cookies[config.cookie.name];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Token não fornecido',
        });
      }

      const user = await authService.validateToken(token);

      res.status(200).json({
        success: true,
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /auth/me - Retorna o usuário autenticado (requer middleware authenticateToken)
   */
  async getCurrentUser(req, res, next) {
    try {
      // req.user já foi populado pelo middleware authenticateToken
      res.status(200).json({
        success: true,
        data: { user: req.user },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
