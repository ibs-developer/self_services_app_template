// src/api/apiClient.ts
import axios from 'axios';
import { Odoo_Domain } from '@env';
import { useLoginStore } from '@/hooks/loginStore';

const api = axios.create({
  baseURL: Odoo_Domain,
});

api.interceptors.request.use((config) => {
  const state = useLoginStore.getState();
  const { user } = state;

  if (user?.access_token) {
    // Set as Bearer token in Authorization header
    config.headers['Authorization'] = `Bearer ${user.access_token}`;
  }

  return config;
});

// intercept the response
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const status = err?.response?.status || null;
    const state = useLoginStore.getState();
    const { resetUser } = state;
    // if unauthorized redirect to login page
    if (status === 403) {
      resetUser();
    }
    return Promise.reject(err);
  },
);

export default api;
