// src/hooks/useDMedSync.ts
'use client';

import { useEffect, useState } from 'react';
import { dmedClient } from '@/lib/dmed-client';
import type { Patient, Diagnosis, Allergy, Prescription, MassageProtocol } from '@/types';

interface DMedData {
  patient: Patient;
  diagnosis: Diagnosis;
  allergies: Allergy[];
  prescriptions: Prescription[];
  protocols: MassageProtocol[];
}

export function useDMedSync() {
  const [data, setData] = useState<DMedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const [patientRes, rxRes] = await Promise.all([
          dmedClient.fetchPatient(),
          dmedClient.fetchPrescriptions(),
        ]);
        if (cancelled) return;
        setData({
          patient: patientRes.patient,
          diagnosis: patientRes.diagnosis,
          allergies: patientRes.allergies,
          prescriptions: rxRes.prescriptions,
          protocols: rxRes.protocols,
        });
      } catch (e: any) {
        if (!cancelled) setError(e.message || 'D-Med sinxronizatsiyasi xatosi');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}
