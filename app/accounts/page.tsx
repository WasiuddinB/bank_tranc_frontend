'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Header } from '@/components/Header';
import { AccountCard } from '@/components/accounts/AccountCard';
import { SendMoneyForm } from '@/components/transactions/SendMoneyForm';
import { useAccounts, useCreateAccount } from '@/hooks/useAccounts';
import { Button, Card, CardHeader, CardBody, Alert } from '@/components/ui';

export default function AccountsPage() {
  const { accounts, isLoading, refetch } = useAccounts();
  const { create: createAccount, isLoading: isCreatingAccount, error: createError } = useCreateAccount();
  const [successMessage, setSuccessMessage] = useState('');

  const handleCreateAccount = async () => {
    try {
      await createAccount();
      setSuccessMessage('Account created successfully!');
      refetch();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
              <p className="text-gray-600 mt-2">Manage your bank accounts</p>
            </div>
            <Button
              variant="primary"
              onClick={handleCreateAccount}
              isLoading={isCreatingAccount}
            >
              + New Account
            </Button>
          </div>

          {/* Alerts */}
          {successMessage && (
            <Alert
              type="success"
              message={successMessage}
              className="mb-6"
              onClose={() => setSuccessMessage('')}
            />
          )}
          {createError && (
            <Alert
              type="error"
              message={createError}
              className="mb-6"
            />
          )}

          {/* Accounts Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : accounts.length > 0 ? (
            <div className="space-y-6">
              {accounts.map((account) => (
                <div key={account._id} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <AccountCard account={account} />
                  </div>
                  <Card>
                    <CardHeader title="Actions" />
                    <CardBody>
                      <SendMoneyForm
                        account={account}
                        onSuccess={() => refetch()}
                      />
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <Card>
              <CardBody className="text-center py-12">
                <p className="text-gray-600 mb-4">You don't have any accounts yet</p>
                <Button
                  variant="primary"
                  onClick={handleCreateAccount}
                  isLoading={isCreatingAccount}
                >
                  Create First Account
                </Button>
              </CardBody>
            </Card>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
