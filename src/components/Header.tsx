"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui";
import {
  LayoutDashboard,
  Wallet,
  ArrowRightLeft,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuth();
  const { user, isAuthenticated } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/accounts", label: "Accounts", icon: Wallet },
    { href: "/transactions", label: "Transactions", icon: ArrowRightLeft },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 backdrop-blur-md bg-white/80 dark:bg-neutral-950/80">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex items-center gap-3 flex-shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent hidden sm:inline-block">
            Bank Ledger
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`
                px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium
                transition-smooth
                ${
                  isActive(href)
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                }
              `}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </div>

        {/* User Menu & Logout */}
        <div className="flex items-center gap-4">
          {/* User Info - Desktop */}
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
              {user?.name}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {user?.email}
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            icon={<LogOut className="w-4 h-4" />}
            className="hidden sm:flex"
          >
            Logout
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-smooth"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
          <div className="px-4 py-4 space-y-2">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  block px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium
                  transition-smooth
                  ${
                    isActive(href)
                      ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="px-4">
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-50">
                  {user?.name}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {user?.email}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                icon={<LogOut className="w-4 h-4" />}
                fullWidth
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
