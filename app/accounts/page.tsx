"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Header } from "@/components/Header";
import { AccountCard } from "@/components/accounts/AccountCard";
import { SendMoneyForm } from "@/components/transactions/SendMoneyForm";
import { useAccounts, useCreateAccount } from "@/hooks/useAccounts";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Alert,
  SkeletonGrid,
} from "@/components/ui";
import { Plus, Wallet } from "lucide-react";

export default function AccountsPage() {
  const { accounts, isLoading, refetch } = useAccounts();
  const {
    create: createAccount,
    isLoading: isCreatingAccount,
    error: createError,
  } = useCreateAccount();
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateAccount = async () => {
    try {
      await createAccount();
      setSuccessMessage("Account created successfully!");
      refetch();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      // Error is handled by the hook
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
                Accounts
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Manage and organize all your bank accounts
              </p>
            </div>
            <Button
              variant="primary"
              onClick={handleCreateAccount}
              isLoading={isCreatingAccount}
              icon={<Plus className="w-4 h-4" />}
              className="hidden sm:flex"
            >
              New Account
            </Button>
          </div>

          {/* Alerts */}
          {successMessage && (
            <Alert
              type="success"
              message={successMessage}
              className="mb-6"
              onClose={() => setSuccessMessage("")}
            />
          )}
          {createError && (
            <Alert type="error" message={createError} className="mb-6" />
          )}

          {/* Mobile Create Button */}
          <div className="sm:hidden mb-6">
            <Button
              variant="primary"
              onClick={handleCreateAccount}
              isLoading={isCreatingAccount}
              icon={<Plus className="w-4 h-4" />}
              fullWidth
            >
              New Account
            </Button>
          </div>

          {/* Accounts Grid */}
          {isLoading ? (
            <SkeletonGrid columns={2} count={4} />
          ) : accounts.length > 0 ? (
            <div className="space-y-6">
              {accounts.map((account) => (
                <div
                  key={account._id}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                  <div className="lg:col-span-2">
                    <AccountCard account={account} />
                  </div>
                  <Card>
                    <CardHeader
                      title="Transfer Funds"
                      subtitle="Send money from this account"
                    />
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
              <CardBody className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                  No Accounts Yet
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Get started by creating your first bank account
                </p>
                <Button
                  variant="primary"
                  onClick={handleCreateAccount}
                  isLoading={isCreatingAccount}
                  icon={<Plus className="w-4 h-4" />}
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
