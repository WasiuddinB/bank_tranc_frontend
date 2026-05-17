"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { useAuth } from "@/hooks/useAuth";
import { Button, Input, Alert } from "../ui";
import { Mail, Lock } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      router.push("/dashboard");
    } catch (err) {
      // Error is handled by auth store
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {error && <Alert type="error" message={error} />}

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

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        fullWidth
      >
        Sign In
      </Button>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
        <p className="text-xs text-neutral-500 dark:text-neutral-400">or</p>
        <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-800" />
      </div>

      <p className="text-center text-neutral-600 dark:text-neutral-400 text-sm">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-smooth"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
