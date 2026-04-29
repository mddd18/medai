// src/lib/ai-engine.ts
// AI mantig'i: ovqatlanish tavsiyasi va xavf tahlili
// =====================================================
import type {
  Prescription,
  Diagnosis,
  Allergy,
  DailyTask,
  NutriCareAdvice,
  RiskAnalysis,
  RiskItem,
  ForbiddenFood,
  FoodSuggestion,
  VitaminSuggestion,
} from '@/types';

/* =====================================================
   1. AI NUTRI-CARE
   Tashxis + dorilar + allergiyalarga qarab ovqat tavsiyasi
   ===================================================== */

interface NutriInput {
  diagnosis: Diagnosis;
  prescriptions: Prescription[];
  allergies: Allergy[];
  ageMonths: number;
  weightKg: number;
}

export function generateNutriCare(input: NutriInput): NutriCareAdvice {
  const { diagnosis, prescriptions, allergies, ageMonths, weightKg } = input;

  const hasAntibiotic = prescriptions.some(p => p.category === 'antibiotic');
  const hasProbiotic = prescriptions.some(p => p.category === 'probiotic');
  const allergicSubstances = allergies.map(a => a.substance.toLowerCase());

  /* ----- Tavsiya etilgan ovqatlar ----- */
  const recommendedFoods: FoodSuggestion[] = [
    {
      name: 'Issiq tovuq sho\'rva',
      category: 'protein',
      reason: 'Bronxitda balg\'amni yumshatadi va immunitetni qo\'llab-quvvatlaydi',
      servingSize: '150 ml',
      bestTime: 'noon',
      emoji: '🍲',
    },
    {
      name: 'Asal qo\'shilgan iliq suv',
      category: 'fruit',
      reason: 'Yo\'talni yumshatadi, tabiiy antiseptik (1 yoshdan keyin)',
      servingSize: '100 ml',
      bestTime: 'morning',
      emoji: '🍯',
    },
    {
      name: 'Bug\'da pishirilgan brokoli',
      category: 'vegetable',
      reason: 'C vitamini va antioksidantlarga boy',
      servingSize: '50 g',
      bestTime: 'noon',
      emoji: '🥦',
    },
    {
      name: 'Iliq sut + zanjabil',
      category: 'dairy',
      reason: 'Yallig\'lanishni kamaytiradi (antibiotikdan 2 soat keyin!)',
      servingSize: '100 ml',
      bestTime: 'evening',
      emoji: '🥛',
    },
  ];

  /* ----- Allergiya bo'yicha filterlash ----- */
  const filteredFoods = recommendedFoods.filter(f =>
    !allergicSubstances.some(allergen =>
      f.name.toLowerCase().includes(allergen)
    )
  );

  /* ----- Mumkin emas ovqatlar (dori-ovqat o'zaro ta'siri) ----- */
  const forbiddenFoods: ForbiddenFood[] = [];

  if (hasAntibiotic) {
    forbiddenFoods.push(
      {
        name: 'Sutli mahsulotlar (antibiotik vaqtida)',
        reason: 'Kalsiy antibiotik so\'rilishini 50% gacha kamaytiradi',
        withMedicine: 'Cefixim',
        emoji: '🧀',
      },
      {
        name: 'Sitrus mevalar (greypfrut)',
        reason: 'Antibiotikning jigarda parchalanishiga to\'sqinlik qiladi',
        withMedicine: 'Cefixim',
        emoji: '🍊',
      }
    );
  }

  forbiddenFoods.push(
    {
      name: 'Sovuq ichimliklar',
      reason: 'Bronxlarni yana qo\'zg\'atishi mumkin',
      emoji: '🧊',
    },
    {
      name: 'Shirinliklar va shokolad',
      reason: 'Yallig\'lanishni kuchaytiradi va immunitetni susaytiradi',
      emoji: '🍫',
    }
  );

  // Allergik moddalarni qo'shish
  allergies.filter(a => a.type === 'food').forEach(a => {
    forbiddenFoods.push({
      name: a.substance,
      reason: `Allergiya: ${a.reaction}`,
      emoji: '⚠️',
    });
  });

  /* ----- Qo'shimcha vitaminlar ----- */
  const vitamins: VitaminSuggestion[] = [];

  if (hasAntibiotic && !hasProbiotic) {
    vitamins.push({
      name: 'Probiotik (Bifido)',
      reason: 'Antibiotik ichak mikroflorasini buzadi — albatta tiklash kerak',
      dosage: 'Yoshga mos tomchi',
      priority: 'must',
    });
  }

  vitamins.push(
    {
      name: 'Vitamin C',
      reason: 'Immunitetni qo\'llab-quvvatlaydi va tiklanishni tezlashtiradi',
      dosage: '50 mg/kun',
      priority: 'recommended',
    },
    {
      name: 'Sink (Zinc)',
      reason: 'Nafas yo\'llari shilliq qavatining tiklanishida ishtirok etadi',
      dosage: '5 mg/kun',
      priority: 'recommended',
    }
  );

  /* ----- AI tushuntirish ----- */
  const reasoning = `${diagnosis.name} tashxisi va ${prescriptions.length} ta dori asosida AI ratsion tuzdi. ${
    hasAntibiotic
      ? 'Antibiotik qabul qilinayotgani uchun sutli mahsulotlardan vaqtincha voz keching va probiotik qo\'shing. '
      : ''
  }Suyuq va iliq ovqatlarga ustunlik bering.`;

  /* ----- Suv me'yori (vazn bo'yicha) ----- */
  const hydrationGoalMl = Math.round(weightKg * 100); // 100ml/kg

  return {
    generatedAt: new Date().toISOString(),
    forDate: new Date().toISOString().slice(0, 10),
    recommendedFoods: filteredFoods,
    forbiddenFoods,
    supplementaryVitamins: vitamins,
    reasoning,
    hydrationGoalMl,
  };
}

