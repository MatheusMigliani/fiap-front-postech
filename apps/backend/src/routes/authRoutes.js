const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');
const validateRequest = require('../middleware/validator');

const router = express.Router();

// Validações para registro
const registerValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('O email é obrigatório')
    .isEmail()
    .withMessage('Por favor, forneça um email válido')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('A senha é obrigatória')
    .isLength({ min: 6 })
    .withMessage('A senha deve ter no mínimo 6 caracteres'),
  body('name')
    .trim()
    .notEmpty()
    .withMessage('O nome é obrigatório')
    .isLength({ max: 100 })
    .withMessage('O nome não pode ter mais de 100 caracteres'),
  body('role')
    .optional()
    .isIn(['user', 'admin'])
    .withMessage('Role deve ser "user" ou "admin"'),
];

// Validações para login
const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('O email é obrigatório')
    .isEmail()
    .withMessage('Por favor, forneça um email válido')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('A senha é obrigatória'),
];

// POST /auth/register
router.post('/register', registerValidation, validateRequest, (req, res, next) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.description = 'Registra um novo usuário no sistema'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Dados do novo usuário',
      required: true,
      schema: { $ref: '#/definitions/RegisterUser' }
    }
    #swagger.responses[201] = {
      description: 'Usuário registrado com sucesso',
      schema: {
        success: true,
        message: 'Usuário registrado com sucesso',
        data: {
          user: { $ref: '#/definitions/UserResponse' }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Dados inválidos ou email já cadastrado',
      schema: { $ref: '#/definitions/ValidationError' }
    }
  */
  authController.register(req, res, next);
});

// POST /auth/login
router.post('/login', loginValidation, validateRequest, (req, res, next) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.description = 'Autentica um usuário e retorna um cookie httpOnly com o token JWT'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Credenciais de login',
      required: true,
      schema: { $ref: '#/definitions/LoginCredentials' }
    }
    #swagger.responses[200] = {
      description: 'Login realizado com sucesso',
      schema: { $ref: '#/definitions/LoginResponse' }
    }
    #swagger.responses[401] = {
      description: 'Credenciais inválidas',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  authController.login(req, res, next);
});

// POST /auth/logout
router.post('/logout', (req, res, next) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.description = 'Remove o cookie de autenticação e realiza logout'
    #swagger.responses[200] = {
      description: 'Logout realizado com sucesso',
      schema: {
        success: true,
        message: 'Logout realizado com sucesso'
      }
    }
  */
  authController.logout(req, res, next);
});

// GET /auth/validate
router.get('/validate', (req, res, next) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.description = 'Valida o token JWT do cookie e retorna os dados do usuário'
    #swagger.responses[200] = {
      description: 'Token válido',
      schema: {
        success: true,
        data: {
          user: { $ref: '#/definitions/UserResponse' }
        }
      }
    }
    #swagger.responses[401] = {
      description: 'Token inválido ou não fornecido',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  authController.validateToken(req, res, next);
});

// GET /auth/me
router.get('/me', authenticateToken, (req, res, next) => {
  /*
    #swagger.tags = ['Auth']
    #swagger.description = 'Retorna os dados do usuário autenticado'
    #swagger.security = [{ "cookieAuth": [] }]
    #swagger.responses[200] = {
      description: 'Dados do usuário autenticado',
      schema: {
        success: true,
        data: {
          user: { $ref: '#/definitions/UserResponse' }
        }
      }
    }
    #swagger.responses[401] = {
      description: 'Não autenticado',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  authController.getCurrentUser(req, res, next);
});

module.exports = router;
