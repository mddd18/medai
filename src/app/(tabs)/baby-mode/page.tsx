// src/app/(tabs)/baby-mode/page.tsx
// =====================================================
// Baby Mode — tinch tovushlar, timer va o'yinlar
// =====================================================
'use client';

import { useState } from 'react';
import { useDMedSync } from '@/hooks/useDMedSync';

import { TopBar } from '@/components/layout/TopBar';
import { AnimatedScene } from '@/components/baby-mode/AnimatedScene';
import { SoundPlayer } from '@/components/baby-mode/SoundPlayer';
import { MassageTimer } from '@/components/baby-mode/MassageTimer';
import { BubbleGame } from '@/components/baby-mode/BubbleGame';
import { ColorTap } from '@/components/baby-mode/ColorTap';
import { Toast } from '@/components/ui/Toast';

type Game = 'bubble' | 'color' | null;

export default function BabyModePage() {
  const { data: dmedData } = useDMedSync();
  const [activeGame, setActiveGame] = useState<Game>(null);
  const [toast, setToast] = useState({ show: false, msg: '' });

  const handleTimerComplete = () => {
    setToast({ show: true, msg: 'Massaj seansi tugadi! 🌿' });
  };

  return (
    <>
      <TopBar patient={dmedData?.patient} />

      <div className="mb-3 flex items-end justify-between px-5 pt-2">
        <h2 className="font-serif text-[22px] font-medium leading-tight tracking-tight text-stone-900">
          Baby <em className="text-stone-500">mode</em>
        </h2>
        <span className="text-[12px] text-stone-500">Massaj uchun</span>
      </div>

      {/* Calming animated scene */}
      <div className="mx-4 mb-3">
        <AnimatedScene />
      </div>

      {/* Sound + Timer */}
      <div className="mx-4 mb-4 rounded-3xl border border-stone-900/10 bg-white p-4">
        <div className="mb-3">
          <h3 className="font-serif text-[18px] font-medium">Tinchlantiruvchi tovushlar</h3>
          <p className="text-[11.5px] text-stone-500">Massaj davomida bola tinchlanadi</p>
        </div>
        <SoundPlayer />
        <div className="mt-4">
          <MassageTimer onComplete={handleTimerComplete} />
        </div>
      </div>

      {/* Mini games */}
      <div className="mb-3 flex items-end justify-between px-5">
        <h2 className="font-serif text-[20px] font-medium leading-tight tracking-tight text-stone-900">
          Mini <em className="text-stone-500">o'yinlar</em>
        </h2>
        <span className="text-[12px] text-stone-500">Bolani chalg'itish</span>
      </div>

      <div className="mx-4 grid grid-cols-2 gap-2 pb-4">
        <button
          onClick={() => setActiveGame('bubble')}
          className="flex flex-col items-center gap-1.5 rounded-2xl border border-stone-900/10 bg-white p-4 text-center active:scale-[0.97]"
        >
          <span className="text-[30px] leading-none">🫧</span>
          <span className="text-[13px] font-bold">Pufakcha</span>
          <span className="text-[10.5px] leading-tight text-stone-500">Pufaklarni bosib yorish</span>
        </button>
        <button
          onClick={() => setActiveGame('color')}
          className="flex flex-col items-center gap-1.5 rounded-2xl border border-stone-900/10 bg-white p-4 text-center active:scale-[0.97]"
        >
          <span className="text-[30px] leading-none">🎨</span>
          <span className="text-[13px] font-bold">Rang-Tap</span>
          <span className="text-[10.5px] leading-tight text-stone-500">Ranglarni topib bosing</span>
        </button>
      </div>

      {activeGame === 'bubble' && <BubbleGame onClose={() => setActiveGame(null)} />}
      {activeGame === 'color' && <ColorTap onClose={() => setActiveGame(null)} />}

      <Toast
        show={toast.show}
        message={toast.msg}
        onHide={() => setToast({ show: false, msg: '' })}
      />
    </>
  );
}
