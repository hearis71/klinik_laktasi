import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API methods
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getVisits: () => api.get('/dashboard/visits'),
  getQueueStatus: () => api.get('/dashboard/queue-status'),
  getTopDiagnosis: () => api.get('/dashboard/top-diagnosis'),
  getTopTindakan: () => api.get('/dashboard/top-tindakan'),
};

export const pasienAPI = {
  getAll: (params) => api.get('/pasien', { params }),
  getById: (id) => api.get(`/pasien/${id}`),
  create: (data) => api.post('/pasien', data),
  update: (id, data) => api.put(`/pasien/${id}`, data),
  delete: (id) => api.delete(`/pasien/${id}`),
};

export const kunjunganAPI = {
  getAll: (params) => api.get('/kunjungan', { params }),
  getById: (id) => api.get(`/kunjungan/${id}`),
  create: (data) => api.post('/kunjungan', data),
  update: (id, data) => api.put(`/kunjungan/${id}`, data),
};

export default api;