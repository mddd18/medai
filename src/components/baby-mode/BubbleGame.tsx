// src/components/baby-mode/BubbleGame.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface Bubble {
  id: number;
  left: number;
  top: number;
  color: string;
  emoji: string;
  popped: boolean;
}

interface Props {
  onClose: () => void;
}

const COLORS = ['#F4B572', '#E89B8B', '#7BA8C4', '#7A8B6F', '#C9663D', '#6B4060'];
const EMOJIS = ['🫧', '✨', '🌟', '⭐', '💫', '🌸'];

export function BubbleGame({ onClose }: Props) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const areaRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const area = areaRef.current;
      if (!area) return;
      const rect = area.getBoundingClientRect();
      const newBubble: Bubble = {
        id: ++idRef.current,
        left: Math.random() * (rect.width - 60),
        top: Math.random() * (rect.height - 60),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        popped: false,
      };
      setBubbles(prev => [...prev, newBubble]);

      // Remove bubble after 3.5s
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
      }, 3500);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const popBubble = (id: number) => {
    setBubbles(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));
    setScore(s => s + 1);
    if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
    setTimeout(() => setBubbles(prev => prev.filter(b => b.id !== id)), 400);
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
        <h4 className="font-serif text-[18px]">🫧 Pufakcha</h4>
        <div className="w-9" />
      </div>

      <div ref={areaRef} className="relative flex-1 overflow-hidden">
        <div className="absolute left-1/2 top-2 z-10 -translate-x-1/2 rounded-full bg-stone-900/85 px-3.5 py-1.5 font-serif text-[14px] font-semibold text-white">
          Ball: {score}
        </div>

        {bubbles.map(b => (
          <button
            key={b.id}
            onClick={() => !b.popped && popBubble(b.id)}
            className={`absolute grid h-[60px] w-[60px] place-items-center rounded-full text-[30px] shadow-lg transition-transform ${
              b.popped ? 'scale-0 opacity-0' : 'animate-bounce-slow'
            }`}
            style={{
              left: `${b.left}px`,
              top: `${b.top}px`,
              background: b.color,
              transition: b.popped ? 'all 0.4s' : undefined,
            }}
          >
            {b.emoji}
          </button>
        ))}
      </div>

      <style jsx>{`
        :global(.animate-bounce-slow) {
          animation: bounceGame 1s ease-in-out infinite;
        }
        @keyframes bounceGame {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
