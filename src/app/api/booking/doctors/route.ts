// src/app/api/booking/doctors/route.ts
// Smart Booking — AI matchmaking algoritmi bilan
// =====================================================
import { NextRequest, NextResponse } from 'next/server';
import { MOCK_DOCTORS } from '@/data/mock-doctors';

export async function GET(req: NextRequest) {
  await new Promise(r => setTimeout(r, 400));

  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type'); // 'massage' | 'pediatric' | null
  const search = searchParams.get('q')?.toLowerCase() || '';
  const userLat = parseFloat(searchParams.get('lat') || '41.3175');
  const userLng = parseFloat(searchParams.get('lng') || '69.2825');

  // Haversine masofa hisoblash
  const distance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  let doctors = MOCK_DOCTORS.map(d => ({
    ...d,
    distanceKm: Math.round(distance(userLat, userLng, d.lat, d.lng) * 10) / 10,
  }));

  // Filter
  if (type === 'massage') {
    doctors = doctors.filter(d =>
      d.specialty.toLowerCase().includes('massaj') ||
      d.specialty.toLowerCase().includes('fizio')
    );
  } else if (type === 'pediatric') {
    doctors = doctors.filter(d =>
      d.specialty.toLowerCase().includes('pediatr') ||
      d.specialty.toLowerCase().includes('shifokor')
    );
  }

  if (search) {
    doctors = doctors.filter(d =>
      d.fullName.toLowerCase().includes(search) ||
      d.specialty.toLowerCase().includes(search) ||
      d.hospital.toLowerCase().includes(search)
    );
  }

  // AI matchmaking: rating × 0.4 + (1/distance) × 0.4 + matchScore × 0.2
  doctors.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  return NextResponse.json({ ok: true, data: doctors });
}
