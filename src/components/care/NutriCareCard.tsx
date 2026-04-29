// src/components/care/NutriCareCard.tsx
'use client';

import type { NutriCareAdvice } from '@/types';
import { Sparkles, ChevronRight, Droplets } from 'lucide-react';
import { useState } from 'react';

interface Props {
  advice: NutriCareAdvice;
}

export function NutriCareCard({ advice }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mx-4 mt-4 overflow-hidden rounded-3xl border border-stone-900/10 bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50/50 to-amber-50/40 p-5">
        <div className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-700">
          <Sparkles size={12} />
          AI Nutri-Care · Bugun uchun
        </div>
        <h2 className="font-serif text-[20px] font-medium leading-tight tracking-tight text-stone-900">
          Davolanishni qo'llab-quvvatlovchi <em className="text-emerald-700">ovqat ratsioni</em>
        </h2>
        <p className="mt-2 text-[13px] leading-snug text-stone-600">
          {advice.reasoning}
        </p>
      </div>

      {/* Suv me'yori */}
      <div className="flex items-center justify-between border-t border-stone-100 bg-sky-50/40 px-5 py-3">
        <div className="flex items-center gap-2">
          <Droplets size={16} className="text-sky-600" />
          <span className="text-[13px] font-semibold text-stone-700">Bugungi suv me'yori</span>
        </div>
        <span className="font-serif text-[16px] font-semibold text-sky-700">
          {advice.hydrationGoalMl} ml
        </span>
      </div>

      {/* Tavsiya etilgan ovqatlar */}
      <div className="border-t border-stone-100 p-5">
        <h3 className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Mumkin va foydali
        </h3>
        <div className="space-y-2">
          {advice.recommendedFoods.slice(0, expanded ? undefined : 2).map((f) => (
            <div key={f.name} className="flex items-start gap-3 rounded-xl bg-emerald-50/40 p-3">
              <span className="text-2xl leading-none">{f.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-semibold text-stone-900">{f.name}</div>
                <div className="mt-0.5 text-[12px] leading-snug text-stone-600">{f.reason}</div>
                <div className="mt-1 text-[11px] font-medium text-emerald-700">
                  {f.servingSize} · {f.bestTime === 'morning' ? 'Ertalab' : f.bestTime === 'noon' ? 'Tushda' : f.bestTime === 'evening' ? 'Kechqurun' : 'Istalgan vaqt'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mumkin emas */}
      <div className="border-t border-stone-100 p-5">
        <h3 className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-rose-700">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
          Hozircha mumkin emas
        </h3>
        <div className="space-y-2">
          {advice.forbiddenFoods.slice(0, expanded ? undefined : 2).map((f) => (
            <div key={f.name} className="flex items-start gap-3 rounded-xl bg-rose-50/40 p-3">
              <span className="text-2xl leading-none">{f.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="text-[13.5px] font-semibold text-stone-900">{f.name}</div>
                <div className="mt-0.5 text-[12px] leading-snug text-stone-600">{f.reason}</div>
                {f.withMedicine && (
                  <div className="mt-1 inline-block rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-700">
                    {f.withMedicine} bilan
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vitaminlar */}
      {advice.supplementaryVitamins.length > 0 && (
        <div className="border-t border-stone-100 p-5">
          <h3 className="mb-3 flex items-center gap-2 text-[13px] font-bold uppercase tracking-wider text-amber-700">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            AI tavsiya etgan qo'shimchalar
          </h3>
          <div className="space-y-2">
            {advice.supplementaryVitamins.map((v) => (
              <div key={v.name} className="flex items-center justify-between rounded-xl bg-amber-50/50 p-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[13.5px] font-semibold text-stone-900">{v.name}</span>
                    {v.priority === 'must' && (
                      <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                        Shart
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-[12px] leading-snug text-stone-600">{v.reason}</div>
                </div>
                <div className="ml-2 font-serif text-[12.5px] italic text-amber-700">{v.dosage}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-center gap-1 border-t border-stone-100 bg-stone-50/50 py-3 text-[12px] font-semibold text-stone-600 transition hover:bg-stone-100/50"
      >
        {expanded ? 'Yashirish' : 'To\'liq ratsionni ko\'rish'}
        <ChevronRight size={14} className={`transition ${expanded ? 'rotate-90' : ''}`} />
      </button>
    </div>
  );
}
