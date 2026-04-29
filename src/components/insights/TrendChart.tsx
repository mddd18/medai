// src/components/insights/TrendChart.tsx
'use client';

interface Props {
  data: number[]; // 7 days adherence %
  todayAdherence: number;
}

export function TrendChart({ data, todayAdherence }: Props) {
  const days = ['D', 'S', 'Ch', 'P', 'J', 'Sh', 'Y'];
  const W = 320, H = 120, P = 18;
  const stepX = (W - P * 2) / (data.length - 1);

  const points = data.map((v, i) => ({
    x: P + i * stepX,
    y: H - P - (v / 100) * (H - P * 2),
    v,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');
  const areaPath =
    linePath +
    ` L${points[points.length - 1].x} ${H - P} L${points[0].x} ${H - P} Z`;

  return (
    <div className="mx-4 mb-3 rounded-2xl border border-stone-900/10 bg-white p-4">
      <h4 className="font-serif text-[15px] font-medium">So'nggi 7 kun adherence</h4>
      <p className="mb-3 text-[11px] text-stone-500">Vazifalar bajarilish foizi (kunlik)</p>

      <svg width="100%" height="120" viewBox={`0 0 ${W} ${H}`} className="block">
        <defs>
          <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C9663D" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C9663D" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1={P} y1={H - P} x2={W - P} y2={H - P} stroke="rgba(42,31,24,0.1)" />
        <path d={areaPath} fill="url(#trendGrad)" />
        <path
          d={linePath}
          fill="none"
          stroke="#C9663D"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={3} fill="#FFF" stroke="#C9663D" strokeWidth={2} />
            <text
              x={p.x}
              y={H - 3}
              textAnchor="middle"
              fontSize="9"
              fontFamily="Manrope"
              fontWeight="600"
              fill="#8B7867"
            >
              {days[i]}
            </text>
            {i === points.length - 1 && (
              <text
                x={p.x}
                y={p.y - 8}
                textAnchor="middle"
                fontSize="10"
                fontFamily="Fraunces"
                fontWeight="600"
                fill="#C9663D"
              >
                {p.v}%
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
