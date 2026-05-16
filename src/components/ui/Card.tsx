import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className || ''}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function CardHeader({ title, subtitle, children }: CardHeaderProps) {
  return (
    <div className="mb-6">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      )}
      {subtitle && (
        <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
      )}
      {children}
    </div>
  );
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function CardBody({ children, className }: CardBodyProps) {
  return (
    <div className={`space-y-4 ${className || ''}`}>
      {children}
    </div>
  );
}
