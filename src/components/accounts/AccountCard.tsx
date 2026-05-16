'use client';

import { Account } from '@/types';
import { useAccountBalance } from '@/hooks/useAccounts';
import { Card, CardHeader, CardBody } from '@/components/ui';

interface AccountCardProps {
  account: Account;
}

export function AccountCard({ account }: AccountCardProps) {
  const { balance, isLoading } = useAccountBalance(account._id);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader
        title={`Account`}
        subtitle={`ID: ${account._id.slice(0, 8)}...`}
      />
      <CardBody className="space-y-3">
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="text-lg font-semibold">
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold ${
                account.status === 'ACTIVE'
                  ? 'bg-green-100 text-green-800'
                  : account.status === 'FROZEN'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
              }`}
            >
              {account.status}
            </span>
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Balance</p>
          <p className="text-2xl font-bold text-blue-600">
            {isLoading ? '...' : `${balance?.toLocaleString()} ${account.currency}`}
          </p>
        </div>
        <div className="text-xs text-gray-400">
          Created {new Date(account.createdAt).toLocaleDateString()}
        </div>
      </CardBody>
    </Card>
  );
}
