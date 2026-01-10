export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// API Response types (backend wrapper)
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface LoginApiResponse {
  user: User;
  token: string;
}

export interface MeApiResponse {
  user: User;
}
