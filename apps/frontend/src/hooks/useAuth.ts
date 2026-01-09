import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, logout, checkAuthStatus } from '@/store/slices/authSlice';
import { LoginCredentials } from '@/types/auth.types';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth);

  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        await dispatch(login(credentials)).unwrap();
        toast.success('Login realizado com sucesso!');
        navigate('/');
      } catch {
        toast.error(error || 'Erro ao fazer login');
      }
    },
    [dispatch, navigate, error]
  );

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.info('Logout realizado');
      navigate('/login');
    } catch {
      toast.error('Erro ao fazer logout');
    }
  }, [dispatch, navigate]);

  const validateAuth = useCallback(async () => {
    try {
      await dispatch(checkAuthStatus()).unwrap();
    } catch {
      // Silent fail - token inválido
    }
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
    validateAuth,
  };
};
