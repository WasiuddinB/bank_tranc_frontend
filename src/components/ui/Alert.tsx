import React from 'react';

interface AlertProps {
  type?: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  className?: string;
  onClose?: () => void;
}

export function Alert({
  type = 'info',
  title,
  message,
  className,
  onClose,
}: AlertProps) {
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  };

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠',
  };

  return (
    <div
      className={`border rounded-lg p-4 flex items-start gap-3 ${styles[type]} ${className || ''}`}
    >
      <span className="text-lg font-bold mt-0.5">{icons[type]}</span>
      <div className="flex-1">
        {title && (
          <h4 className="font-semibold">{title}</h4>
        )}
        <p className={title ? 'text-sm mt-1' : ''}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-current hover:opacity-70 transition-opacity"
        >
          ✕
        </button>
      )}
    </div>
  );
}
