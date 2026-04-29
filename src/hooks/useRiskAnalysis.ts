// src/hooks/useRiskAnalysis.ts
'use client';

import { useEffect, useState } from 'react';
import { dmedClient } from '@/lib/dmed-client';
import type { DailyTask, RiskAnalysis } from '@/types';

export function useRiskAnalysis(tasks: DailyTask[]) {
  const [analysis, setAnalysis] = useState<RiskAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tasks.length === 0) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data = await dmedClient.fetchRiskAnalysis(tasks);
        if (!cancelled) setAnalysis(data);
      } catch (e) {
        console.error('Risk analysis error:', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [tasks]);

  return { analysis, loading };
}
