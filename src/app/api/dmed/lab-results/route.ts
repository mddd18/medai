// src/app/api/dmed/lab-results/route.ts
// D-Med'dan tahlil natijalari
// =====================================================
import { NextResponse } from 'next/server';
import { MOCK_LAB_RESULTS } from '@/data/mock-labs';

export async function GET() {
  await new Promise(r => setTimeout(r, 300));
  return NextResponse.json({ ok: true, data: MOCK_LAB_RESULTS });
}
