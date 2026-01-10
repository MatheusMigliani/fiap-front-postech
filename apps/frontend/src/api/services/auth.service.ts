import { API_ENDPOINTS } from '@/api/endpoints';
import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
} from '@/types/auth.types';
import { getStoredToken } from '@/utils/storage';
import { API_BASE_URL } from '@/utils/constants';

const handleResponse = async (response: Response) => {
  const responseData = await response.json();
  if (!response.ok) {
    const errorMessage = responseData.message || responseData.error || `Erro HTTP: ${response.status}`;
    throw new Error(errorMessage);
  }
  return responseData.data;
};

const getAuthHeaders = () => {
  const token = getStoredToken();
  return token
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    : {
        'Content-Type': 'application/json',
      };
};

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.LOGIN}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const errorMessage = responseData.message || responseData.error || `Erro HTTP: ${response.status}`;
      throw new Error(errorMessage);
    }
    return { token: responseData.token, user: responseData.data.user };
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.REGISTER}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const errorMessage = responseData.message || responseData.error || `Erro HTTP: ${response.status}`;
      throw new Error(errorMessage);
    }
    return { token: responseData.token, user: responseData.data.user };
  }

  async logout(): Promise<void> {
    // Logout is client-side, just clearing the token
    return Promise.resolve();
  }

  async validateToken(): Promise<{ user: User }> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.ME}`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  }

  async getCurrentUser(): Promise<User> {
    const { user } = await this.validateToken();
    return user;
  }
}

export const authService = new AuthService();
