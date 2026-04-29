// src/components/care/HeroCard.tsx
'use client';

import type { Patient, Diagnosis } from '@/types';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface Props {
  patient: Patient;
  diagnosis: Diagnosis;
  completedTasks: number;
  totalTasks: number;
}

export function HeroCard({ patient, diagnosis, completedTasks, totalTasks }: Props) {
  const firstName = patient.fullName.split(' ')[0];
  const dayOfTreatment = Math.floor(
    (Date.now() - new Date(diagnosis.diagnosedAt).getTime()) / (1000 * 60 * 60 * 24)
  ) + 1;

  return (
    <div className="relative mx-4 mt-2 overflow-hidden rounded-3xl border border-stone-900/10 bg-gradient-to-br from-amber-50 via-orange-50/60 to-rose-50/40 p-6 shadow-sm">
      {/* Dekorativ to'p */}
      <div className="pointer-events-none absolute -right-12 -top-10 h-44 w-44 rounded-full bg-gradient-to-br from-orange-300/40 to-rose-300/0 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-gradient-to-tr from-emerald-300/30 to-transparent blur-2xl" />

      {/* D-Med sinxron belgisi */}
      <div className="relative mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
        <CheckCircle2 size={13} className="text-emerald-600" />
        D-Med sinxron · {dayOfTreatment}-kun
      </div>

      <h1 className="relative font-serif text-[28px] font-medium leading-[1.1] tracking-tight text-stone-900">
        Assalomu alaykum,<br />
        <span className="italic text-orange-700">{patient.parentName.split(' ')[0]}</span> opa
      </h1>
      <p className="relative mt-2 text-sm text-stone-600">
        <span className="font-semibold text-stone-800">{firstName}</span> uchun bugungi reja:
      </p>

      {/* Statistika */}
      <div className="relative mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-stone-900/5 bg-white/70 p-3 backdrop-blur-sm">
          <div className="font-serif text-2xl font-semibold leading-none text-stone-900">
            {completedTasks}<span className="text-stone-400">/{totalTasks}</span>
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-wider text-stone-500">
            Bajarildi
          </div>
        </div>
        <div className="rounded-2xl border border-stone-900/5 bg-white/70 p-3 backdrop-blur-sm">
          <div className="flex items-center gap-1 font-serif text-2xl font-semibold leading-none text-stone-900">
            <Sparkles size={16} className="text-orange-500" />
            AI faol
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-wider text-stone-500">
            Tahlil yangi
          </div>
        </div>
      </div>
    </div>
  );
}
