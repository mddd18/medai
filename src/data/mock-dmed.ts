// src/data/mock-dmed.ts
// D-Med tizimidan keladigan haqiqiy ma'lumotlarni taqlid qiluvchi mock
// =====================================================================
import type {
  Patient,
  Diagnosis,
  Allergy,
  Prescription,
  MassageProtocol,
  LabResult,
} from '@/types';

/* ===== Bemor (Bola) ===== */
export const MOCK_PATIENT: Patient = {
  id: 'pt_aziza_2024',
  fullName: 'Aziza Karimova',
  birthDate: '2024-08-15',
  ageMonths: 20,
  gender: 'female',
  weightKg: 11.2,
  heightCm: 82,
  bloodType: 'A+',
  parentName: 'Madina Karimova',
  parentPhone: '+998 90 123 45 67',
  dmedId: 'DMED-UZ-7821-2024',
  syncedAt: new Date().toISOString(),
};

/* ===== Tashxis ===== */
export const MOCK_DIAGNOSIS: Diagnosis = {
  id: 'dx_001',
  code: 'J20.9',
  name: 'O\'tkir bronxit',
  severity: 'moderate',
  doctorName: 'Dr. Olim Rahmonov',
  hospital: '14-bolalar poliklinikasi',
  diagnosedAt: '2026-04-14T09:30:00Z',
  treatmentDurationDays: 21,
  notes: 'Ota-onalar belgilangan kursni to\'liq yakunlashlari muhim. Antibiotikni belgilangan vaqtda uzlukziz qabul qiling.',
};

/* ===== Allergiyalar ===== */
export const MOCK_ALLERGIES: Allergy[] = [
  { id: 'al_1', substance: 'Penitsillin', type: 'drug', reaction: 'Toshma', severity: 'high' },
  { id: 'al_2', substance: 'Tuxum oqsili', type: 'food', reaction: 'Qichish', severity: 'medium' },
];

/* ===== E-Retseptlar (D-Med'dan kelgan) ===== */
export const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx_001',
    medicineName: 'Cefixim suspenziya',
    activeIngredient: 'Cefixime 100mg/5ml',
    category: 'antibiotic',
    dosage: '5 ml',
    frequency: 2,
    timesOfDay: ['08:00', '20:00'],
    durationDays: 7,
    startDate: '2026-04-14',
    endDate: '2026-04-21',
    withFood: 'after',
    prescribedBy: 'Dr. Olim Rahmonov',
    warnings: [
      'Kursni to\'liq yakunlash shart, hatto belgilar yo\'qolsa ham',
      'Sutli mahsulotlar bilan birga qabul qilmang',
    ],
  },
  {
    id: 'rx_002',
    medicineName: 'Linex bolalar uchun',
    activeIngredient: 'Lactobacillus + Bifidobacterium',
    category: 'probiotic',
    dosage: '1 paketcha',
    frequency: 2,
    timesOfDay: ['09:00', '21:00'],
    durationDays: 14,
    startDate: '2026-04-14',
    endDate: '2026-04-28',
    withFood: 'with',
    prescribedBy: 'Dr. Olim Rahmonov',
    warnings: ['Antibiotikdan kamida 1 soat keyin'],
  },
  {
    id: 'rx_003',
    medicineName: 'Vitamin D3',
    activeIngredient: 'Cholecalciferol',
    category: 'vitamin',
    dosage: '1 tomchi (500 IU)',
    frequency: 1,
    timesOfDay: ['10:00'],
    durationDays: 30,
    startDate: '2026-04-14',
    endDate: '2026-05-14',
    withFood: 'after',
    prescribedBy: 'Dr. Olim Rahmonov',
  },
  {
    id: 'rx_004',
    medicineName: 'Ibuprofen suspenziya',
    activeIngredient: 'Ibuprofen 100mg/5ml',
    category: 'painkiller',
    dosage: '2.5 ml',
    frequency: 3,
    timesOfDay: ['07:00', '13:00', '19:00'],
    durationDays: 3,
    startDate: '2026-04-14',
    endDate: '2026-04-17',
    withFood: 'after',
    prescribedBy: 'Dr. Olim Rahmonov',
    warnings: ['Faqat isitma 38°C dan yuqori bo\'lsa'],
  },
];

/* ===== Massaj/Fizioterapiya protokollari ===== */
export const MOCK_PROTOCOLS: MassageProtocol[] = [
  {
    id: 'mp_001',
    name: 'Ko\'krak qafasi vibratsion massaji',
    type: 'physiotherapy',
    bodyPart: 'Ko\'krak qafasi va orqa',
    durationMin: 15,
    totalSessions: 10,
    completedSessions: 6,
    scheduledTimes: ['10:30'],
    specialistId: 'doc_dilnoza',
    location: 'clinic',
  },
  {
    id: 'mp_002',
    name: 'Yengil tinchlantiruvchi massaj',
    type: 'general',
    bodyPart: 'Butun tana',
    durationMin: 10,
    totalSessions: 14,
    completedSessions: 9,
    scheduledTimes: ['19:00'],
    location: 'home',
  },
];

/* ===== Tahlillar ===== */
export const MOCK_LAB_RESULTS: LabResult[] = [
  { id: 'lab_1', testName: 'Hemoglobin', result: '11.8', unit: 'g/dL', normalRange: '11-13.5', status: 'normal', takenAt: '2026-04-14T08:00:00Z' },
  { id: 'lab_2', testName: 'Leykositlar', result: '14.2', unit: '×10⁹/L', normalRange: '5-15', status: 'normal', takenAt: '2026-04-14T08:00:00Z' },
  { id: 'lab_3', testName: 'CRP (yallig\'lanish)', result: '24', unit: 'mg/L', normalRange: '0-10', status: 'high', takenAt: '2026-04-14T08:00:00Z' },
  { id: 'lab_4', testName: 'Vitamin D', result: '18', unit: 'ng/mL', normalRange: '30-100', status: 'low', takenAt: '2026-04-14T08:00:00Z' },
];
