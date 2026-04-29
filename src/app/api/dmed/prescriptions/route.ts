// src/app/api/dmed/prescriptions/route.ts
// D-Med'dan e-retseptlar va massaj protokollarini olish
// =====================================================
import { NextResponse } from 'next/server';
import { MOCK_PRESCRIPTIONS, MOCK_PROTOCOLS } from '@/data/mock-dmed';

export async function GET() {
  await new Promise(r => setTimeout(r, 350));

  return NextResponse.json({
    ok: true,
    data: {
      prescriptions: MOCK_PRESCRIPTIONS,
      protocols: MOCK_PROTOCOLS,
    },
  });
}
