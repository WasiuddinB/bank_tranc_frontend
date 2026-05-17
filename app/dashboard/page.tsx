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
  Skeleton,
  SkeletonGrid,
} from "@/components/ui";
import { Plus, TrendingUp, Wallet } from "lucide-react";

export default function DashboardPage() {
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

  const primaryAccount = accounts[0];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
              Dashboard
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Welcome back! Here's your financial overview
            </p>
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

          {/* Summary Stats */}
          {!isLoading && accounts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card hover>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                      Active Accounts
                    </p>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
                      {accounts.filter((a) => a.status === "ACTIVE").length}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
                    <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </Card>

              <Card hover>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                      Total Accounts
                    </p>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
                      {accounts.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </Card>

              <Card hover>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                      Account Status
                    </p>
                    <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
                      {accounts.filter((a) => a.status !== "CLOSED").length}/
                      {accounts.length}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-100/60 dark:bg-blue-900/20">
                    <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Primary Account & Actions */}
          {isLoading ? (
            <SkeletonGrid columns={2} count={2} />
          ) : primaryAccount ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <AccountCard account={primaryAccount} />
              </div>
              <div className="flex flex-col gap-4">
                <Card>
                  <CardHeader title="Quick Actions" />
                  <CardBody className="space-y-3">
                    <SendMoneyForm
                      account={primaryAccount}
                      onSuccess={() => refetch()}
                    />
                    <Button
                      variant="secondary"
                      fullWidth
                      onClick={handleCreateAccount}
                      isLoading={isCreatingAccount}
                      icon={<Plus className="w-4 h-4" />}
                    >
                      New Account
                    </Button>
                  </CardBody>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="mb-8">
              <CardBody className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                  No Accounts Yet
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Create your first account to get started with transactions
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

          {/* Accounts List */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                  Your Accounts
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {accounts.length} account{accounts.length !== 1 ? "s" : ""} in
                  total
                </p>
              </div>
              {!isLoading && accounts.length > 0 && (
                <Button
                  variant="outline"
                  onClick={handleCreateAccount}
                  isLoading={isCreatingAccount}
                  icon={<Plus className="w-4 h-4" />}
                >
                  New Account
                </Button>
              )}
            </div>

            {isLoading ? (
              <SkeletonGrid columns={3} count={6} />
            ) : accounts.length > 1 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accounts.map((account) => (
                  <AccountCard key={account._id} account={account} />
                ))}
              </div>
            ) : accounts.length === 1 ? (
              <Card>
                <CardBody className="text-center py-8">
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Create more accounts to diversify your finances
                  </p>
                </CardBody>
              </Card>
            ) : null}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
