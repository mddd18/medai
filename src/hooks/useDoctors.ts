// src/hooks/useDoctors.ts
'use client';

import { useEffect, useState } from 'react';
import { dmedClient } from '@/lib/dmed-client';
import type { Doctor } from '@/types';

export function useDoctors(filters: { type?: string; search?: string }) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data = await dmedClient.fetchDoctors(filters);
        if (!cancelled) setDoctors(data);
      } catch (e) {
        console.error('Doctors error', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [filters.type, filters.search]);

  return { doctors, loading };
}
