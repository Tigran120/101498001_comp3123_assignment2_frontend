import axios from 'axios';

// For Docker: use /api (proxied by nginx), for local: use localhost
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (window.location.hostname === 'localhost' && window.location.port === '3000' 
    ? 'http://localhost:3001/api' 
    : '/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
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

// Handle 401 errors (unauthorized)
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

// Auth APIs
export const signup = (email, password) => {
  return api.post('/auth/signup', { email, password });
};

export const login = (email, password) => {
  return api.post('/auth/login', { email, password });
};

// Employee APIs
export const getEmployees = () => {
  return api.get('/employees');
};

export const getEmployeeById = (id) => {
  return api.get(`/employees/${id}`);
};

export const createEmployee = (employeeData) => {
  return api.post('/employees', employeeData);
};

export const updateEmployee = (id, employeeData) => {
  return api.put(`/employees/${id}`, employeeData);
};

export const deleteEmployee = (id) => {
  return api.delete(`/employees/${id}`);
};

export const searchEmployees = (searchTerm) => {
  return api.get(`/employees?search=${encodeURIComponent(searchTerm)}`);
};

export default api;

