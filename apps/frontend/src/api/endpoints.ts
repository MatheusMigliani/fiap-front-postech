export const API_ENDPOINTS = {
  POSTS: {
    GET_ALL: '/api/posts',
    GET_BY_ID: (id: string) => `/api/posts/${id}`,
    SEARCH: '/api/posts/search',
    CREATE: '/api/posts',
    UPDATE: (id: string) => `/api/posts/${id}`,
    DELETE: (id: string) => `/api/posts/${id}`,
  },
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    ME: '/api/auth/me',
  },
} as const;
