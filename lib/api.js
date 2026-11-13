import axios from 'axios';

/**
 * One Axios instance for the whole app.
 * - NEXT_PUBLIC_API_URL is set in .env.local.
 * - withCredentials is required so the browser sends the backend's HttpOnly
 *   authentication cookie with every request.
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// If a session expires while the app is open, let the AuthProvider react.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const isLoginRequest = error.config?.url?.includes('/auth/login');

    if (status === 401 && !isLoginRequest && typeof window !== 'undefined') {
      window.dispatchEvent(new Event('auth:unauthorized'));
    }

    return Promise.reject(error);
  }
);

/** Read the API's error message with a safe fallback. */
export function getErrorMessage(error, fallback = 'Something went wrong. Please try again.') {
  if (error?.code === 'ECONNABORTED') {
    return 'The request took too long. Please check that the backend is running.';
  }

  if (!error?.response) {
    return 'Cannot reach the server. Make sure the backend is running on port 5000.';
  }

  return error.response.data?.message || fallback;
}

/** Read field-level validation errors returned by express-validator. */
export function getFieldErrors(error) {
  const errors = error?.response?.data?.errors;
  return Array.isArray(errors) ? errors : [];
}

export default api;
