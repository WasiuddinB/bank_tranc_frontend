import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
  success?: boolean;
}

export function Input({
  label,
  error,
  helper,
  icon,
  success,
  className,
  disabled,
  ...props
}: InputProps) {
  const hasError = !!error;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          {...props}
          disabled={disabled}
          className={`
            w-full px-4 py-2.5 text-base rounded-lg
            bg-neutral-50 dark:bg-neutral-900
            border-2 transition-smooth
            placeholder:text-neutral-400 dark:placeholder:text-neutral-600
            disabled:opacity-50 disabled:cursor-not-allowed
            focus-ring
            ${icon ? "pl-10" : ""}
            ${hasError ? "border-error dark:border-error focus:ring-error/20" : "border-neutral-300 dark:border-neutral-700"}
            ${success && !hasError ? "border-secondary-500 dark:border-secondary-500" : ""}
            dark:text-neutral-50
            ${className || ""}
          `}
        />
      </div>
      {hasError ? (
        <p className="text-error text-sm mt-1.5 font-medium">{error}</p>
      ) : helper ? (
        <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1.5">
          {helper}
        </p>
      ) : null}
    </div>
  );
}
