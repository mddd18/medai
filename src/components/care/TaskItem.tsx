// src/components/care/TaskItem.tsx
'use client';

import { useState } from 'react';
import type { DailyTask } from '@/types';
import {
  Check,
  Pill,
  HandHeart,
  UtensilsCrossed,
  Activity,
  Thermometer,
  AlertCircle,
} from 'lucide-react';

interface Props {
  task: DailyTask;
  onComplete: (id: string) => void;
}

const KIND_CONFIG = {
  medicine: {
    icon: Pill,
    label: 'Dori',
    barClass: 'bg-orange-500',
    pillClass: 'bg-orange-100 text-orange-800',
    iconBgClass: 'bg-orange-100',
    iconClass: 'text-orange-700',
  },
  massage: {
    icon: HandHeart,
    label: 'Massaj',
    barClass: 'bg-emerald-600',
    pillClass: 'bg-emerald-100 text-emerald-800',
    iconBgClass: 'bg-emerald-100',
    iconClass: 'text-emerald-700',
  },
  meal: {
    icon: UtensilsCrossed,
    label: 'Ovqat',
    barClass: 'bg-rose-500',
    pillClass: 'bg-rose-100 text-rose-800',
    iconBgClass: 'bg-rose-100',
    iconClass: 'text-rose-700',
  },
  exercise: {
    icon: Activity,
    label: 'Mashq',
    barClass: 'bg-amber-500',
    pillClass: 'bg-amber-100 text-amber-800',
    iconBgClass: 'bg-amber-100',
    iconClass: 'text-amber-700',
  },
  measurement: {
    icon: Thermometer,
    label: 'O\'lchash',
    barClass: 'bg-sky-500',
    pillClass: 'bg-sky-100 text-sky-800',
    iconBgClass: 'bg-sky-100',
    iconClass: 'text-sky-700',
  },
} as const;

export function TaskItem({ task, onComplete }: Props) {
  const [animating, setAnimating] = useState(false);
  const config = KIND_CONFIG[task.kind];
  const Icon = config.icon;

  const time = new Date(task.scheduledAt);
  const timeStr = time.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });

  const isDone = task.status === 'completed';
  const isOverdue = task.status === 'overdue';
  const isCritical = task.importance === 'critical';

  const handleClick = () => {
    if (isDone) return;
    setAnimating(true);
    setTimeout(() => {
      onComplete(task.id);
      setAnimating(false);
    }, 250);
  };

  return (
    <div
      className={`
        group relative flex items-center gap-3 overflow-hidden rounded-2xl border bg-white p-3 pl-4 transition-all duration-300
        ${isDone
          ? 'border-transparent bg-emerald-50/60'
          : isOverdue
          ? 'border-rose-200 bg-rose-50/30'
          : 'border-stone-900/10 hover:border-stone-900/20 hover:shadow-sm'
        }
        ${animating ? 'scale-[0.98]' : ''}
      `}
    >
      {/* Vertical accent bar */}
      <span
        className={`
          absolute left-0 top-3 bottom-3 w-[3px] rounded-r
          ${isDone ? 'bg-emerald-600' : config.barClass}
        `}
      />

      {/* Vaqt */}
      <div className="w-12 flex-shrink-0 text-center">
        <div className={`font-serif text-[17px] font-semibold leading-none ${isDone ? 'text-stone-400 line-through' : 'text-stone-900'}`}>
          {timeStr}
        </div>
        {isOverdue && !isDone && (
          <div className="mt-1 text-[9px] font-bold uppercase tracking-wider text-rose-600">
            Kechikdi
          </div>
        )}
      </div>

      {/* Icon */}
      <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl ${config.iconBgClass}`}>
        <Icon size={17} className={config.iconClass} />
      </div>

      {/* Body */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h3 className={`truncate text-[14px] font-semibold ${isDone ? 'text-stone-400 line-through' : 'text-stone-900'}`}>
            {task.title}
          </h3>
          <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${config.pillClass}`}>
            {config.label}
          </span>
          {isCritical && !isDone && (
            <AlertCircle size={13} className="flex-shrink-0 text-rose-500" />
          )}
        </div>
        <p className="mt-0.5 truncate text-[12px] text-stone-500">
          {task.subtitle}
        </p>
      </div>

      {/* Check button */}
      <button
        onClick={handleClick}
        disabled={isDone}
        aria-label={isDone ? 'Bajarildi' : 'Bajarildi deb belgilash'}
        className={`
          flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all
          ${isDone
            ? 'border-emerald-600 bg-emerald-600 text-white'
            : 'border-stone-300 bg-transparent text-transparent hover:border-emerald-500 hover:bg-emerald-50 active:scale-90'
          }
        `}
      >
        <Check size={18} strokeWidth={3} />
      </button>
    </div>
  );
}
