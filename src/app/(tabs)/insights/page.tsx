// src/app/(tabs)/insights/page.tsx
// =====================================================
// AI Insights — Davolanish dinamikasi va xavf tahlili
// =====================================================
'use client';

import { useDMedSync } from '@/hooks/useDMedSync';
import { useTasks } from '@/hooks/useTasks';
import { useRiskAnalysis } from '@/hooks/useRiskAnalysis';

import { TopBar } from '@/components/layout/TopBar';
import { ProgressRing } from '@/components/insights/ProgressRing';
import { RiskGauge } from '@/components/insights/RiskGauge';
import { TrendChart } from '@/components/insights/TrendChart';
import { AdherenceBar } from '@/components/insights/AdherenceBar';
import { CareSkeleton } from '@/components/ui/Skeleton';

import { Sparkles } from 'lucide-react';

export default function InsightsPage() {
  const { data: dmedData, loading: dmedLoading } = useDMedSync();
  const { tasks } = useTasks();
  const { analysis } = useRiskAnalysis(tasks);

  if (dmedLoading || !dmedData || !analysis) {
    return (
      <>
        <TopBar />
        <CareSkeleton />
      </>
    );
  }

  // Mock 7-day adherence for trend chart
  const trendData = [62, 71, 88, 79, 92, 65, analysis.adherenceRate];

  return (
    <>
      <TopBar patient={dmedData.patient} />

      <section className="mt-2">
        <div className="mb-3 flex items-end justify-between px-5">
          <h2 className="font-serif text-[22px] font-medium leading-tight tracking-tight text-stone-900">
            AI <em className="text-stone-500">tahlil</em>
          </h2>
          <span className="text-[12px] text-stone-500">Real vaqt</span>
        </div>

        {/* Progress card */}
        <div className="mx-4 rounded-3xl border border-stone-900/10 bg-gradient-to-b from-orange-50/60 to-white p-6">
          <div className="text-center">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
              {analysis.daysCompleted} kun davolandi
            </div>
            <h3 className="mt-1 font-serif text-[21px] font-medium tracking-tight">
              Davolanish dinamikasi
            </h3>
          </div>

          <div className="mt-3 flex justify-center">
            <ProgressRing percentage={analysis.overallTreatmentProgress} />
          </div>

          {/* Meta tiles */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-amber-50/70 p-2.5 text-center">
              <div className="font-serif text-[17px] font-semibold leading-none">{analysis.daysCompleted}</div>
              <div className="mt-1 text-[9.5px] font-semibold uppercase tracking-wider text-stone-500">Tugagan kun</div>
            </div>
            <div className="rounded-xl bg-amber-50/70 p-2.5 text-center">
              <div className="font-serif text-[17px] font-semibold leading-none">{analysis.daysRemaining}</div>
              <div className="mt-1 text-[9.5px] font-semibold uppercase tracking-wider text-stone-500">Qolgan kun</div>
            </div>
            <div className="rounded-xl bg-amber-50/70 p-2.5 text-center">
              <div className="font-serif text-[17px] font-semibold leading-none">{analysis.adherenceRate}%</div>
              <div className="mt-1 text-[9.5px] font-semibold uppercase tracking-wider text-stone-500">Bajarildi</div>
            </div>
          </div>
        </div>

        <div className="h-3" />

        <AdherenceBar percentage={analysis.adherenceRate} />

        {/* AI summary */}
        <div className="relative mx-4 mb-3 overflow-hidden rounded-2xl border border-orange-200/50 bg-gradient-to-br from-orange-50 to-rose-50 p-4 pl-5">
          <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-orange-500" />
          <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-orange-700">
            <Sparkles size={11} className="animate-pulse" />
            AI Xulosasi · Hozirgina
          </div>
          <p className="text-[12.5px] leading-relaxed text-stone-700">
            {analysis.aiSummary}
          </p>
        </div>

        <TrendChart data={trendData} todayAdherence={analysis.adherenceRate} />

        {/* Risks */}
        <div className="mt-4 mb-3 flex items-end justify-between px-5">
          <h2 className="font-serif text-[20px] font-medium leading-tight tracking-tight text-stone-900">
            Asoratlar <em className="text-stone-500">xavfi</em>
          </h2>
          <span className="text-[12px] text-stone-500">AI hisoblovi</span>
        </div>

        <div className="space-y-2 px-4 pb-4">
          {analysis.risks.map((r) => (
            <RiskGauge key={r.id} risk={r} />
          ))}
        </div>
      </section>
    </>
  );
}
