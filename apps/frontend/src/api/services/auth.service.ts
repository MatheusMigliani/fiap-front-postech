import api from '@/api/axios.config';
import { LoginCredentials, AuthResponse, User } from '@/types/auth.types';

/**
 * Serviço de autenticação
 * Gerencia login, logout e validação de token usando httpOnly cookies
 */
class AuthService {
  /**
   * Realiza login do usuário
   * O token JWT é armazenado automaticamente em cookie httpOnly pelo backend
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);

    // Cookie setado automaticamente pelo navegador
    return {
      user: response.data.data.user,
      token: '', // Token não é retornado (está no cookie httpOnly)
    };
  }

  /**
   * Realiza logout do usuário
   * Remove o cookie httpOnly no backend
   */
  async logout(): Promise<void> {
    await api.post('/auth/logout');
  }

  /**
   * Valida o token JWT armazenado no cookie
   * Retorna os dados do usuário se o token for válido
   */
  async validateToken(): Promise<{ user: User }> {
    const response = await api.get('/auth/validate');
    return {
      user: response.data.data.user,
    };
  }

  /**
   * Busca os dados do usuário autenticado atual
   * Requer autenticação (cookie httpOnly)
   */
  async getCurrentUser(): Promise<{ user: User }> {
    const response = await api.get('/auth/me');
    return {
      user: response.data.data.user,
    };
  }
}

export const authService = new AuthService();
