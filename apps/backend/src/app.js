const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const config = require('./config/environment');
const connectDatabase = require('./config/database');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
    ];

    // Permite requests sem origin (ex: Postman, Swagger)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, origin); // 🔑 origem exata
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie'],
  optionsSuccessStatus: 200,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log de requisições
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (_req, res) => {
  /*
    #swagger.tags = ['Health']
    #swagger.description = 'Verifica se a API está funcionando'
    #swagger.responses[200] = {
      description: 'API funcionando normalmente',
      schema: {
        success: true,
        message: 'API está funcionando!',
        timestamp: '2026-01-07T00:00:00.000Z'
      }
    }
  */
  res.status(200).json({
    success: true,
    message: 'API está funcionando!',
    timestamp: new Date().toISOString(),
  });
});

// Rota raiz
app.get('/', (_req, res) => {
  /*
    #swagger.tags = ['API']
    #swagger.description = 'Endpoint raiz da API com informações gerais'
    #swagger.responses[200] = {
      description: 'Informações da API',
      schema: {
        success: true,
        message: 'Bem-vindo à API de Blogging Educacional - FIAP',
        version: 'v1',
        endpoints: {
          posts: '/posts',
          health: '/health',
          docs: '/swagger'
        }
      }
    }
  */
  res.status(200).json({
    success: true,
    message: 'Bem-vindo à API de Blogging Educacional - FIAP',
    version: config.apiVersion,
    endpoints: {
      auth: '/auth',
      posts: '/posts',
      health: '/health',
      docs: '/swagger',
    },
  });
});

// Swagger Documentation
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Blogging Educacional - FIAP',
}));

// Rotas da API
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

// Rota 404
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
  });
});

// Error handler (deve ser o último middleware)
app.use(errorHandler);

// Inicializar servidor
const startServer = async () => {
  try {
    // Conectar ao banco de dados
    await connectDatabase();

    // Iniciar servidor
    app.listen(config.port, () => {
      logger.success(`Servidor rodando na porta ${config.port}`);
      logger.info(`Ambiente: ${config.nodeEnv}`);
      logger.info(`Acesse: http://localhost:${config.port}`);
    });
  } catch (error) {
    logger.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

// Iniciar apenas se executado diretamente (não em testes)
if (require.main === module) {
  startServer();
}

module.exports = app;
