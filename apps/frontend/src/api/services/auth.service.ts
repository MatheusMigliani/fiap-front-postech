import api from '@/api/axios.config';
import { API_ENDPOINTS } from '@/api/endpoints';
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
  ApiResponse,
  LoginApiResponse,
  MeApiResponse,
} from '@/types/auth.types';

class AuthService {
  /**
   * Realiza login no sistema
   * @param credentials - Email e senha do usuário
   * @returns Dados do usuário e token JWT
   * @throws Error se as credenciais forem inválidas
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<ApiResponse<LoginApiResponse>>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      const { user, token } = response.data.data;

      return {
        user,
        token,
      };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Erro ao realizar login. Verifique suas credenciais.';

      throw new Error(errorMessage);
    }
  }

  /**
   * Registra um novo usuário no sistema
   * @param credentials - Nome, email e senha do novo usuário
   * @returns Dados do usuário criado e token JWT
   * @throws Error se o registro falhar
   */
  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<ApiResponse<LoginApiResponse>>(
        API_ENDPOINTS.AUTH.REGISTER,
        credentials
      );

      const { user, token } = response.data.data;

      return {
        user,
        token,
      };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Erro ao realizar cadastro. Tente novamente.';

      throw new Error(errorMessage);
    }
  }

  /**
   * Realiza logout do sistema
   * Remove o token do localStorage através do Redux
   */
  async logout(): Promise<void> {
    // Logout é apenas client-side - o token será removido pelo Redux
    return Promise.resolve();
  }

  /**
   * Valida o token JWT atual
   * @returns Dados atualizados do usuário
   * @throws Error se o token for inválido ou expirado
   */
  async validateToken(): Promise<{ user: User }> {
    try {
      const response = await api.get<ApiResponse<MeApiResponse>>(
        API_ENDPOINTS.AUTH.ME
      );

      const { user } = response.data.data;

      return { user };
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        'Token inválido ou expirado';

      throw new Error(errorMessage);
    }
  }

  /**
   * Obtém os dados do usuário autenticado
   * Alias para validateToken() para melhor semântica
   * @returns Dados do usuário autenticado
   */
  async getCurrentUser(): Promise<User> {
    const { user } = await this.validateToken();
    return user;
  }
}

export const authService = new AuthService();
