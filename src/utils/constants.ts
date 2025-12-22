export const APP_NAME = 'FIAP Blog';
export const APP_VERSION = '1.0.0';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  POST_DETAIL: '/posts/:id',
  CREATE_POST: '/posts/create',
  EDIT_POST: '/posts/edit/:id',
  ADMIN: '/admin',
} as const;
