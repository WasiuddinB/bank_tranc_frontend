"use client";

import { useState } from "react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Header } from "@/components/Header";
import { SendMoneyForm } from "@/components/transactions/SendMoneyForm";
import { useAccounts } from "@/hooks/useAccounts";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Alert,
  Badge,
  Skeleton,
} from "@/components/ui";
import { ArrowRightLeft, CheckCircle2, AlertCircle } from "lucide-react";

export default function TransactionsPage() {
  const { accounts, isLoading } = useAccounts();
  const [successMessage, setSuccessMessage] = useState("");

  const primaryAccount = accounts[0];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
              Transactions
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Send money between your accounts securely
            </p>
          </div>

          {/* Alerts */}
          {successMessage && (
            <Alert
              type="success"
              title="Success!"
              message={successMessage}
              className="mt-6 mb-6"
              onClose={() => setSuccessMessage("")}
            />
          )}

          {isLoading ? (
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Skeleton className="h-96 w-full rounded-xl" />
              <Skeleton className="h-96 w-full rounded-xl" />
            </div>
          ) : primaryAccount ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {/* Send Money Form */}
              <Card>
                <CardHeader
                  title="Send Money"
                  subtitle="Transfer funds between your accounts"
                />
                <CardBody>
                  <SendMoneyForm
                    account={primaryAccount}
                    onSuccess={() => {
                      setSuccessMessage("Transaction completed successfully!");
                      setTimeout(() => setSuccessMessage(""), 3000);
                    }}
                  />
                </CardBody>
              </Card>

              {/* Transaction Info & Guidelines */}
              <div className="space-y-6">
                {/* Quick Info */}
                <Card>
                  <CardHeader title="Transaction Requirements" />
                  <CardBody className="space-y-3">
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary-600 dark:text-secondary-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-neutral-50 text-sm">
                          Sufficient Balance
                        </p>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                          Sender account must have enough funds
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary-600 dark:text-secondary-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-neutral-50 text-sm">
                          Active Status
                        </p>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                          Both accounts must be ACTIVE
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary-600 dark:text-secondary-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-neutral-50 text-sm">
                          Valid Amount
                        </p>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                          Transfer amount must be greater than zero
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-secondary-600 dark:text-secondary-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-neutral-50 text-sm">
                          Different Accounts
                        </p>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400">
                          Cannot transfer to the same account
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>

                {/* Processing Info */}
                <Card className="border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-950/30">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-primary-900 dark:text-primary-100 text-sm mb-1">
                        Instant Processing
                      </h4>
                      <p className="text-xs text-primary-800 dark:text-primary-200">
                        Transactions are processed atomically. You'll receive
                        email confirmation once completed.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            <Card className="mt-8">
              <CardBody className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4">
                  <ArrowRightLeft className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                  No Accounts Available
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  You need at least one account to send money
                </p>
                <Button
                  variant="primary"
                  onClick={() => (window.location.href = "/accounts")}
                >
                  Go to Accounts
                </Button>
              </CardBody>
            </Card>
          )}

          {/* Account Summary */}
          {!isLoading && accounts.length > 0 && (
            <Card className="mt-8">
              <CardHeader
                title="Account Summary"
                subtitle="All your accounts at a glance"
              />
              <CardBody>
                <div className="space-y-3">
                  {accounts.map((account) => (
                    <div
                      key={account._id}
                      className="flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-800/50 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-smooth"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-neutral-900 dark:text-neutral-50">
                            {account.currency} Account
                          </p>
                          <Badge
                            variant={
                              account.status === "ACTIVE"
                                ? "success"
                                : "warning"
                            }
                            size="sm"
                          >
                            {account.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono truncate">
                          {account._id.slice(0, 16)}...
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
