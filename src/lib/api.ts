export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('thulir_token');
  }
  return null;
};

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const headers = new Headers(options.headers || {});
  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Request failed with status ${response.status}`);
  }

  return response.json();
};
