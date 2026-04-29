// src/app/api/ai/risk-analysis/route.ts
// AI: davolanishni o'tkazib yuborish xavflarini hisoblash
// =====================================================
import { NextRequest, NextResponse } from 'next/server';
import { calculateRiskAnalysis } from '@/lib/ai-engine';
import { MOCK_DIAGNOSIS, MOCK_PRESCRIPTIONS } from '@/data/mock-dmed';
import type { DailyTask } from '@/types';

export async function POST(req: NextRequest) {
  await new Promise(r => setTimeout(r, 500));

  const body = await req.json().catch(() => ({}));
  const tasks: DailyTask[] = body.tasks || [];

  const analysis = calculateRiskAnalysis({
    diagnosis: MOCK_DIAGNOSIS,
    prescriptions: MOCK_PRESCRIPTIONS,
    tasks,
    treatmentStartDate: MOCK_DIAGNOSIS.diagnosedAt,
  });

  return NextResponse.json({ ok: true, data: analysis });
}
