// src/components/baby-mode/AnimatedScene.tsx
'use client';

export function AnimatedScene() {
  return (
    <div
      className="relative h-[300px] overflow-hidden rounded-3xl border border-stone-900/10"
      style={{
        background:
          'radial-gradient(70% 60% at 30% 30%, #EFE3F5, transparent 60%), radial-gradient(70% 60% at 80% 70%, #DCE7DD, transparent 60%), linear-gradient(180deg,#F8F0E5,#F0E4D2)',
      }}
    >
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="block h-full w-full">
        {/* Floating shapes */}
        <circle cx="80" cy="60" r="28" fill="#F4B572" opacity="0.4" className="float-shape" />
        <circle cx="320" cy="90" r="20" fill="#E89B8B" opacity="0.45" className="float-shape d1" />
        <circle cx="350" cy="200" r="26" fill="#7A8B6F" opacity="0.35" className="float-shape d2" />
        <circle cx="60" cy="220" r="16" fill="#C9663D" opacity="0.4" className="float-shape d3" />

        {/* Cute moon character */}
        <g transform="translate(200,150)" className="float-shape">
          <circle cx="0" cy="0" r="58" fill="#FFF3E0" />
          <circle cx="-16" cy="-10" r="58" fill="#F8E2B8" opacity="0.55" />
          <ellipse cx="-20" cy="14" rx="7" ry="5" fill="#F4B0A0" opacity="0.75" />
          <ellipse cx="20" cy="14" rx="7" ry="5" fill="#F4B0A0" opacity="0.75" />
          <path d="M-20 -3 q4 -6 9 0" stroke="#2A1F18" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M11 -3 q4 -6 9 0" stroke="#2A1F18" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M-7 14 q7 6 14 0" stroke="#2A1F18" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </g>

        {/* Stars */}
        <g className="float-shape d2">
          <path d="M120 50 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 z" fill="#C9663D" opacity="0.7" />
        </g>
        <g className="float-shape d1">
          <path d="M310 250 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 l6 -2 z" fill="#7A8B6F" opacity="0.6" />
        </g>
      </svg>

      {/* Bubbles */}
      {[
        { left: '20%', size: 22, dur: 7, delay: 0 },
        { left: '55%', size: 14, dur: 9, delay: 2 },
        { left: '80%', size: 28, dur: 11, delay: 4 },
        { left: '35%', size: 18, dur: 8, delay: 6 },
        { left: '70%', size: 12, dur: 10, delay: 1 },
      ].map((b, i) => (
        <span
          key={i}
          className="bubble"
          style={{
            left: b.left,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      <style jsx>{`
        :global(.float-shape) { animation: floatY 4s ease-in-out infinite; }
        :global(.float-shape.d1) { animation-delay: -1s; }
        :global(.float-shape.d2) { animation-delay: -2s; }
        :global(.float-shape.d3) { animation-delay: -3s; }
        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .bubble {
          position: absolute;
          bottom: 0;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.3) 50%, transparent 70%);
          border: 1px solid rgba(255,255,255,0.6);
          pointer-events: none;
          animation: rise linear infinite;
        }
        @keyframes rise {
          0% { transform: translateY(0) scale(0.4); opacity: 0; }
          20% { opacity: 0.9; }
          100% { transform: translateY(-340px) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
