'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui';

export function Header() {
  const router = useRouter();
  const { logout } = useAuth();
  const { user, isAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="bg-white shadow">
      <nav className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
          Bank Ledger
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
            Dashboard
          </Link>
          <Link href="/accounts" className="text-gray-600 hover:text-gray-900 transition-colors">
            Accounts
          </Link>
          <Link href="/transactions" className="text-gray-600 hover:text-gray-900 transition-colors">
            Transactions
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm">
            <p className="font-medium text-gray-900">{user?.name}</p>
            <p className="text-gray-500">{user?.email}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </nav>
    </header>
  );
}
