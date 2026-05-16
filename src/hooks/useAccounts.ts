import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import { Account, AccountBalance, Transaction } from '@/types';
import { accountAPI, transactionAPI } from '@/services/api';

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await accountAPI.getAll();
      setAccounts(response.data.data || response.data);
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || 'Failed to fetch accounts');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return { accounts, isLoading, error, refetch: fetchAccounts };
}

export function useAccountBalance(accountId: string | null) {
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!accountId) {
      setBalance(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await accountAPI.getBalance(accountId);
      setBalance(response.data.balance);
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      setError(axiosError.response?.data?.message || 'Failed to fetch balance');
    } finally {
      setIsLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return { balance, isLoading, error, refetch: fetchBalance };
}

export function useCreateAccount() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await accountAPI.create();
      return response.data.account;
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>;
      const message = axiosError.response?.data?.message || 'Failed to create account';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { create, isLoading, error };
}

export function useCreateTransaction() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(
    async (data: {
      fromAccount: string;
      toAccount: string;
      amount: number;
      idempotencyKey: string;
    }) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await transactionAPI.create(data);
        return response.data.transaction;
      } catch (err) {
        const axiosError = err as AxiosError<{ message?: string }>;
        const message = axiosError.response?.data?.message || 'Transaction failed';
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { create, isLoading, error };
}
