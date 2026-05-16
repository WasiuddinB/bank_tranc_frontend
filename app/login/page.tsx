'use client';

import { Card, CardHeader, CardBody } from '../../src/components/ui';
import { LoginForm } from '../../src/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader
          title="Welcome Back"
          subtitle="Sign in to your bank ledger account"
        />
        <CardBody>
          <LoginForm />
        </CardBody>
      </Card>
    </div>
  );
}
