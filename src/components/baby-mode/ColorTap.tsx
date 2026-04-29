// src/components/baby-mode/ColorTap.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface Props {
  onClose: () => void;
}

const COLORS = [
  { name: 'Qizil', value: '#E89B8B' },
  { name: 'Sariq', value: '#F4B572' },
  { name: 'Yashil', value: '#7A8B6F' },
  { name: "Ko'k", value: '#7BA8C4' },
];

export function ColorTap({ onClose }: Props) {
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState(COLORS[0]);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [shake, setShake] = useState<number | null>(null);
  const areaRef = useRef<HTMLDivElement>(null);

  const setupRound = () => {
    const newTarget = COLORS[Math.floor(Math.random() * COLORS.length)];
    setTarget(newTarget);

    // Random positions
    const area = areaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const newPositions: { x: number; y: number }[] = [];
    for (let i = 0; i < COLORS.length; i++) {
      let x = 0, y = 0, ok = false, tries = 0;
      while (!ok && tries < 50) {
        x = 30 + Math.random() * (rect.width - 90);
        y = 130 + Math.random() * (rect.height - 200);
        ok = newPositions.every(p => Math.hypot(p.x - x, p.y - y) > 80);
        tries++;
      }
      newPositions.push({ x, y });
    }
    setPositions(newPositions);
  };

  useEffect(() => {
    setTimeout(setupRound, 100);
  }, []);

  const handleTap = (color: typeof COLORS[0], index: number) => {
    if (color.name === target.name) {
      setScore(s => s + 1);
      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(30);
      setTimeout(setupRound, 600);
    } else {
      setShake(index);
      if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([50, 30, 50]);
      setTimeout(() => setShake(null), 200);
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex flex-col bg-gradient-to-b from-rose-100 to-pink-100">
      <div className="flex items-center justify-between p-3">
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-900/10"
        >
          <X size={16} />
        </button>
        <h4 className="font-serif text-[18px]">🎨 Rang-Tap</h4>
        <div className="w-9" />
      </div>

      <div ref={areaRef} className="relative flex-1 overflow-hidden">
        <div className="absolute left-1/2 top-2 z-10 -translate-x-1/2 rounded-full bg-stone-900/85 px-3.5 py-1.5 font-serif text-[14px] font-semibold text-white">
          Ball: {score}
        </div>

        <div
          className="absolute left-1/2 top-[60px] -translate-x-1/2 rounded-full bg-white/90 px-5 py-2 font-serif text-[24px] font-semibold"
          style={{ color: target.value }}
        >
          {target.name}ni toping!
        </div>

        {COLORS.map((color, i) => (
          <button
            key={i}
            onClick={() => handleTap(color, i)}
            className="absolute grid h-[60px] w-[60px] animate-pulse-slow place-items-center rounded-full shadow-lg"
            style={{
              left: positions[i]?.x ?? 0,
              top: positions[i]?.y ?? 0,
              background: color.value,
              transform: shake === i ? 'scale(0.9)' : 'scale(1)',
              transition: 'transform 0.2s',
            }}
          />
        ))}
      </div>

      <style jsx>{`
        :global(.animate-pulse-slow) {
          animation: gentleBounce 1s ease-in-out infinite;
        }
        @keyframes gentleBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}
