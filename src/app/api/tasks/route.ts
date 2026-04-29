// src/app/api/tasks/route.ts
// Bugungi vazifalar (To-Do) — D-Med retseptlaridan generatsiya
// =====================================================
import { NextResponse } from 'next/server';
import { generateDailyTasks } from '@/lib/ai-engine';
import { MOCK_PRESCRIPTIONS, MOCK_PROTOCOLS } from '@/data/mock-dmed';

export async function GET() {
  await new Promise(r => setTimeout(r, 300));

  const tasks = generateDailyTasks(MOCK_PRESCRIPTIONS, MOCK_PROTOCOLS);

  // Demo uchun ba'zilarini "bajarilgan" deb belgilaymiz
  const now = Date.now();
  tasks.forEach(t => {
    const taskTime = new Date(t.scheduledAt).getTime();
    if (taskTime < now - 60 * 60 * 1000) {
      // 1 soatdan eski — 80% ehtimol bilan bajarilgan
      t.status = Math.random() > 0.2 ? 'completed' : 'skipped';
      if (t.status === 'completed') t.completedAt = new Date(taskTime + 60000).toISOString();
    }
  });

  return NextResponse.json({ ok: true, data: tasks });
}
