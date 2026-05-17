import React from "react";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";

interface AlertProps {
  type?: "success" | "error" | "info" | "warning";
  title?: string;
  message: string;
  className?: string;
  onClose?: () => void;
}

export function Alert({
  type = "info",
  title,
  message,
  className,
  onClose,
}: AlertProps) {
  const styles = {
    success: {
      container:
        "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
      text: "text-green-900 dark:text-green-200",
      icon: "text-green-600 dark:text-green-400",
    },
    error: {
      container:
        "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
      text: "text-red-900 dark:text-red-200",
      icon: "text-red-600 dark:text-red-400",
    },
    info: {
      container:
        "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
      text: "text-blue-900 dark:text-blue-200",
      icon: "text-blue-600 dark:text-blue-400",
    },
    warning: {
      container:
        "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800",
      text: "text-amber-900 dark:text-amber-200",
      icon: "text-amber-600 dark:text-amber-400",
    },
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 flex-shrink-0" />,
    info: <Info className="w-5 h-5 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 flex-shrink-0" />,
  };

  const style = styles[type];

  return (
    <div
      className={`border rounded-lg p-4 flex items-start gap-3 animate-fade-in transition-smooth ${style.container} ${style.text} ${className || ""}`}
    >
      <div className={style.icon}>{icons[type]}</div>
      <div className="flex-1 min-w-0">
        {title && <h4 className="font-semibold mb-1">{title}</h4>}
        <p className={title ? "text-sm" : "text-sm"}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`flex-shrink-0 hover:opacity-60 transition-opacity ${style.icon}`}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
