// src/app/api/ai/nutri-care/route.ts
// AI: tashxis + dorilarga qarab ovqatlanish tavsiyasi
// =====================================================
import { NextResponse } from 'next/server';
import { generateNutriCare } from '@/lib/ai-engine';
import {
  MOCK_PATIENT,
  MOCK_DIAGNOSIS,
  MOCK_ALLERGIES,
  MOCK_PRESCRIPTIONS,
} from '@/data/mock-dmed';

export async function POST() {
  await new Promise(r => setTimeout(r, 600)); // AI processing imitation

  const advice = generateNutriCare({
    diagnosis: MOCK_DIAGNOSIS,
    prescriptions: MOCK_PRESCRIPTIONS,
    allergies: MOCK_ALLERGIES,
    ageMonths: MOCK_PATIENT.ageMonths,
    weightKg: MOCK_PATIENT.weightKg,
  });

  return NextResponse.json({ ok: true, data: advice });
}

export async function GET() {
  return POST();
}
