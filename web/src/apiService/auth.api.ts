import axios from 'axios';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
  ApiError,
  User,
} from '../types/auth';

const API_BASE_URL = 'http://localhost:8000/api/auth';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.error || 'Unknown error occured',
      statusCode: error.response?.status,
      code: error.code,
      errors: error.response?.data?.errors,
    };
    return Promise.reject(apiError);
  },
);

export const authApi = {
  login: async (Credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await api.post('/login', Credentials);
    return data;
  },
  register: async (Credentials: RegisterCredentials): Promise<AuthResponse> => {
    const { data } = await api.post('/register', Credentials);
    return data;
  },
  getAllUsers: async (): Promise<User[]> => {
    const token = localStorage.getItem('token');
    const { data } = await api.get('/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
  deleteUser: async (userId: string): Promise<{ message: string }> => {
    const token = localStorage.getItem('token');
    const { data } = await api.delete(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
};
