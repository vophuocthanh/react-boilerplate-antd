export const LocalStorageEventTarget = new EventTarget();

export const setAccessTokenToLS = (access: string) => {
  localStorage.setItem('access', access);
};

export const setRefreshTokenToLS = (refresh: string) => {
  localStorage.setItem('refresh', refresh);
};

export const clearLS = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('profile');
  const clearLSEvent = new Event('clearLS');
  LocalStorageEventTarget.dispatchEvent(clearLSEvent);
};

export const getAccessTokenFromLS = () =>
  localStorage.getItem('access_token') || '';

export const getRefreshTokenFromLS = () =>
  localStorage.getItem('refresh_token') || '';

export const getProfileFromLS = () => {
  const result = localStorage.getItem('profile');
  return result ? JSON.parse(result) : null;
};
