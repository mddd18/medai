// src/components/insights/RiskGauge.tsx
'use client';

import type { RiskItem } from '@/types';
import { AlertTriangle, Clock, TrendingDown, Lightbulb } from 'lucide-react';

interface Props {
  risk: RiskItem;
}

const ICON_MAP = {
  resistance: AlertTriangle,
  relapse: Clock,
  complication: TrendingDown,
  malnutrition: TrendingDown,
} as const;

const LEVEL_STYLES = {
  critical: {
    iconBg: 'bg-red-200/70',
    iconColor: 'text-red-800',
    probColor: 'text-red-800',
    border: 'border-red-300/40',
  },
  high: {
    iconBg: 'bg-orange-200/60',
    iconColor: 'text-orange-700',
    probColor: 'text-orange-700',
    border: 'border-orange-200/50',
  },
  medium: {
    iconBg: 'bg-amber-200/60',
    iconColor: 'text-amber-700',
    probColor: 'text-amber-700',
    border: 'border-amber-200/50',
  },
  low: {
    iconBg: 'bg-emerald-200/60',
    iconColor: 'text-emerald-700',
    probColor: 'text-emerald-700',
    border: 'border-emerald-200/50',
  },
} as const;

export function RiskGauge({ risk }: Props) {
  const Icon = ICON_MAP[risk.type] || AlertTriangle;
  const styles = LEVEL_STYLES[risk.level];

  return (
    <div className={`flex gap-3 rounded-2xl border ${styles.border} bg-white p-3.5`}>
      <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${styles.iconBg}`}>
        <Icon size={17} className={styles.iconColor} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-[13.5px] font-bold text-stone-900">{risk.title}</h3>
          <span className={`font-serif text-[13px] font-medium italic ${styles.probColor}`}>
            {risk.probabilityPct}%
          </span>
        </div>

        <p className="mt-0.5 text-[11.5px] leading-relaxed text-stone-500">
          {risk.description}
        </p>

        {risk.triggeredBy.length > 0 && (
          <div className="mt-1.5 text-[10.5px] leading-relaxed text-stone-500">
            <span className="font-bold text-stone-600">Sabablar:</span>{' '}
            {risk.triggeredBy.slice(0, 2).join(', ')}
          </div>
        )}

        <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-stone-100/70 px-2.5 py-2 text-[11.5px] font-medium leading-snug text-stone-700">
          <Lightbulb size={11} className="mt-0.5 flex-shrink-0 text-orange-500" />
          <span>{risk.recommendation}</span>
        </div>
      </div>
    </div>
  );
}
