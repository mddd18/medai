// src/components/profile/DiagnosisCard.tsx
import type { Diagnosis } from '@/types';

interface Props {
  diagnosis: Diagnosis;
}

export function DiagnosisCard({ diagnosis }: Props) {
  const sevLabel = {
    mild: 'Yengil',
    moderate: "O'rta",
    severe: "Og'ir"
  }[diagnosis.severity];

  return (
    <>
      <div className="font-serif text-[17px] font-semibold">{diagnosis.name}</div>
      <div className="text-[11px] font-semibold tracking-wide text-stone-500">
        ICD-10: {diagnosis.code} · {sevLabel} kechishda
      </div>
      <div className="mt-1.5 text-[11.5px] text-stone-600">
        👨‍⚕️ {diagnosis.doctorName} · {diagnosis.hospital}
      </div>
    </>
  );
}
