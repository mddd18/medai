// src/components/booking/DoctorCard.tsx
'use client';

import type { Doctor } from '@/types';
import { Star, MapPin, Sparkles, Check } from 'lucide-react';

interface Props {
  doctor: Doctor;
  isExpanded: boolean;
  selectedSlot: string | null;
  isBooked: boolean;
  onToggle: () => void;
  onSelectSlot: (slot: string) => void;
  onBook: () => void;
}

export function DoctorCard({
  doctor, isExpanded, selectedSlot, isBooked, onToggle, onSelectSlot, onBook,
}: Props) {
  const initials = doctor.fullName.split(' ').map(s => s[0]).slice(0, 2).join('');

  return (
    <div
      id={`doc-${doctor.id}`}
      className={`flex flex-col gap-3 rounded-2xl border bg-white p-3.5 transition ${
        isExpanded ? 'border-orange-500' : 'border-stone-900/10'
      }`}
    >
      <div className="flex items-center gap-3 cursor-pointer" onClick={onToggle}>
        {/* Avatar */}
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-600 font-serif text-[18px] font-semibold text-white">
          {initials}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-[14px] font-bold">{doctor.fullName}</h3>
            {isBooked && (
              <span className="text-[11px] font-bold text-emerald-700">✓ Band</span>
            )}
          </div>
          <p className="text-[11.5px] text-stone-500">{doctor.specialty}</p>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-stone-600">
            <Star size={11} className="fill-amber-400 text-amber-400" />
            <b className="font-bold text-stone-900">{doctor.rating}</b>
            <span className="text-stone-400">({doctor.reviewsCount})</span>
            <span className="text-stone-300">·</span>
            <span>{doctor.experienceYears} yil</span>
          </div>
        </div>

        {/* Match score */}
        <div className="flex-shrink-0 rounded-xl border border-emerald-300/50 bg-gradient-to-br from-emerald-100/50 to-amber-100/50 px-2 py-1.5 text-center">
          <div className="font-serif text-[14px] font-semibold leading-none text-emerald-700">
            {doctor.matchScore}%
          </div>
          <div className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-stone-500">Mos</div>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between border-t border-stone-100 pt-2 text-[11.5px]">
        <div className="min-w-0">
          <div className="flex items-center gap-1 text-stone-500">
            <MapPin size={11} />
            <span className="truncate">{doctor.hospital} · {doctor.distanceKm} km</span>
          </div>
          {doctor.matchReason && (
            <div className="mt-1 flex items-center gap-1 text-[10.5px] font-semibold text-emerald-700">
              <Sparkles size={10} />
              {doctor.matchReason}
            </div>
          )}
        </div>
        <div className="font-serif text-[13px] font-semibold italic text-orange-700">
          {((doctor.pricePerSession || 0) / 1000).toFixed(0)}k so'm
        </div>
      </div>

      {/* Slots */}
      {isExpanded && doctor.availableSlots && (
        <div className="flex flex-wrap gap-1.5 border-t border-dashed border-stone-200 pt-2">
          {doctor.availableSlots.map((slot) => {
            const isSelected = selectedSlot === slot.start;
            return (
              <button
                key={slot.start}
                onClick={(e) => { e.stopPropagation(); slot.available && onSelectSlot(slot.start); }}
                disabled={!slot.available}
                className={`rounded-lg border px-2.5 py-1.5 text-[11.5px] font-semibold transition ${
                  isSelected
                    ? 'border-orange-600 bg-orange-600 text-white'
                    : slot.available
                    ? 'border-transparent bg-amber-50 text-stone-800 hover:border-orange-500'
                    : 'border-transparent bg-stone-100 text-stone-400 line-through cursor-not-allowed'
                }`}
              >
                {slot.start}
              </button>
            );
          })}
        </div>
      )}

      {/* Book button */}
      {isExpanded && selectedSlot && (
        <button
          onClick={(e) => { e.stopPropagation(); onBook(); }}
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-stone-900 py-3 text-[13px] font-bold text-amber-50 active:scale-[0.98]"
        >
          <Check size={14} strokeWidth={3} />
          {selectedSlot} ga band qilish
        </button>
      )}
    </div>
  );
}
