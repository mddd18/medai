// src/hooks/useLabResults.ts
'use client';

import { useEffect, useState } from 'react';
import { dmedClient } from '@/lib/dmed-client';
import type { LabResult } from '@/types';

export function useLabResults() {
  const [results, setResults] = useState<LabResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await dmedClient.fetchLabResults();
        if (!cancelled) setResults(data);
      } catch (e) {
        console.error('Lab error', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { results, loading };
}
