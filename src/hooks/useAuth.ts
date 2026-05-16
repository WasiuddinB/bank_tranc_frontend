import { useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { authAPI } from '../services/api';
import { AxiosError } from 'axios';

export function useAuth() {
  const { user, token, isAuthenticated, isLoading, error, setAuth, setIsLoading, setError, logout } = useAuthStore();

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authAPI.login({ email, password });
        const { user, token } = response.data;
        setAuth(user, token);
        return response.data;
      } catch (err) {
        const error = err as AxiosError<{ message?: string; errors?: Record<string, string> }>;
        const message = error.response?.data?.message || 'Login failed';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [setAuth, setIsLoading, setError]
  );

  const register = useCallback(
    async (email: string, name: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await authAPI.register({ email, name, password });
        const { user, token } = response.data;
        setAuth(user, token);
        return response.data;
      } catch (err) {
        const error = err as AxiosError<{ message?: string; errors?: Record<string, string> }>;
        const message = error.response?.data?.message || 'Registration failed';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [setAuth, setIsLoading, setError]
  );

  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      logout();
      setIsLoading(false);
    }
  }, [logout, setIsLoading]);

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout: handleLogout,
  };
}
