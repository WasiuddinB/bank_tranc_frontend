import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear auth and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data: { email: string; name: string; password: string }) =>
    apiClient.post('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    apiClient.post('/auth/login', data),

  logout: () =>
    apiClient.post('/auth/logout', {}),
};

export const accountAPI = {
  create: () =>
    apiClient.post('/accounts', {}),

  getAll: () =>
    apiClient.get('/accounts'),

  getBalance: (accountId: string) =>
    apiClient.get(`/accounts/balance/${accountId}`),
};

export const transactionAPI = {
  create: (data: {
    fromAccount: string;
    toAccount: string;
    amount: number;
    idempotencyKey: string;
  }) =>
    apiClient.post('/transactions', data),

  addInitialFunds: (data: {
    toAccount: string;
    amount: number;
    idempotencyKey: string;
  }) =>
    apiClient.post('/transactions/system/initial-funds', data),
};

export default apiClient;
