import React from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: Option[];
  helper?: string;
}

export function Select({
  label,
  error,
  options = [],
  helper,
  className,
  disabled,
  children,
  ...props
}: SelectProps) {
  const hasError = !!error;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          {...props}
          disabled={disabled}
          className={`
            w-full px-4 py-2.5 pr-10 text-base rounded-lg
            bg-neutral-50 dark:bg-neutral-900
            border-2 transition-smooth appearance-none cursor-pointer
            disabled:opacity-50 disabled:cursor-not-allowed
            focus-ring
            ${hasError ? "border-error dark:border-error" : "border-neutral-300 dark:border-neutral-700"}
            dark:text-neutral-50
            ${className || ""}
          `}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 dark:text-neutral-600 pointer-events-none" />
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
