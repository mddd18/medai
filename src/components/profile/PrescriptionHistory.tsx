// src/components/profile/PrescriptionHistory.tsx
import type { Prescription } from '@/types';

interface Props {
  prescriptions: Prescription[];
}

const CAT_STYLES = {
  antibiotic: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Antibiotik' },
  vitamin: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'Vitamin' },
  probiotic: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Probiotik' },
  painkiller: { bg: 'bg-rose-100', text: 'text-rose-700', label: "Og'riq qoldiruvchi" },
  antiviral: { bg: 'bg-sky-100', text: 'text-sky-700', label: 'Virusga qarshi' },
  other: { bg: 'bg-stone-100', text: 'text-stone-700', label: 'Boshqa' },
} as const;

export function PrescriptionHistory({ prescriptions }: Props) {
  return (
    <div className="space-y-2">
      {prescriptions.map(p => {
        const style = CAT_STYLES[p.category] || CAT_STYLES.other;
        return (
          <div key={p.id} className="rounded-xl bg-stone-50 p-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="text-[13px] font-bold">{p.medicineName}</div>
                <div className="text-[10.5px] text-stone-500">{p.activeIngredient}</div>
              </div>
              <span className={`flex-shrink-0 rounded-md px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wider ${style.bg} ${style.text}`}>
                {style.label}
              </span>
            </div>
            <div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-stone-500">
              <span><b className="font-semibold text-stone-700">Doza:</b> {p.dosage}</span>
              <span><b className="font-semibold text-stone-700">Vaqtlar:</b> {p.timesOfDay.join(', ')}</span>
              <span className="font-bold text-stone-700">{p.durationDays} kun</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
