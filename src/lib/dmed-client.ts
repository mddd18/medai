// src/lib/dmed-client.ts
// D-Med va AI API'lar mijozi (kengaytirilgan)
// =====================================================
import type {
  Patient, Diagnosis, Allergy, Prescription, MassageProtocol,
  LabResult, DailyTask, NutriCareAdvice, RiskAnalysis, Doctor,
} from '@/types';

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) },
    cache: 'no-store',
  });
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || 'API error');
  return json.data as T;
}

export const dmedClient = {
  fetchPatient: () =>
    api<{ patient: Patient; diagnosis: Diagnosis; allergies: Allergy[] }>('/api/dmed/patient'),

  fetchPrescriptions: () =>
    api<{ prescriptions: Prescription[]; protocols: MassageProtocol[] }>('/api/dmed/prescriptions'),

  fetchLabResults: () => api<LabResult[]>('/api/dmed/lab-results'),

  fetchTasks: () => api<DailyTask[]>('/api/tasks'),

  updateTask: (id: string, status: 'completed' | 'skipped' | 'pending') =>
    api(`/api/tasks/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  fetchNutriCare: () => api<NutriCareAdvice>('/api/ai/nutri-care', { method: 'POST' }),

  fetchRiskAnalysis: (tasks: DailyTask[]) =>
    api<RiskAnalysis>('/api/ai/risk-analysis', {
      method: 'POST',
      body: JSON.stringify({ tasks }),
    }),

  fetchDoctors: (params?: { type?: string; search?: string; lat?: number; lng?: number }) => {
    const q = new URLSearchParams();
    if (params?.type) q.set('type', params.type);
    if (params?.search) q.set('q', params.search);
    if (params?.lat) q.set('lat', String(params.lat));
    if (params?.lng) q.set('lng', String(params.lng));
    return api<Doctor[]>(`/api/booking/doctors?${q.toString()}`);
  },

  reserveBooking: (doctorId: string, slot: string, patientId: string) =>
    api<{ bookingId: string; status: string; qrCode: string }>(
      '/api/booking/reserve',
      { method: 'POST', body: JSON.stringify({ doctorId, slot, patientId }) }
    ),
};
