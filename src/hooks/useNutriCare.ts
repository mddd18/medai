// src/hooks/useNutriCare.ts
'use client';

import { useEffect, useState } from 'react';
import { dmedClient } from '@/lib/dmed-client';
import type { NutriCareAdvice } from '@/types';

export function useNutriCare() {
  const [advice, setAdvice] = useState<NutriCareAdvice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await dmedClient.fetchNutriCare();
        if (!cancelled) setAdvice(data);
      } catch (e) {
        console.error('NutriCare error:', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { advice, loading };
}
