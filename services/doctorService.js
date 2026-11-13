import api from '@/lib/api';
import { cleanParams } from '@/lib/utils';

export const doctorService = {
  async getDoctors(params = {}) {
    const { data } = await api.get('/doctors', { params: cleanParams(params) });
    return data;
  },

  async getDoctor(id) {
    const { data } = await api.get(`/doctors/${id}`);
    return data;
  },

  async createDoctor(payload) {
    const { data } = await api.post('/doctors', payload);
    return data;
  },

  async updateDoctor(id, payload) {
    const { data } = await api.put(`/doctors/${id}`, payload);
    return data;
  },

  async deleteDoctor(id) {
    const { data } = await api.delete(`/doctors/${id}`);
    return data;
  },

  async getDoctorPatients(id, params = {}) {
    const { data } = await api.get(`/doctors/${id}/patients`, {
      params: cleanParams(params),
    });
    return data;
  },
};
