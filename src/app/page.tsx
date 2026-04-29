// src/app/page.tsx
// =====================================================
// AI Care & Diet — Asosiy sahifa
// D-Med'dan retseptlar + AI ratsion + xavf tahlili
// =====================================================
'use client';

import { useState, useMemo } from 'react';
import { useDMedSync } from '@/hooks/useDMedSync';
import { useTasks } from '@/hooks/useTasks';
import { useNutriCare } from '@/hooks/useNutriCare';
import { useRiskAnalysis } from '@/hooks/useRiskAnalysis';

import { TopBar } from '@/components/layout/TopBar';
import { HeroCard } from '@/components/care/HeroCard';
import { TaskItem } from '@/components/care/TaskItem';
import { NutriCareCard } from '@/components/care/NutriCareCard';
import { RiskInlineBanner } from '@/components/care/RiskInlineBanner';
import { Toast } from '@/components/ui/Toast';
import { CareSkeleton } from '@/components/ui/Skeleton';

import { CalendarDays, Filter } from 'lucide-react';

export default function CarePage() {
  /* ===== 1. D-Med ma'lumotlarini sinxronlash ===== */
  const { data: dmedData, loading: dmedLoading } = useDMedSync();

  /* ===== 2. Bugungi vazifalar ===== */
  const { tasks, loading: tasksLoading, completeTask, stats } = useTasks();

  /* ===== 3. AI: Nutri-Care ===== */
  const { advice: nutriAdvice, loading: nutriLoading } = useNutriCare();

  /* ===== 4. AI: Xavf tahlili ===== */
  const { analysis: riskAnalysis } = useRiskAnalysis(tasks);

  /* ===== UI state ===== */
  const [toast, setToast] = useState({ show: false, msg: '' });
  const [filter, setFilter] = useState<'all' | 'medicine' | 'massage' | 'remaining'>('all');

  /* ===== Filtered tasks ===== */
  const filteredTasks = useMemo(() => {
    if (filter === 'all') return tasks;
    if (filter === 'remaining') return tasks.filter(t => t.status !== 'completed');
    return tasks.filter(t => t.kind === filter);
  }, [tasks, filter]);

  /* ===== Vazifa bajarildi ===== */
  const handleComplete = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    await completeTask(taskId);
    setToast({
      show: true,
      msg: `${task.title} — bajarildi 🌿`,
    });
  };

  /* ===== Yuklanish holati ===== */
  if (dmedLoading || !dmedData) {
    return (
      <>
        <TopBar />
        <CareSkeleton />
      </>
    );
  }

  /* ===== Bugungi sana ===== */
  const today = new Date();
  const dateStr = today.toLocaleDateString('uz-UZ', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  });

  return (
    <>
      <TopBar patient={dmedData.patient} />

      {/* ====== HERO CARD ====== */}
      <HeroCard
        patient={dmedData.patient}
        diagnosis={dmedData.diagnosis}
        completedTasks={stats.completed}
        totalTasks={stats.total}
      />

      {/* ====== AI XAVF BANNER (faqat o'rtacha+ darajada) ====== */}
      {riskAnalysis && <RiskInlineBanner analysis={riskAnalysis} />}

      {/* ====== KUNLIK REJA (TASKS) ====== */}
      <section className="mt-6">
        <div className="mb-3 flex items-end justify-between px-5">
          <div>
            <h2 className="font-serif text-[22px] font-medium leading-tight tracking-tight text-stone-900">
              Kundalik <em className="text-stone-500">reja</em>
            </h2>
            <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-stone-500">
              <CalendarDays size={12} />
              {dateStr}
            </p>
          </div>

          {/* Filter chips */}
          <div className="flex items-center gap-1 rounded-full border border-stone-900/10 bg-white p-1 text-[11px] font-semibold">
            {([
              { v: 'all', l: 'Hammasi' },
              { v: 'remaining', l: 'Qoldi' },
              { v: 'medicine', l: 'Dori' },
            ] as const).map(({ v, l }) => (
              <button
                key={v}
                onClick={() => setFilter(v)}
                className={`rounded-full px-2.5 py-1 transition ${
                  filter === v
                    ? 'bg-stone-900 text-amber-50'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {tasksLoading ? (
          <div className="space-y-2 px-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 animate-pulse rounded-2xl bg-stone-200/50" />
            ))}
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="mx-4 rounded-2xl border border-dashed border-stone-300 bg-white/50 p-8 text-center">
            <div className="mb-2 text-3xl">✨</div>
            <p className="text-[14px] font-semibold text-stone-700">
              Bugungi barcha vazifalar tugatildi!
            </p>
            <p className="mt-1 text-[12px] text-stone-500">
              Aziza uchun ajoyib kun keldi.
            </p>
          </div>
        ) : (
          <div className="space-y-2 px-4">
            {filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onComplete={handleComplete}
              />
            ))}
          </div>
        )}
      </section>

      {/* ====== AI NUTRI-CARE ====== */}
      {nutriLoading ? (
        <div className="mx-4 mt-6 h-64 animate-pulse rounded-3xl bg-stone-200/50" />
      ) : nutriAdvice ? (
        <NutriCareCard advice={nutriAdvice} />
      ) : null}

      {/* ====== TASHXIS QISQACHA ESLATMASI ====== */}
      <div className="mx-4 mt-4 rounded-2xl border border-stone-900/10 bg-stone-50/70 p-4">
        <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-500">
          Davolanish ma'lumoti
        </div>
        <h3 className="font-serif text-[16px] font-semibold text-stone-900">
          {dmedData.diagnosis.name}
        </h3>
        <p className="mt-1 text-[12px] leading-snug text-stone-600">
          {dmedData.diagnosis.notes}
        </p>
        <div className="mt-2 flex items-center gap-3 text-[11px] text-stone-500">
          <span>👨‍⚕️ {dmedData.diagnosis.doctorName}</span>
          <span className="text-stone-300">·</span>
          <span>📍 {dmedData.diagnosis.hospital}</span>
        </div>
      </div>

      {/* ====== TOAST ====== */}
      <Toast
        show={toast.show}
        message={toast.msg}
        onHide={() => setToast({ show: false, msg: '' })}
      />
    </>
  );
}
