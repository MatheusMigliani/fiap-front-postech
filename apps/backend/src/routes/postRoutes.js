const express = require('express');
const { body, query } = require('express-validator');
const postController = require('../controllers/postController');
const validateRequest = require('../middleware/validator');

const router = express.Router();

// Validações para criação de post
const createPostValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('O título é obrigatório')
    .isLength({ max: 200 })
    .withMessage('O título não pode ter mais de 200 caracteres'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('O conteúdo é obrigatório'),
  body('author')
    .trim()
    .notEmpty()
    .withMessage('O autor é obrigatório')
    .isLength({ max: 100 })
    .withMessage('O nome do autor não pode ter mais de 100 caracteres'),
];

// Validações para atualização de post (campos opcionais)
const updatePostValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('O título não pode estar vazio')
    .isLength({ max: 200 })
    .withMessage('O título não pode ter mais de 200 caracteres'),
  body('content')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('O conteúdo não pode estar vazio'),
  body('author')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('O autor não pode estar vazio')
    .isLength({ max: 100 })
    .withMessage('O nome do autor não pode ter mais de 100 caracteres'),
];

// Validação para busca
const searchValidation = [
  query('q')
    .trim()
    .notEmpty()
    .withMessage('O parâmetro de busca (q) é obrigatório')
    .isLength({ min: 2 })
    .withMessage('O termo de busca deve ter pelo menos 2 caracteres'),
];

// Rotas
// IMPORTANTE: A rota /search deve vir ANTES de /:id para evitar conflito

// GET /posts/search
router.get('/search', searchValidation, validateRequest, (req, res, next) => {
  /*
    #swagger.tags = ['Posts']
    #swagger.description = 'Busca posts por palavra-chave no título, conteúdo ou autor'
    #swagger.parameters['q'] = {
      in: 'query',
      description: 'Termo de busca (mínimo 2 caracteres)',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Posts encontrados',
      schema: { $ref: '#/definitions/PostList' }
    }
    #swagger.responses[400] = {
      description: 'Parâmetro de busca inválido',
      schema: { $ref: '#/definitions/ValidationError' }
    }
  */
  postController.searchPosts(req, res, next);
});

// GET /posts
router.get('/', (req, res, next) => {
  /*
    #swagger.tags = ['Posts']
    #swagger.description = 'Lista todos os posts educacionais ordenados por data de criação (mais recentes primeiro)'
    #swagger.responses[200] = {
      description: 'Lista de posts',
      schema: { $ref: '#/definitions/PostList' }
    }
  */
  postController.getAllPosts(req, res, next);
});

// GET /posts/:id
router.get('/:id', (req, res, next) => {
  /*
    #swagger.tags = ['Posts']
    #swagger.description = 'Obtém um post específico pelo ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do post',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Post encontrado',
      schema: { $ref: '#/definitions/PostResponse' }
    }
    #swagger.responses[404] = {
      description: 'Post não encontrado',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  postController.getPostById(req, res, next);
});

// POST /posts
router.post('/', createPostValidation, validateRequest, (req, res, next) => {
  /*
    #swagger.tags = ['Posts']
    #swagger.description = 'Cria um novo post educacional'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Dados do post',
      required: true,
      schema: { $ref: '#/definitions/Post' }
    }
    #swagger.responses[201] = {
      description: 'Post criado com sucesso',
      schema: { $ref: '#/definitions/PostResponse' }
    }
    #swagger.responses[400] = {
      description: 'Dados inválidos',
      schema: { $ref: '#/definitions/ValidationError' }
    }
  */
  postController.createPost(req, res, next);
});

// PUT /posts/:id
router.put('/:id', updatePostValidation, validateRequest, (req, res, next) => {
  /*
    #swagger.tags = ['Posts']
    #swagger.description = 'Atualiza um post existente'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do post',
      required: true,
      type: 'string'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Dados para atualização (todos os campos são opcionais)',
      required: true,
      schema: { $ref: '#/definitions/Post' }
    }
    #swagger.responses[200] = {
      description: 'Post atualizado com sucesso',
      schema: { $ref: '#/definitions/PostResponse' }
    }
    #swagger.responses[400] = {
      description: 'Dados inválidos',
      schema: { $ref: '#/definitions/ValidationError' }
    }
    #swagger.responses[404] = {
      description: 'Post não encontrado',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  postController.updatePost(req, res, next);
});

// DELETE /posts/:id
router.delete('/:id', (req, res, next) => {
  /*
    #swagger.tags = ['Posts']
    #swagger.description = 'Remove um post pelo ID'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do post a ser removido',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Post removido com sucesso',
      schema: {
        success: true,
        message: 'Post removido com sucesso'
      }
    }
    #swagger.responses[404] = {
      description: 'Post não encontrado',
      schema: { $ref: '#/definitions/Error' }
    }
  */
  postController.deletePost(req, res, next);
});

module.exports = router;
