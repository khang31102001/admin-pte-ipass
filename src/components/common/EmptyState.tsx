import React from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
      {icon && <div className="mb-3 text-3xl text-gray-400">{icon}</div>}

      <p className="text-sm font-medium text-gray-600">{title}</p>

      {description && (
        <p className="mt-1 max-w-md text-xs text-gray-500">
          {description}
        </p>
      )}

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
