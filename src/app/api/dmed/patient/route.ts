// src/app/api/dmed/patient/route.ts
// D-Med tizimidan bemor ma'lumotlarini olish (mock)
// =====================================================
import { NextResponse } from 'next/server';
import { MOCK_PATIENT, MOCK_DIAGNOSIS, MOCK_ALLERGIES } from '@/data/mock-dmed';

export async function GET() {
  // Real D-Med API kechikishini taqlid qilish
  await new Promise(r => setTimeout(r, 400));

  return NextResponse.json({
    ok: true,
    data: {
      patient: MOCK_PATIENT,
      diagnosis: MOCK_DIAGNOSIS,
      allergies: MOCK_ALLERGIES,
    },
  });
}
