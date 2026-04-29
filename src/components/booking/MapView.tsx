// src/components/booking/MapView.tsx
'use client';

import type { Doctor } from '@/types';
import { Sparkles } from 'lucide-react';

interface Props {
  doctors: Doctor[];
  onPinClick: (doctorId: string) => void;
}

export function MapView({ doctors, onPinClick }: Props) {
  // Mock map: doctorlar pinlarini avtomatik joylashtirish
  const positions = [
    { left: '30%', top: '35%' },
    { left: '65%', top: '30%' },
    { left: '75%', top: '55%' },
    { left: '25%', top: '65%' },
    { left: '55%', top: '50%' },
  ];

  return (
    <div
      className="relative mx-4 mb-3 h-40 overflow-hidden rounded-2xl border border-stone-900/10"
      style={{
        backgroundImage:
          'repeating-linear-gradient(45deg,transparent 0 18px,rgba(122,139,111,0.07) 18px 20px),linear-gradient(180deg,#E8E0D0,#DCD2BD)',
      }}
    >
      {/* AI matchmaking tag */}
      <div className="absolute left-2.5 top-2.5 z-10 flex items-center gap-1.5 rounded-full bg-stone-900 px-2.5 py-1 text-[10px] font-bold text-amber-50">
        <Sparkles size={11} className="text-amber-400" />
        AI tashxisga moslashtirilgan
      </div>

      {/* User pin */}
      <div
        className="absolute h-7 w-7 -translate-x-1/2 -translate-y-full rounded-tl-full rounded-tr-full rounded-br-full border-[3px] border-stone-50 bg-sky-500 shadow-lg"
        style={{ left: '50%', top: '60%', transform: 'translate(-50%, -100%) rotate(-45deg)' }}
      >
        <div className="absolute inset-1.5 rounded-full bg-stone-50" />
      </div>

      {/* Doctor pins */}
      {doctors.slice(0, 4).map((doc, i) => (
        <button
          key={doc.id}
          onClick={() => onPinClick(doc.id)}
          aria-label={doc.fullName}
          className="absolute h-7 w-7 -translate-x-1/2 -translate-y-full rounded-tl-full rounded-tr-full rounded-br-full border-[3px] border-stone-50 bg-orange-600 shadow-lg transition-transform hover:scale-110"
          style={{ ...positions[i], transform: 'translate(-50%, -100%) rotate(-45deg)' }}
        >
          <div className="absolute inset-1.5 rounded-full bg-stone-50" />
        </button>
      ))}
    </div>
  );
}
