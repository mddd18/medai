// src/components/ui/Toast.tsx
'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  message: string;
  show: boolean;
  onHide: () => void;
}

export function Toast({ message, show, onHide }: Props) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onHide, 2500);
    return () => clearTimeout(t);
  }, [show, onHide]);

  return (
    <div
      className={`
        pointer-events-none fixed bottom-24 left-1/2 z-[200] flex -translate-x-1/2 items-center gap-2 rounded-full bg-stone-900 px-4 py-2.5 text-[13px] font-medium text-amber-50 shadow-xl transition-all duration-300
        ${show ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}
      `}
    >
      <CheckCircle2 size={15} className="text-emerald-400" />
      <span>{message}</span>
    </div>
  );
}
