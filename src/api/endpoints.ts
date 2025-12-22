export const API_ENDPOINTS = {
  POSTS: {
    GET_ALL: '/posts',
    GET_BY_ID: (id: string) => `/posts/${id}`,
    SEARCH: '/posts/search',
    CREATE: '/posts',
    UPDATE: (id: string) => `/posts/${id}`,
    DELETE: (id: string) => `/posts/${id}`,
  },
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    VALIDATE: '/auth/validate',
  },
} as const;
