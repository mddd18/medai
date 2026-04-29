// src/components/ui/Skeleton.tsx
export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-gradient-to-r from-stone-200/60 via-stone-200 to-stone-200/60 bg-[length:200%_100%] ${className}`}
      style={{ animation: 'shimmer 1.6s ease-in-out infinite' }}
    />
  );
}

export function CareSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="mx-4 h-44 rounded-3xl" />
      <Skeleton className="mx-4 h-16" />
      <div className="space-y-2 px-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-20" />
        ))}
      </div>
    </div>
  );
}
