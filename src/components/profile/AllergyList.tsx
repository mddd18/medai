// src/components/profile/AllergyList.tsx
import type { Allergy } from '@/types';
import { AlertTriangle } from 'lucide-react';

interface Props {
  allergies: Allergy[];
}

const SEV_STYLES = {
  high: { bg: 'bg-orange-100/60', icon: 'text-orange-700', badge: 'bg-orange-600 text-white', label: 'Yuqori' },
  medium: { bg: 'bg-amber-100/60', icon: 'text-amber-700', badge: 'bg-amber-200 text-amber-900', label: "O'rta" },
  low: { bg: 'bg-emerald-100/60', icon: 'text-emerald-700', badge: 'bg-emerald-200 text-emerald-800', label: 'Past' },
} as const;

export function AllergyList({ allergies }: Props) {
  if (!allergies.length) {
    return <p className="text-center text-[12px] text-stone-500">Allergiyalar qayd etilmagan</p>;
  }

  return (
    <div className="space-y-2">
      {allergies.map(a => {
        const style = SEV_STYLES[a.severity];
        return (
          <div key={a.id} className={`flex items-center gap-2.5 rounded-xl ${style.bg} p-2.5`}>
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/70">
              <AlertTriangle size={14} className={style.icon} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-bold">{a.substance}</div>
              <div className="text-[11px] text-stone-500">{a.reaction}</div>
            </div>
            <span className={`rounded-md px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider ${style.badge}`}>
              {style.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
