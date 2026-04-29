// src/components/care/RiskInlineBanner.tsx
'use client';

import type { RiskAnalysis } from '@/types';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Props {
  analysis: RiskAnalysis;
}

export function RiskInlineBanner({ analysis }: Props) {
  const topRisk = analysis.risks[0];
  if (!topRisk || topRisk.level === 'low') return null;

  const colors = {
    medium: {
      bg: 'from-amber-50 to-orange-50',
      border: 'border-amber-300/60',
      iconBg: 'bg-amber-200',
      iconColor: 'text-amber-700',
      text: 'text-amber-900',
      pct: 'text-amber-700',
    },
    high: {
      bg: 'from-orange-50 to-rose-50',
      border: 'border-orange-300/60',
      iconBg: 'bg-orange-200',
      iconColor: 'text-orange-700',
      text: 'text-orange-900',
      pct: 'text-orange-700',
    },
    critical: {
      bg: 'from-rose-100 to-red-50',
      border: 'border-rose-400/60',
      iconBg: 'bg-rose-300',
      iconColor: 'text-rose-800',
      text: 'text-rose-900',
      pct: 'text-rose-700',
    },
  }[topRisk.level === 'low' ? 'medium' : topRisk.level];

  return (
    <Link
      href="/insights"
      className={`mx-4 mt-4 flex items-center gap-3 rounded-2xl border ${colors.border} bg-gradient-to-r ${colors.bg} p-4 transition active:scale-[0.99]`}
    >
      <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl ${colors.iconBg}`}>
        <AlertTriangle size={20} className={colors.iconColor} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className={`text-[10px] font-bold uppercase tracking-[0.14em] ${colors.text}`}>
            AI ogohlantirish
          </span>
          <span className={`font-serif text-[13px] font-bold italic ${colors.pct}`}>
            {topRisk.probabilityPct}%
          </span>
        </div>
        <h4 className={`mt-0.5 text-[14px] font-bold ${colors.text}`}>{topRisk.title}</h4>
        <p className={`mt-0.5 text-[12px] leading-snug ${colors.text} opacity-80`}>
          {topRisk.recommendation}
        </p>
      </div>
      <ChevronRight size={18} className={colors.iconColor} />
    </Link>
  );
}
