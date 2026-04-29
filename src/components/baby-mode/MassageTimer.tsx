// src/components/baby-mode/MassageTimer.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

interface Props {
  onComplete?: () => void;
}

export function MassageTimer({ onComplete }: Props) {
  const [seconds, setSeconds] = useState(15 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const setPreset = (min: number) => {
    if (running) return;
    setSeconds(min * 60);
  };

  const toggle = () => {
    if (running) {
      setRunning(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      if (seconds === 0) setSeconds(15 * 60);
      setRunning(true);
      intervalRef.current = window.setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setRunning(false);
            onComplete?.();
            if (typeof navigator !== 'undefined' && navigator.vibrate) {
              navigator.vibrate([200, 100, 200]);
            }
            return 15 * 60;
          }
          return s - 1;
        });
      }, 1000);
    }
  };

  return (
    <div className="flex items-center justify-between border-t border-stone-100 pt-3.5">
      <div>
        <div className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-stone-500">
          Massaj timeri
        </div>
        <div className="font-serif text-[30px] font-medium tabular-nums leading-none tracking-tight">
          {fmt(seconds)}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {[5, 10, 15].map(min => (
          <button
            key={min}
            onClick={() => setPreset(min)}
            disabled={running}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-amber-50/70 text-[11px] font-bold text-stone-600 disabled:opacity-50"
          >
            {min}m
          </button>
        ))}
        <button
          onClick={toggle}
          aria-label={running ? "Pauza" : "O'ynatish"}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg shadow-orange-300/40 active:scale-90"
        >
          {running ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
        </button>
      </div>
    </div>
  );
}
