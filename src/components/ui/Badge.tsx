import React from "react";

interface BadgeProps {
  variant?: "default" | "primary" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
}

export function Badge({
  variant = "default",
  size = "md",
  className,
  children,
}: BadgeProps) {
  const variants = {
    default:
      "bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100",
    primary: "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-200",
    success:
      "bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-200",
    warning:
      "bg-amber-100/60 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200",
    error: "bg-red-100/60 dark:bg-red-900/30 text-red-900 dark:text-red-200",
    info: "bg-blue-100/60 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs font-medium",
    md: "px-3 py-1 text-sm font-medium",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full ${variants[variant]} ${sizes[size]} ${className || ""}`}
    >
      {children}
    </span>
  );
}
