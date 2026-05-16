'use client';

import { useState } from 'react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Header } from '@/components/Header';
import { SendMoneyForm } from '@/components/transactions/SendMoneyForm';
import { useAccounts } from '@/hooks/useAccounts';
import { Button, Card, CardHeader, CardBody, Alert } from '@/components/ui';

export default function TransactionsPage() {
  const { accounts, isLoading } = useAccounts();
  const [successMessage, setSuccessMessage] = useState('');

  const primaryAccount = accounts[0];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
            <p className="text-gray-600 mt-2">Send money between your accounts</p>
          </div>

          {/* Alerts */}
          {successMessage && (
            <Alert
              type="success"
              message={successMessage}
              className="mt-6 mb-6"
              onClose={() => setSuccessMessage('')}
            />
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : primaryAccount ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {/* Send Money Form */}
              <Card>
                <CardHeader
                  title="Send Money"
                  subtitle="Transfer funds between accounts"
                />
                <CardBody>
                  <SendMoneyForm
                    account={primaryAccount}
                    onSuccess={() => {
                      setSuccessMessage('Transaction completed successfully!');
                      setTimeout(() => setSuccessMessage(''), 3000);
                    }}
                  />
                </CardBody>
              </Card>

              {/* Transaction Info */}
              <Card>
                <CardHeader
                  title="Transaction Guidelines"
                  subtitle="Important information"
                />
                <CardBody className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">Requirements:</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1 ml-4">
                      <li>• Sender account must have sufficient balance</li>
                      <li>• Both accounts must be ACTIVE</li>
                      <li>• Amount must be greater than 0</li>
                      <li>• Recipient account must be different</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Processing:</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Transactions are processed atomically. You'll receive an email confirmation once completed.
                    </p>
                  </div>
                </CardBody>
              </Card>
            </div>
          ) : (
            <Card className="mt-8">
              <CardBody className="text-center py-12">
                <p className="text-gray-600 mb-4">You need at least one account to send money</p>
                <Button variant="primary" onClick={() => window.location.href = '/accounts'}>
                  Go to Accounts
                </Button>
              </CardBody>
            </Card>
          )}

          {/* Additional Info */}
          <Card className="mt-8">
            <CardHeader title="Account Summary" />
            <CardBody>
              {accounts.length > 0 ? (
                <div className="space-y-2">
                  {accounts.map((account) => (
                    <div
                      key={account._id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900">Account</p>
                        <p className="text-sm text-gray-500">{account._id.slice(0, 12)}...</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          account.status === 'ACTIVE'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {account.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No accounts available</p>
              )}
            </CardBody>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  );
}
