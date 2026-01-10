const User = require('../models/User');
const logger = require('../utils/logger');

const defaultUser = {
  name: 'Professor FIAP',
  email: 'professor@fiap.com.br',
  password: 'fiap2024', // This will be hashed by the pre-save hook
  role: 'professor',
};

const runSeeds = async () => {
  try {
    const userExists = await User.findOne({ email: defaultUser.email });

    if (!userExists) {
      await User.create(defaultUser);
      logger.info('Usuário padrão criado com sucesso!');
    } else {
      logger.info('Usuário padrão já existe.');
    }
  } catch (error) {
    logger.error('Erro ao executar seeds:', error);
    process.exit(1);
  }
};

module.exports = { runSeeds };
