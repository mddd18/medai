// src/app/(tabs)/profile/page.tsx
// =====================================================
// Profile / EHR — D-Med tibbiy varaqasi
// =====================================================
'use client';

import { useDMedSync } from '@/hooks/useDMedSync';
import { useLabResults } from '@/hooks/useLabResults';

import { TopBar } from '@/components/layout/TopBar';
import { PatientHeader } from '@/components/profile/PatientHeader';
import { EhrCard } from '@/components/profile/EhrCard';
import { DiagnosisCard } from '@/components/profile/DiagnosisCard';
import { AllergyList } from '@/components/profile/AllergyList';
import { LabResults } from '@/components/profile/LabResults';
import { PrescriptionHistory } from '@/components/profile/PrescriptionHistory';
import { CareSkeleton } from '@/components/ui/Skeleton';

import { FileText, AlertTriangle, FlaskConical, Pill } from 'lucide-react';

export default function ProfilePage() {
  const { data: dmedData, loading } = useDMedSync();
  const { results: labs } = useLabResults();

  if (loading || !dmedData) {
    return (
      <>
        <TopBar />
        <CareSkeleton />
      </>
    );
  }

  return (
    <>
      <TopBar patient={dmedData.patient} />

      <div className="mb-3 flex items-end justify-between px-5 pt-2">
        <h2 className="font-serif text-[22px] font-medium leading-tight tracking-tight text-stone-900">
          Tibbiy <em className="text-stone-500">kartochka</em>
        </h2>
        <span className="text-[12px] text-stone-500">D-Med EHR</span>
      </div>

      <PatientHeader patient={dmedData.patient} />

      <EhrCard
        icon={<FileText size={16} />}
        title="Asosiy tashxis"
        badge="Faol"
        badgeColor="emerald"
      >
        <DiagnosisCard diagnosis={dmedData.diagnosis} />
      </EhrCard>

      <EhrCard
        icon={<AlertTriangle size={16} />}
        title="Allergiyalar"
        badge={dmedData.allergies.length}
        badgeColor="orange"
      >
        <AllergyList allergies={dmedData.allergies} />
      </EhrCard>

      <EhrCard
        icon={<FlaskConical size={16} />}
        title="Tahlil natijalari"
        badge="Yangi"
        badgeColor="amber"
      >
        <LabResults results={labs} />
      </EhrCard>

      <EhrCard
        icon={<Pill size={16} />}
        title="E-Retseptlar"
        badge={dmedData.prescriptions.length}
        badgeColor="orange"
      >
        <PrescriptionHistory prescriptions={dmedData.prescriptions} />
      </EhrCard>
    </>
  );
}
