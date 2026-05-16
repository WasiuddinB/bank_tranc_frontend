'use client';

import { Card, CardHeader, CardBody } from '@/components/ui';
import { RegisterForm } from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader
          title="Create Account"
          subtitle="Join the bank ledger system"
        />
        <CardBody>
          <RegisterForm />
        </CardBody>
      </Card>
    </div>
  );
}
