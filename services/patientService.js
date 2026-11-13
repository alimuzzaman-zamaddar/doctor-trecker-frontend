import api from '@/lib/api';
import { cleanParams } from '@/lib/utils';

export const patientService = {
  async getPatients(params = {}) {
    const { data } = await api.get('/patients', { params: cleanParams(params) });
    return data;
  },

  async getPatient(id) {
    const { data } = await api.get(`/patients/${id}`);
    return data;
  },

  async createPatient(payload) {
    const { data } = await api.post('/patients', payload);
    return data;
  },

  async updatePatient(id, payload) {
    const { data } = await api.put(`/patients/${id}`, payload);
    return data;
  },

  async deletePatient(id) {
    const { data } = await api.delete(`/patients/${id}`);
    return data;
  },
};
