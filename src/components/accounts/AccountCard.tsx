"use client";

import { Account } from "@/types";
import { useAccountBalance } from "@/hooks/useAccounts";
import { Card, CardBody, Badge, Skeleton } from "@/components/ui";
import { Wallet, TrendingUp } from "lucide-react";

interface AccountCardProps {
  account: Account;
}

export function AccountCard({ account }: AccountCardProps) {
  const { balance, isLoading } = useAccountBalance(account._id);

  const statusConfig = {
    ACTIVE: {
      badge: "success",
      label: "Active",
      color: "text-green-600 dark:text-green-400",
    },
    FROZEN: {
      badge: "warning",
      label: "Frozen",
      color: "text-amber-600 dark:text-amber-400",
    },
    INACTIVE: {
      badge: "error",
      label: "Inactive",
      color: "text-red-600 dark:text-red-400",
    },
  };

  const status =
    statusConfig[account.status as keyof typeof statusConfig] ||
    statusConfig.ACTIVE;

  return (
    <Card hover className="group">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-smooth">
          <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <Badge variant={status.badge as any} size="sm">
          {status.label}
        </Badge>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">
            Account ID
          </p>
          <p className="text-sm font-mono text-neutral-900 dark:text-neutral-50 truncate">
            {account._id.slice(0, 12)}...
          </p>
        </div>

        <div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">
            Balance
          </p>
          {isLoading ? (
            <Skeleton className="h-10 w-32" />
          ) : (
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
                {balance?.toLocaleString()}
              </p>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                {account.currency}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Created on
            </p>
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              {new Date(account.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <TrendingUp className="w-5 h-5 text-green-500 dark:text-green-400 opacity-40" />
        </div>
      </div>
    </Card>
  );
}
