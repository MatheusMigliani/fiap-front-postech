const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'O email é obrigatório'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Por favor, forneça um email válido',
      ],
    },
    password: {
      type: String,
      required: [true, 'A senha é obrigatória'],
      minlength: [6, 'A senha deve ter no mínimo 6 caracteres'],
      select: false, // Não retornar password por padrão nas queries
    },
    name: {
      type: String,
      required: [true, 'O nome é obrigatório'],
      trim: true,
      maxlength: [100, 'O nome não pode ter mais de 100 caracteres'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Adiciona automaticamente createdAt e updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Índices para melhor performance
userSchema.index({ email: 1 });
userSchema.index({ deletedAt: 1 });

// Query helper para excluir usuários deletados (soft delete)
userSchema.query.notDeleted = function () {
  return this.where({ deletedAt: null });
};

// Pre-save hook para hash da senha com bcrypt
userSchema.pre('save', async function (next) {
  // Só fazer hash se a senha foi modificada (ou é nova)
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Gerar salt e hash da senha
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método de instância para comparar senha
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Método toJSON para remover campos sensíveis
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
