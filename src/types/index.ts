// src/types/index.ts
// Sog'lomBola AI — TypeScript tiplar
// =====================================================

/* ---------- Bemor (Bola) ---------- */
export interface Patient {
  id: string;
  fullName: string;
  birthDate: string;       // ISO
  ageMonths: number;
  gender: 'male' | 'female';
  weightKg: number;
  heightCm: number;
  bloodType?: string;
  parentName: string;
  parentPhone: string;
  avatarUrl?: string;
  dmedId: string;          // D-Med tizimi ID
  syncedAt: string;        // Oxirgi sinxronizatsiya
}

/* ---------- Tashxis ---------- */
export interface Diagnosis {
  id: string;
  code: string;            // ICD-10
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  doctorName: string;
  hospital: string;
  diagnosedAt: string;
  treatmentDurationDays: number;
  notes?: string;
}

/* ---------- Allergiya ---------- */
export interface Allergy {
  id: string;
  substance: string;
  type: 'drug' | 'food' | 'environmental';
  reaction: string;
  severity: 'low' | 'medium' | 'high';
}

/* ---------- E-Retsept (Dori) ---------- */
export interface Prescription {
  id: string;
  medicineName: string;
  activeIngredient: string;
  category: 'antibiotic' | 'vitamin' | 'antiviral' | 'painkiller' | 'probiotic' | 'other';
  dosage: string;          // "5ml" yoki "1 tabletka"
  frequency: number;       // Kuniga necha marta
  timesOfDay: string[];    // ["08:00", "20:00"]
  durationDays: number;
  startDate: string;
  endDate: string;
  withFood: 'before' | 'after' | 'with' | 'any';
  prescribedBy: string;
  warnings?: string[];
}

/* ---------- Massaj/Fizioterapiya protokoli ---------- */
export interface MassageProtocol {
  id: string;
  name: string;
  type: 'general' | 'targeted' | 'physiotherapy';
  bodyPart: string;
  durationMin: number;
  totalSessions: number;
  completedSessions: number;
  scheduledTimes: string[]; // ["10:30"]
  specialistId?: string;
  location: 'home' | 'clinic';
}

/* ---------- Tahlil natijasi ---------- */
export interface LabResult {
  id: string;
  testName: string;
  result: string;
  unit?: string;
  normalRange?: string;
  status: 'normal' | 'high' | 'low' | 'critical';
  takenAt: string;
}

/* ---------- Bugungi vazifa (To-Do) ---------- */
export type TaskKind = 'medicine' | 'massage' | 'meal' | 'exercise' | 'measurement';
export type TaskStatus = 'pending' | 'completed' | 'skipped' | 'overdue';

export interface DailyTask {
  id: string;
  kind: TaskKind;
  title: string;
  subtitle: string;
  scheduledAt: string;     // ISO
  durationMin?: number;
  status: TaskStatus;
  completedAt?: string;
  source: {                // Qaysi retsept/protokoldan
    type: 'prescription' | 'protocol' | 'ai-suggestion';
    refId: string;
  };
  metadata?: {
    medicineName?: string;
    dosage?: string;
    bodyPart?: string;
    foodItems?: string[];
    withFood?: string;
  };
  importance: 'critical' | 'high' | 'medium' | 'low';
}

/* ---------- AI tavsiya (Nutri-Care) ---------- */
export interface NutriCareAdvice {
  generatedAt: string;
  forDate: string;
  recommendedFoods: FoodSuggestion[];
  forbiddenFoods: ForbiddenFood[];
  supplementaryVitamins: VitaminSuggestion[];
  reasoning: string;       // AI tushuntirish
  hydrationGoalMl: number;
}

export interface FoodSuggestion {
  name: string;
  category: 'protein' | 'carb' | 'fat' | 'fruit' | 'vegetable' | 'dairy';
  reason: string;
  servingSize: string;
  bestTime: 'morning' | 'noon' | 'evening' | 'any';
  emoji: string;
}

export interface ForbiddenFood {
  name: string;
  reason: string;
  withMedicine?: string;   // Qaysi dori bilan
  emoji: string;
}

export interface VitaminSuggestion {
  name: string;
  reason: string;
  dosage: string;
  priority: 'must' | 'recommended' | 'optional';
}

/* ---------- AI Xavf tahlili ---------- */
export interface RiskAnalysis {
  generatedAt: string;
  overallTreatmentProgress: number; // 0..100
  daysCompleted: number;
  daysRemaining: number;
  adherenceRate: number;            // 0..100 — bajarish foizi
  risks: RiskItem[];
  aiSummary: string;
}

export interface RiskItem {
  id: string;
  type: 'resistance' | 'relapse' | 'complication' | 'malnutrition';
  level: 'low' | 'medium' | 'high' | 'critical';
  probabilityPct: number;           // 0..100
  title: string;
  description: string;
  triggeredBy: string[];            // ["Skipped antibiotic at 15:00"]
  recommendation: string;
}

/* ---------- Smart Booking (Shifokor) ---------- */
export interface Doctor {
  id: string;
  fullName: string;
  specialty: string;
  hospital: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  avatarUrl?: string;
  matchScore?: number;              // AI moslik foizi
  matchReason?: string;
  pricePerSession?: number;
  availableSlots?: TimeSlot[];
  distanceKm?: number;
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

/* ---------- API javoblari uchun yordamchi ---------- */
export interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
}
