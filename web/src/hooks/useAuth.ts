import { useMutation } from '@tanstack/react-query';
import { authApi } from '../apiService/auth.api';
import type {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  ApiError,
} from '../types/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';

export const useAuth = () => {
  const navigate = useNavigate();

  const handleAuthSuccess = (data: AuthResponse) => {
    const user = {
    id: data._id || data.id,
    name: data.name,
    email: data.email,
    dateOfBirth: data.dateOfBirth
  };
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(user));
    toast.success(`Welcome ${user.name}`);
    navigate('/dashboard');
  };

  // Login
  const loginMutation = useMutation<
    AuthResponse,
    AxiosError<ApiError>,
    LoginCredentials
  >({
    mutationFn: authApi.login,
    onSuccess: handleAuthSuccess,
    onError: (error) => {
      const message = error.response?.data?.message || 'Login Failed';
      toast.error(message);
    },
  });

  // Register
  const registerMutation = useMutation<
    AuthResponse,
    AxiosError<ApiError>,
    RegisterCredentials
  >({
    mutationFn: authApi.register,
    onSuccess: handleAuthSuccess,
    onError: (error) => {
      const message = error.response?.data?.message || 'Registration Failed';
      toast.error(message);
    },
  });

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logout Successfull');
    navigate('/login');
  };

  // Get USer from LocalStorage
  const getUser = () => {
    try {
      const userData = localStorage.getItem('user');

      // Handle cases where stored value is "undefined" string
      if (userData === 'undefined' || userData === null) {
        return null;
      }

      return JSON.parse(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      // Clear invalid user data
      localStorage.removeItem('user');
      return null;
    }
  };
  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    error: loginMutation.error || registerMutation.error,
    user: getUser(),
  };
};
