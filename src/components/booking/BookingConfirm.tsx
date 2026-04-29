// src/components/booking/BookingConfirm.tsx
'use client';

import type { Doctor } from '@/types';

interface Props {
  doctor: Doctor | null;
  slot: string | null;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function BookingConfirm({ doctor, slot, loading, onConfirm, onCancel }: Props) {
  if (!doctor || !slot) return null;

  return (
    <div
      className="fixed inset-0 z-[250] flex items-end justify-center bg-stone-900/50 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-[440px] rounded-t-[32px] bg-amber-50 px-5 pb-7 pt-6 animate-[slideUp_0.35s_cubic-bezier(.4,0,.2,1)]"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideUp 0.35s cubic-bezier(.4,0,.2,1)' }}
      >
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-stone-300" />
        <h3 className="text-center font-serif text-[22px] font-medium">Tasdiqlaysizmi?</h3>
        <p className="mb-4 text-center text-[13px] text-stone-500">
          Quyidagi seansni band qilmoqchimisiz?
        </p>

        <div className="mb-4 space-y-2 rounded-2xl bg-stone-100/70 p-3.5">
          <Row label="Mutaxassis" value={doctor.fullName} />
          <Row label="Soha" value={doctor.specialty} />
          <Row label="Joy" value={doctor.hospital} />
          <Row label="Vaqt" value={`Bugun · ${slot}`} />
          <Row
            label="Narx"
            value={`${((doctor.pricePerSession || 0) / 1000).toFixed(0)},000 so'm`}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-xl bg-stone-200 py-3 text-[13px] font-bold text-stone-800 active:scale-[0.98]"
          >
            Bekor
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 rounded-xl bg-stone-900 py-3 text-[13px] font-bold text-amber-50 active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? 'Yuborilmoqda...' : 'Tasdiqlash'}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 text-[13px]">
      <span className="text-stone-500">{label}</span>
      <span className="text-right font-bold text-stone-900">{value}</span>
    </div>
  );
}
