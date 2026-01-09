const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API de Blogging Educacional - FIAP',
    version: '1.0.0',
    description: 'API REST para plataforma de blogging educacional para professores da rede pública',
    contact: {
      name: 'FIAP - Pós Tech',
      email: 'matheusmigliani@yahoo.com.br'
    }
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    cookieAuth: {
      type: 'apiKey',
      in: 'cookie',
      name: 'auth_token',
      description: 'Token JWT armazenado em cookie httpOnly'
    }
  },
  tags: [
    {
      name: 'API',
      description: 'Informações gerais da API'
    },
    {
      name: 'Auth',
      description: 'Autenticação e autorização de usuários'
    },
    {
      name: 'Posts',
      description: 'Endpoints para gerenciamento de posts educacionais'
    },
    {
      name: 'Health',
      description: 'Verificação de saúde da API'
    }
  ],
  definitions: {
    Post: {
      title: 'Introdução à Matemática',
      content: 'Conteúdo completo da aula sobre matemática básica...',
      author: 'Prof. João Silva'
    },
    PostResponse: {
      success: true,
      data: {
        id: '507f1f77bcf86cd799439011',
        title: 'Introdução à Matemática',
        content: 'Conteúdo completo da aula...',
        author: 'Prof. João Silva',
        createdAt: '2025-10-14T00:00:00.000Z',
        updatedAt: '2025-10-14T00:00:00.000Z'
      }
    },
    PostList: {
      success: true,
      count: 2,
      data: [
        {
          id: '507f1f77bcf86cd799439011',
          title: 'Introdução à Matemática',
          author: 'Prof. João Silva',
          createdAt: '2025-10-14T00:00:00.000Z',
          excerpt: 'Primeiros 100 caracteres...'
        }
      ]
    },
    Error: {
      success: false,
      message: 'Mensagem de erro'
    },
    ValidationError: {
      success: false,
      message: 'Erro de validação',
      errors: [
        {
          field: 'title',
          message: 'O título é obrigatório'
        }
      ]
    },
    RegisterUser: {
      email: 'professor@fiap.com.br',
      password: 'senha123',
      name: 'Prof. João Silva',
      role: 'user'
    },
    LoginCredentials: {
      email: 'professor@fiap.com.br',
      password: 'senha123'
    },
    LoginResponse: {
      success: true,
      message: 'Login realizado com sucesso',
      data: {
        user: {
          _id: '507f1f77bcf86cd799439011',
          email: 'professor@fiap.com.br',
          name: 'Prof. João Silva',
          role: 'user',
          createdAt: '2025-10-14T00:00:00.000Z',
          updatedAt: '2025-10-14T00:00:00.000Z'
        }
      }
    },
    UserResponse: {
      _id: '507f1f77bcf86cd799439011',
      email: 'professor@fiap.com.br',
      name: 'Prof. João Silva',
      role: 'user',
      createdAt: '2025-10-14T00:00:00.000Z',
      updatedAt: '2025-10-14T00:00:00.000Z'
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully!');
});
