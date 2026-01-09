import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/utils/constants';

/**
 * Instância configurada do Axios
 * withCredentials: true permite envio automático de cookies httpOnly
 */
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Habilita envio de cookies httpOnly
});

/**
 * Interceptor de resposta
 * Gerencia erros globais e redireciona para login em caso de 401
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Token inválido ou expirado - redireciona para login
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }

    // Log de erros do servidor
    if (error.response?.status >= 500) {
      console.error('Erro no servidor:', error.response.data);
    }

    return Promise.reject(error);
  }
);

export default api;
