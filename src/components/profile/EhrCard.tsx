// src/components/profile/EhrCard.tsx
'use client';

interface Props {
  icon: React.ReactNode;
  title: string;
  badge?: string | number;
  badgeColor?: 'emerald' | 'amber' | 'orange';
  children: React.ReactNode;
}

const BADGE_COLORS = {
  emerald: 'bg-emerald-100 text-emerald-700',
  amber: 'bg-amber-100 text-amber-700',
  orange: 'bg-orange-100 text-orange-700',
} as const;

export function EhrCard({ icon, title, badge, badgeColor = 'emerald', children }: Props) {
  return (
    <div className="mx-4 mb-3 overflow-hidden rounded-2xl border border-stone-900/10 bg-white">
      <div className="flex items-center justify-between border-b border-stone-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-orange-700">{icon}</span>
          <h4 className="font-serif text-[15px] font-medium">{title}</h4>
        </div>
        {badge !== undefined && (
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide ${BADGE_COLORS[badgeColor]}`}>
            {badge}
          </span>
        )}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
