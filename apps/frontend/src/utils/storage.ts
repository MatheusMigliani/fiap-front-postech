const AUTH_TOKEN_KEY = 'auth_token';

/**
 * @deprecated Autenticação agora usa httpOnly cookies.
 * Esta função está mantida apenas por compatibilidade temporária.
 * Será removida em versão futura.
 */
export const setAuthToken = (token: string): void => {
  console.warn(
    'setAuthToken está depreciado. A autenticação agora usa httpOnly cookies gerenciados automaticamente pelo navegador.'
  );
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

/**
 * @deprecated Autenticação agora usa httpOnly cookies.
 * Esta função está mantida apenas por compatibilidade temporária.
 * Será removida em versão futura.
 */
export const getStoredToken = (): string | null => {
  console.warn(
    'getStoredToken está depreciado. A autenticação agora usa httpOnly cookies gerenciados automaticamente pelo navegador.'
  );
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

/**
 * @deprecated Autenticação agora usa httpOnly cookies.
 * Esta função está mantida apenas por compatibilidade temporária.
 * Será removida em versão futura.
 */
export const removeAuthToken = (): void => {
  console.warn(
    'removeAuthToken está depreciado. A autenticação agora usa httpOnly cookies gerenciados automaticamente pelo navegador.'
  );
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
