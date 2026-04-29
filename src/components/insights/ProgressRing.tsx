// src/components/insights/ProgressRing.tsx
'use client';

import { useEffect, useState } from 'react';

interface Props {
  percentage: number;
  size?: number;
  stroke?: number;
  label?: string;
}

export function ProgressRing({ percentage, size = 200, stroke = 14, label = 'Tugatildi' }: Props) {
  const [animated, setAnimated] = useState(0);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let raf: number;
    let n = 0;
    const animate = () => {
      n += 2;
      if (n >= percentage) {
        setAnimated(percentage);
        return;
      }
      setAnimated(n);
      raf = requestAnimationFrame(animate);
    };
    const t = setTimeout(animate, 200);
    return () => {
      clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [percentage]);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        className="absolute inset-0 -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F4B572" />
            <stop offset="60%" stopColor="#C9663D" />
            <stop offset="100%" stopColor="#A14E2C" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(42,31,24,0.07)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (animated / 100) * circumference}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)' }}
        />
      </svg>
      <div className="text-center">
        <div className="font-serif text-[52px] font-medium leading-none tracking-tight text-stone-900">
          {animated}
          <sup className="ml-0.5 text-[22px] font-normal text-stone-500">%</sup>
        </div>
        <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-stone-500">
          {label}
        </div>
      </div>
    </div>
  );
}
