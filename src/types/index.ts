// User & Auth Types
export interface User {
  _id: string;
  email: string;
  name: string;
  systemUser?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
}

// Account Types
export interface Account {
  _id: string;
  user: string;
  status: 'ACTIVE' | 'FROZEN' | 'CLOSED';
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccountBalance {
  accountId: string;
  balance: number;
}

// Transaction Types
export interface Transaction {
  _id: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  idempotencyKey: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REVERSED';
  createdAt: string;
  updatedAt: string;
}

export interface CreateTransactionRequest {
  fromAccount: string;
  toAccount: string;
  amount: number;
  idempotencyKey: string;
}

// Ledger Types
export interface LedgerEntry {
  _id: string;
  account: string;
  amount: number;
  transaction: string;
  type: 'CREDIT' | 'DEBIT';
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
  errors?: Record<string, string>;
}

// Form Validation Types
export type LoginFormInputs = {
  email: string;
  password: string;
};

export type RegisterFormInputs = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

export type TransactionFormInputs = {
  toAccountId: string;
  amount: number;
};

export interface AccountWithBalance extends Account {
  balance: number;
}
