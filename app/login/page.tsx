"use client";

import { Card, CardHeader, CardBody } from "@/components/ui";
import { LoginForm } from "@/components/auth/LoginForm";
import { Wallet } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50 to-neutral-50 dark:from-neutral-950 dark:via-blue-950/20 dark:to-neutral-950 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200/30 dark:bg-green-900/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-md">
        <Card className="backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">
                Welcome Back
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                Sign in to your bank ledger account
              </p>
            </div>
          </CardHeader>
          <CardBody>
            <LoginForm />
          </CardBody>
        </Card>

        {/* Footer text */}
        <p className="text-center text-xs text-neutral-500 dark:text-neutral-400 mt-6">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
