import { LoginCredentials, AuthResponse, User } from '@/types/auth.types';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_USERS = [
  {
    id: '1',
    email: 'professor@fiap.com.br',
    password: 'fiap2024',
    name: 'Professor FIAP',
    role: 'professor',
  },
];

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(800);

    const user = MOCK_USERS.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const token = btoa(`${user.email}:${Date.now()}`);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    };
  }

  async logout(): Promise<void> {
    await delay(300);
  }

  async validateToken(): Promise<{ user: User }> {
    await delay(300);

    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw new Error('Token não encontrado');
    }

    try {
      const decoded = atob(token);
      const [email] = decoded.split(':');

      const user = MOCK_USERS.find((u) => u.email === email);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    } catch {
      throw new Error('Token inválido');
    }
  }
}

export const authService = new AuthService();
