import React from "react";

interface SkeletonProps {
  className?: string;
  count?: number;
}

export function Skeleton({
  className = "h-4 w-full",
  count = 1,
}: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`
            bg-neutral-200 dark:bg-neutral-800
            rounded-md
            animate-pulse
            ${i > 0 ? "mt-2" : ""}
            ${className}
          `}
        />
      ))}
    </>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-card p-6 animate-pulse">
      <Skeleton className="h-6 w-40 mb-4" />
      <Skeleton className="h-4 w-full" count={3} />
      <div className="mt-6 flex gap-2">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>
    </div>
  );
}

export function SkeletonGrid({
  columns = 3,
  count = 6,
}: {
  columns?: number;
  count?: number;
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
