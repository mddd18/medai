// src/app/api/booking/reserve/route.ts
// Seansni band qilish (mock — real DB'ga yoziladi)
// =====================================================
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  await new Promise(r => setTimeout(r, 600));
  const body = await req.json();

  // Real ilovada — D-Med API'ga POST qilinadi
  return NextResponse.json({
    ok: true,
    data: {
      bookingId: `bk_${Date.now()}`,
      doctorId: body.doctorId,
      slot: body.slot,
      patientId: body.patientId,
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
      qrCode: `SBOLA-${Date.now().toString(36).toUpperCase()}`,
    },
  });
}
