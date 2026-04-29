// src/data/mock-labs.ts
import type { LabResult } from '@/types';

export const MOCK_LAB_RESULTS: LabResult[] = [
  { id: 'lab_1', testName: 'Hemoglobin', result: '11.8', unit: 'g/dL', normalRange: '11-13.5', status: 'normal', takenAt: '2026-04-14T08:00:00Z' },
  { id: 'lab_2', testName: 'Leykositlar', result: '14.2', unit: '×10⁹/L', normalRange: '5-15', status: 'normal', takenAt: '2026-04-14T08:00:00Z' },
  { id: 'lab_3', testName: 'CRP (yallig\'lanish)', result: '24', unit: 'mg/L', normalRange: '0-10', status: 'high', takenAt: '2026-04-14T08:00:00Z' },
  { id: 'lab_4', testName: 'Vitamin D', result: '18', unit: 'ng/mL', normalRange: '30-100', status: 'low', takenAt: '2026-04-14T08:00:00Z' },
  { id: 'lab_5', testName: 'Glyukoza', result: '4.8', unit: 'mmol/L', normalRange: '3.3-5.5', status: 'normal', takenAt: '2026-04-14T08:00:00Z' },
];
