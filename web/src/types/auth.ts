export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  dateOfBirth: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
}

export interface AuthResponse {
  token: string;
  id?: string;
  _id?: string;
  name?: string;
  email?: string;
  dateOfBirth?: string;
  user?: User;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
}
export type LoginResponse = AuthResponse;
export type RegisterResponse = AuthResponse;
