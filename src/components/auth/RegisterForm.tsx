"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerSchema, type RegisterFormData } from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";
import { Button, Input, Alert } from "@/components/ui";
import { User, Mail, Lock } from "lucide-react";

export function RegisterForm() {
  const router = useRouter();
  const { register: authRegister, isLoading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await authRegister(data.email, data.name, data.password);
      router.push("/dashboard");
    } catch (err) {
      // Error is handled by auth store
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {error && <Alert type="error" message={error} />}

      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        icon={<User className="w-4 h-4" />}
        {...register("name")}
        error={errors.name?.message}
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        icon={<Mail className="w-4 h-4" />}
        {...register("email")}
        error={errors.email?.message}
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        icon={<Lock className="w-4 h-4" />}
        {...register("password")}
        error={errors.password?.message}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        icon={<Lock className="w-4 h-4" />}
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        fullWidth
      >
        Create Account
      </Button>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
        <p className="text-xs text-neutral-500 dark:text-neutral-400">or</p>
        <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
      </div>

      <p className="text-center text-neutral-600 dark:text-neutral-400 text-sm">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-smooth"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
