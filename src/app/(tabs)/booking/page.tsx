// src/app/(tabs)/booking/page.tsx
// =====================================================
// Smart Booking — AI matchmaking + Geolokatsiya + band qilish
// =====================================================
'use client';

import { useState, useMemo } from 'react';
import { useDoctors } from '@/hooks/useDoctors';
import { useDMedSync } from '@/hooks/useDMedSync';
import { dmedClient } from '@/lib/dmed-client';

import { TopBar } from '@/components/layout/TopBar';
import { MapView } from '@/components/booking/MapView';
import { DoctorCard } from '@/components/booking/DoctorCard';
import { BookingConfirm } from '@/components/booking/BookingConfirm';
import { Toast } from '@/components/ui/Toast';

import { Search } from 'lucide-react';

type FilterType = 'all' | 'massage' | 'pediatric';

export default function BookingPage() {
  const { data: dmedData } = useDMedSync();
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookings, setBookings] = useState<{ doctorId: string; slot: string }[]>([]);
  const [confirming, setConfirming] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });

  const { doctors, loading } = useDoctors({
    type: filter === 'all' ? undefined : filter,
    search,
  });

  const expandedDoctor = useMemo(
    () => doctors.find(d => d.id === expandedId),
    [doctors, expandedId]
  );

  /* Pin/card on map clicked → scroll va expand */
  const handlePinClick = (docId: string) => {
    setExpandedId(docId);
    setTimeout(() => {
      document.getElementById(`doc-${docId}`)?.scrollIntoView({
        behavior: 'smooth', block: 'center',
      });
    }, 50);
  };

  const toggleDoctor = (docId: string) => {
    if (expandedId === docId) { setExpandedId(null); setSelectedSlot(null); }
    else { setExpandedId(docId); setSelectedSlot(null); }
  };

  const handleConfirm = async () => {
    if (!expandedDoctor || !selectedSlot || !dmedData) return;
    try {
      setConfirming(true);
      await dmedClient.reserveBooking(expandedDoctor.id, selectedSlot, dmedData.patient.id);
      setBookings(prev => [...prev, { doctorId: expandedDoctor.id, slot: selectedSlot }]);
      setShowConfirm(false);
      setToast({ show: true, msg: `✓ ${expandedDoctor.fullName} bilan ${selectedSlot} ga band qilindi!` });
      setSelectedSlot(null);
    } catch (e) {
      setToast({ show: true, msg: 'Xatolik yuz berdi, qayta urinib ko\'ring' });
    } finally {
      setConfirming(false);
    }
  };

  return (
    <>
      <TopBar patient={dmedData?.patient} />

      <div className="mb-3 flex items-end justify-between px-5 pt-2">
        <h2 className="font-serif text-[22px] font-medium leading-tight tracking-tight text-stone-900">
          Smart <em className="text-stone-500">booking</em>
        </h2>
        <span className="text-[12px] text-stone-500">AI moslik</span>
      </div>

      {/* Search */}
      <div className="mx-4 mb-3 flex items-center gap-2 rounded-full border border-stone-900/10 bg-white/70 px-4 py-2.5">
        <Search size={16} className="flex-shrink-0 text-stone-500" />
        <input
          type="text"
          placeholder="Mutaxassis yoki klinikani izlash..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-stone-500"
        />
      </div>

      {/* Map */}
      <MapView doctors={doctors} onPinClick={handlePinClick} />

      {/* Filter chips */}
      <div className="mx-4 mb-3 inline-flex w-fit gap-0.5 rounded-full border border-stone-900/10 bg-white p-1">
        {([
          { v: 'all', l: 'Barchasi' },
          { v: 'massage', l: 'Massajistlar' },
          { v: 'pediatric', l: 'Pediatrlar' },
        ] as const).map(({ v, l }) => (
          <button
            key={v}
            onClick={() => setFilter(v)}
            className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition ${
              filter === v ? 'bg-stone-900 text-amber-50' : 'text-stone-600'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Doctors list */}
      <div className="space-y-2 px-4 pb-4">
        {loading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="h-[140px] animate-pulse rounded-2xl bg-stone-200/60" />
          ))
        ) : doctors.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white/50 p-8 text-center">
            <div className="mb-2 text-3xl">🔎</div>
            <p className="text-[14px] font-bold">Mutaxassis topilmadi</p>
            <p className="mt-1 text-[12px] text-stone-500">Qidiruvni yoki filterni o'zgartiring</p>
          </div>
        ) : (
          doctors.map(d => {
            const isBooked = bookings.some(b => b.doctorId === d.id);
            return (
              <DoctorCard
                key={d.id}
                doctor={d}
                isExpanded={expandedId === d.id}
                selectedSlot={expandedId === d.id ? selectedSlot : null}
                isBooked={isBooked}
                onToggle={() => toggleDoctor(d.id)}
                onSelectSlot={setSelectedSlot}
                onBook={() => setShowConfirm(true)}
              />
            );
          })
        )}
      </div>

      {/* Confirm modal */}
      {showConfirm && (
        <BookingConfirm
          doctor={expandedDoctor || null}
          slot={selectedSlot}
          loading={confirming}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
        />
      )}

      <Toast
        show={toast.show}
        message={toast.msg}
        onHide={() => setToast({ show: false, msg: '' })}
      />
    </>
  );
}
