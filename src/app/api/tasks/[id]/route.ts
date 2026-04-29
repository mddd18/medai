// src/app/api/tasks/[id]/route.ts
// Bitta vazifani yangilash (bajarildi/o'tkazildi)
// =====================================================
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  // Real ilovada bu DB'ga yoziladi
  return NextResponse.json({
    ok: true,
    data: {
      id: params.id,
      status: body.status,
      completedAt: body.status === 'completed' ? new Date().toISOString() : undefined,
    },
  });
}
