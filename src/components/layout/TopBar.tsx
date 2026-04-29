// src/components/layout/TopBar.tsx
'use client';

import { Heart } from 'lucide-react';
import type { Patient } from '@/types';

interface Props {
  patient?: Patient | null;
}

export function TopBar({ patient }: Props) {
  return (
    <header className="flex items-start justify-between px-5 pb-2 pt-4">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 via-rose-400 to-rose-500 shadow-md shadow-orange-300/40">
          <Heart size={17} className="fill-white text-white" />
        </div>
        <div className="leading-none">
          <div className="font-serif text-[16px] font-semibold italic tracking-tight text-stone-900">
            Sog'lomBola
          </div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-500">
            AI · Pediatriya
          </div>
        </div>
      </div>

      {patient && (
        <div className="flex items-center gap-2 rounded-full border border-stone-900/10 bg-white/70 py-1.5 pl-3 pr-1.5 text-[12px] font-semibold backdrop-blur-sm">
          <span className="text-stone-700">{patient.fullName.split(' ')[0]}</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-purple-500 text-[11px] font-bold text-white">
            {patient.fullName[0]}
          </div>
        </div>
      )}
    </header>
  );
}
