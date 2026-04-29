// src/components/profile/LabResults.tsx
import type { LabResult } from '@/types';
import { ArrowUp, ArrowDown, Check } from 'lucide-react';

interface Props {
  results: LabResult[];
}

const STATUS_STYLES = {
  normal: { color: 'text-emerald-700', icon: Check },
  high: { color: 'text-orange-700', icon: ArrowUp },
  low: { color: 'text-amber-700', icon: ArrowDown },
  critical: { color: 'text-red-700', icon: ArrowUp },
} as const;

export function LabResults({ results }: Props) {
  return (
    <div className="space-y-2">
      {results.map(l => {
        const style = STATUS_STYLES[l.status];
        const Icon = style.icon;
        return (
          <div key={l.id} className="flex items-center justify-between rounded-xl bg-stone-50 p-2.5">
            <div className="min-w-0 flex-1">
              <div className="text-[12.5px] font-semibold">{l.testName}</div>
              <div className="text-[10.5px] text-stone-500">
                Norma: {l.normalRange} {l.unit || ''}
              </div>
            </div>
            <div className={`flex items-center gap-1.5 ${style.color}`}>
              <span className="font-serif text-[14px] font-semibold italic">
                {l.result} {l.unit || ''}
              </span>
              <Icon size={11} strokeWidth={3} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