/* =====================================================
   2. AI XAVF TAHLILI (Risk Analysis)
   Bajarilmagan vazifalar bo'yicha asoratlar xavfini hisoblash
   ===================================================== */

interface RiskInput {
  diagnosis: Diagnosis;
  prescriptions: Prescription[];
  tasks: DailyTask[];           // So'nggi 7-14 kunlik
  treatmentStartDate: string;
}

export function calculateRiskAnalysis(input: RiskInput): RiskAnalysis {
  const { diagnosis, prescriptions, tasks, treatmentStartDate } = input;

  const daysFromStart = Math.floor(
    (Date.now() - new Date(treatmentStartDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysCompleted = Math.min(daysFromStart, diagnosis.treatmentDurationDays);
  const daysRemaining = Math.max(0, diagnosis.treatmentDurationDays - daysCompleted);
  const overallTreatmentProgress = Math.round(
    (daysCompleted / diagnosis.treatmentDurationDays) * 100
  );

  /* ----- Adherence: qancha vazifa bajarildi ----- */
  const total = tasks.length || 1;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const adherenceRate = Math.round((completed / total) * 100);

  /* ----- O'tkazib yuborilgan vazifalar tahlili ----- */
  const skipped = tasks.filter(t => t.status === 'skipped' || t.status === 'overdue');
  const skippedAntibiotic = skipped.filter(
    t => t.kind === 'medicine' &&
    prescriptions.find(p => p.id === t.source.refId)?.category === 'antibiotic'
  );
  const skippedMassage = skipped.filter(t => t.kind === 'massage');

  /* ----- XAVFLAR ----- */
  const risks: RiskItem[] = [];

  /* 1. Antibiotik rezistentligi */
  if (prescriptions.some(p => p.category === 'antibiotic')) {
    const baseRisk = 8;
    const additionalRisk = skippedAntibiotic.length * 18;
    const earlyStopRisk = adherenceRate < 70 ? 25 : 0;
    const probabilityPct = Math.min(95, baseRisk + additionalRisk + earlyStopRisk);
    const level: RiskItem['level'] =
      probabilityPct >= 70 ? 'critical' :
      probabilityPct >= 45 ? 'high' :
      probabilityPct >= 20 ? 'medium' : 'low';

    risks.push({
      id: 'risk_resistance',
      type: 'resistance',
      level,
      probabilityPct,
      title: 'Antibiotikga rezistentlik',
      description: 'Kursni tugatmaslik bakteriyalarning chidamliligini oshiradi. Keyingi marta dori ta\'sir qilmasligi mumkin.',
      triggeredBy: skippedAntibiotic.map(t => `${t.title} (${formatTime(t.scheduledAt)})`),
      recommendation: 'Belgilangan vaqtda dorini bering, hatto belgilar yo\'qolgan bo\'lsa ham. Kurs to\'liq yakunlanishi shart.',
    });
  }

  /* 2. Kasallik qaytalanishi */
  const relapseRisk = Math.min(90,
    10 + (skippedAntibiotic.length * 12) + (adherenceRate < 60 ? 30 : 0)
  );
  risks.push({
    id: 'risk_relapse',
    type: 'relapse',
    level: relapseRisk >= 60 ? 'high' : relapseRisk >= 30 ? 'medium' : 'low',
    probabilityPct: relapseRisk,
    title: 'Kasallik qaytalanishi',
    description: 'Dori va massajni tushirib qoldirish bronxitning yana kuchayishiga olib kelishi mumkin.',
    triggeredBy: skipped.map(t => t.title).slice(0, 3),
    recommendation: 'Kunlik rejani to\'liq bajaring va nazoratga muddatida boring.',
  });

  /* 3. Massaj/fizio asoratlari */
  if (skippedMassage.length > 0) {
    const physioRisk = Math.min(80, 15 + skippedMassage.length * 14);
    risks.push({
      id: 'risk_physio',
      type: 'complication',
      level: physioRisk >= 50 ? 'high' : 'medium',
      probabilityPct: physioRisk,
      title: 'Balg\'am tiqilib qolishi',
      description: 'Vibratsion massaj o\'tkazilmasa, ko\'krak qafasida balg\'am to\'planib qoladi.',
      triggeredBy: skippedMassage.map(t => t.title),
      recommendation: 'Massaj seanslarini muddatida o\'tkazing, kerak bo\'lsa uyga mutaxassis chaqiring.',
    });
  }

  /* ----- AI xulosasi ----- */
  const aiSummary = adherenceRate >= 85
    ? `Ajoyib! Davolanish ${overallTreatmentProgress}% tugadi va siz ${adherenceRate}% vazifalarni bajaryapsiz. Shu tartibda davom eting.`
    : adherenceRate >= 60
    ? `Davolanish ${overallTreatmentProgress}% tugadi, lekin ${100 - adherenceRate}% vazifalar bajarilmadi. Tartibni mustahkamlang — asoratlar xavfi oshmoqda.`
    : `⚠️ Diqqat! Faqat ${adherenceRate}% vazifa bajarilgan. Asoratlar xavfi yuqori. Iltimos, shifokor bilan bog'laning.`;

  return {
    generatedAt: new Date().toISOString(),
    overallTreatmentProgress,
    daysCompleted,
    daysRemaining,
    adherenceRate,
    risks: risks.sort((a, b) => b.probabilityPct - a.probabilityPct),
    aiSummary,
  };
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' });
}

/* =====================================================
   3. KUNLIK VAZIFALARNI GENERATSIYA QILISH
   Retsept + protokollardan To-Do ro'yxat tuzish
   ===================================================== */

export function generateDailyTasks(
  prescriptions: Prescription[],
  protocols: any[],
  forDate: Date = new Date()
): DailyTask[] {
  const tasks: DailyTask[] = [];
  const dateStr = forDate.toISOString().slice(0, 10);

  // Retseptlardan dori vazifalari
  prescriptions.forEach(p => {
    p.timesOfDay.forEach(time => {
      const [h, m] = time.split(':').map(Number);
      const scheduledAt = new Date(forDate);
      scheduledAt.setHours(h, m, 0, 0);

      const importance: DailyTask['importance'] =
        p.category === 'antibiotic' ? 'critical' :
        p.category === 'painkiller' ? 'high' : 'medium';

      tasks.push({
        id: `task_${p.id}_${time}`,
        kind: 'medicine',
        title: p.medicineName,
        subtitle: `${p.dosage} · ovqatdan ${p.withFood === 'after' ? 'keyin' : p.withFood === 'before' ? 'oldin' : 'bilan'}`,
        scheduledAt: scheduledAt.toISOString(),
        status: scheduledAt < new Date() ? 'overdue' : 'pending',
        source: { type: 'prescription', refId: p.id },
        metadata: {
          medicineName: p.medicineName,
          dosage: p.dosage,
          withFood: p.withFood,
        },
        importance,
      });
    });
  });

  // Protokollardan massaj vazifalari
  protocols.forEach(prot => {
    prot.scheduledTimes.forEach((time: string) => {
      const [h, m] = time.split(':').map(Number);
      const scheduledAt = new Date(forDate);
      scheduledAt.setHours(h, m, 0, 0);

      tasks.push({
        id: `task_${prot.id}_${time}`,
        kind: 'massage',
        title: prot.name,
        subtitle: `${prot.durationMin} daqiqa · ${prot.bodyPart}`,
        scheduledAt: scheduledAt.toISOString(),
        durationMin: prot.durationMin,
        status: scheduledAt < new Date() ? 'overdue' : 'pending',
        source: { type: 'protocol', refId: prot.id },
        metadata: { bodyPart: prot.bodyPart },
        importance: 'high',
      });
    });
  });

  return tasks.sort((a, b) =>
    new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
  );
}
