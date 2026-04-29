// src/components/profile/PatientHeader.tsx
'use client';

import type { Patient } from '@/types';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  patient: Patient;
}

export function PatientHeader({ patient }: Props) {
  const initials = patient.fullName.split(' ').map(s => s[0]).slice(0, 2).join('');
  const ageStr = `${patient.ageMonths} oylik · ${patient.gender === 'female' ? 'qiz bola' : "o'g'il bola"}`;

  return (
    <div className="relative mx-4 mb-3 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 to-emerald-700 p-5 text-emerald-50">
      <div className="pointer-events-none absolute -right-12 -top-12 h-50 w-50 rounded-full bg-orange-400/20 blur-3xl" />

      <div className="relative flex items-center gap-3">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-[3px] border-white/20 bg-gradient-to-br from-amber-400 to-orange-600 font-serif text-[24px] font-semibold text-white">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-[20px] font-semibold tracking-tight">
            {patient.fullName}
          </h3>
          <div className="text-[12px] opacity-80">{ageStr}</div>
        </div>
      </div>

      <div className="relative mt-4 grid grid-cols-3 gap-2">
        <Stat value={patient.weightKg} unit="kg" label="Vazn" />
        <Stat value={patient.heightCm} unit="sm" label="Bo'y" />
        <Stat value={patient.bloodType || '—'} label="Qon guruhi" />
      </div>

      <div className="relative mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10.5px] font-semibold">
        <CheckCircle2 size={11} className="text-emerald-300" />
        D-Med ID: {patient.dmedId}
      </div>
    </div>
  );
}

function Stat({ value, unit, label }: { value: string | number; unit?: string; label: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/8 p-2 text-center backdrop-blur-sm">
      <div className="font-serif text-[15px] font-semibold leading-none">
        {value}
        {unit && <small className="ml-0.5 text-[10px] font-normal">{unit}</small>}
      </div>
      <div className="mt-1 text-[9.5px] font-bold uppercase tracking-wider opacity-70">
        {label}
      </div>
    </div>
  );
}
