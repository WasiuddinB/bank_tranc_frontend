'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Header } from '@/components/Header';
import { AccountCard } from '@/components/accounts/AccountCard';
import { SendMoneyForm } from '@/components/transactions/SendMoneyForm';
import { useAccounts, useCreateAccount } from '@/hooks/useAccounts';
import { Button, Card, CardHeader, CardBody, Alert } from '@/components/ui';

export default function DashboardPage() {
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

  const primaryAccount = accounts[0];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome to your bank ledger</p>
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

          {/* Primary Account & Actions */}
          {primaryAccount ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <AccountCard account={primaryAccount} />
              </div>
              <div className="flex flex-col gap-4">
                <Card>
                  <CardHeader title="Quick Actions" />
                  <CardBody className="space-y-2">
                    <SendMoneyForm
                      account={primaryAccount}
                      onSuccess={() => refetch()}
                    />
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={handleCreateAccount}
                      isLoading={isCreatingAccount}
                    >
                      New Account
                    </Button>
                  </CardBody>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="mb-8">
              <CardBody className="text-center py-8">
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

          {/* Accounts List */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Your Accounts</h2>
              <span className="text-gray-600">{accounts.length} account(s)</span>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            ) : accounts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map((account) => (
                  <AccountCard key={account._id} account={account} />
                ))}
              </div>
            ) : (
              <Card>
                <CardBody className="text-center py-8">
                  <p className="text-gray-600">No accounts available</p>
                </CardBody>
              </Card>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
