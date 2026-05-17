import React from "react";
import { LoaderCircle } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "outline"
    | "ghost"
    | "success";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  disabled,
  className,
  children,
  icon,
  iconPosition = "left",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-smooth focus-ring disabled:opacity-50 disabled:cursor-not-allowed gap-2";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 dark:hover:bg-blue-500 shadow-md hover:shadow-lg active:shadow-sm",
    secondary:
      "bg-neutral-200 text-neutral-900 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600",
    danger:
      "bg-red-600 text-white hover:bg-red-700 dark:hover:bg-red-600 shadow-md hover:shadow-lg active:shadow-sm",
    success:
      "bg-green-600 text-white hover:bg-green-700 dark:hover:bg-green-500 shadow-md hover:shadow-lg active:shadow-sm",
    outline:
      "border-2 border-neutral-300 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800",
    ghost:
      "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800",
  };

  const sizes = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className || ""}`}
    >
      {isLoading && <LoaderCircle className="w-4 h-4 animate-spin" />}
      {icon && iconPosition === "left" && !isLoading && icon}
      {children}
      {icon && iconPosition === "right" && !isLoading && icon}
    </button>
  );
}
