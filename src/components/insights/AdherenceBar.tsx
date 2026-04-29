// src/components/insights/AdherenceBar.tsx
'use client';

import { useEffect, useState } from 'react';

interface Props {
  percentage: number;
}

export function AdherenceBar({ percentage }: Props) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(percentage), 200);
    return () => clearTimeout(t);
  }, [percentage]);

  const help =
    percentage >= 85
      ? 'Ajoyib natija! Shu tartibda davom eting.'
      : percentage >= 60
      ? "Yaxshi, lekin ba'zi vazifalar o'tkazib yuborilmoqda."
      : "Diqqat! Bajarish darajasi past — asoratlar xavfi oshmoqda.";

  return (
    <div className="mx-4 mb-3 rounded-2xl border border-stone-900/10 bg-white p-4">
      <div className="mb-2 flex items-center justify-between text-[11.5px] font-semibold">
        <span>Vazifalar bajarish darajasi</span>
        <span className="font-serif text-[16px] italic text-orange-700">{percentage}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-stone-200/60">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-600 transition-[width] duration-[1200ms] ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
      <p className="mt-2 text-[11px] leading-snug text-stone-500">{help}</p>
    </div>
  );
}
