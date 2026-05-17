import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export function Card({
  children,
  className,
  hover = false,
  glass = false,
}: CardProps) {
  const baseStyles = glass
    ? "glass rounded-xl border border-white/20 dark:border-white/10 p-6"
    : "bg-white dark:bg-neutral-900 rounded-xl shadow-card dark:shadow-lg p-6 border border-neutral-200 dark:border-neutral-800";

  const hoverClass = hover
    ? "transition-smooth hover:shadow-card-hover dark:hover:shadow-xl"
    : "";

  return (
    <div className={`${baseStyles} ${hoverClass} ${className || ""}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export function CardHeader({
  title,
  subtitle,
  action,
  children,
}: CardHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div className="flex-1">
        {title && (
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            {subtitle}
          </p>
        )}
        {children}
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function CardBody({ children, className }: CardBodyProps) {
  return <div className={`space-y-4 ${className || ""}`}>{children}</div>;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
  divider?: boolean;
}

export function CardFooter({
  children,
  className,
  divider = false,
}: CardFooterProps) {
  return (
    <div
      className={`pt-6 ${divider ? "border-t border-neutral-200 dark:border-neutral-800" : ""} ${className || ""}`}
    >
      {children}
    </div>
  );
}
