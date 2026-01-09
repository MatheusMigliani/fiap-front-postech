require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const config = require('../config/environment');
const logger = require('../utils/logger');

/**
 * Script para popular o banco de dados com usuários de teste
 * Uso: node src/scripts/seedUsers.js
 */

const users = [
  {
    email: 'admin@fiap.com.br',
    password: 'admin123',
    name: 'Administrador FIAP',
    role: 'admin',
  },
  {
    email: 'professor@fiap.com.br',
    password: 'fiap2024',
    name: 'Prof. João Silva',
    role: 'user',
  },
];

const seedUsers = async () => {
  try {
    // Conectar ao banco de dados
    logger.info('Conectando ao banco de dados...');
    await mongoose.connect(config.mongodb.uri);
    logger.success('Conectado ao MongoDB!');

    // Remover usuários existentes (opcional - cuidado em produção!)
    logger.info('Removendo usuários existentes...');
    await User.deleteMany({});
    logger.success('Usuários removidos!');

    // Criar novos usuários
    logger.info('Criando usuários de teste...');
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      logger.success(`Usuário criado: ${userData.email} (${userData.role})`);
    }

    logger.success('\n=== Usuários de teste criados com sucesso! ===');
    logger.info('\nCredenciais para teste:');
    logger.info('  Admin:');
    logger.info('    Email: admin@fiap.com.br');
    logger.info('    Senha: admin123');
    logger.info('  Professor:');
    logger.info('    Email: professor@fiap.com.br');
    logger.info('    Senha: fiap2024');

    // Desconectar do banco
    await mongoose.disconnect();
    logger.info('\nDesconectado do MongoDB!');
    process.exit(0);
  } catch (error) {
    logger.error('Erro ao popular banco de dados:', error);
    process.exit(1);
  }
};

// Executar seed
seedUsers();
