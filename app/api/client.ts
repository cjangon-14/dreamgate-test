/**
 * Base API Client
 *
 * Replace `API_BASE_URL` with your actual backend URL (e.g. from an env variable).
 * All resource modules use this client so you only need to change it once.
 *
 * Usage:
 *   import { apiClient } from '~/api/client';
 *   const data = await apiClient.get('/attractions');
 */

// TODO: replace with actual API base URL or import from env
// e.g. const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = 'https://api.example.com/v1';

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${path}`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      // TODO: attach auth token here if needed
      // Authorization: `Bearer ${getToken()}`,
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error: ApiError = {
      message: res.statusText,
      status: res.status,
    };

    try {
      const body = await res.json();
      error.message = body.message ?? res.statusText;
      error.errors = body.errors;
    } catch {
      // non-JSON error body — keep defaults
    }

    throw error;
  }

  return res.json() as Promise<ApiResponse<T>>;
}

export const apiClient = {
  get: <T>(path: string, init?: RequestInit) =>
    request<T>(path, { method: 'GET', ...init }),

  post: <T>(path: string, body: unknown, init?: RequestInit) =>
    request<T>(path, {
      method: 'POST',
      body: JSON.stringify(body),
      ...init,
    }),

  put: <T>(path: string, body: unknown, init?: RequestInit) =>
    request<T>(path, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...init,
    }),

  patch: <T>(path: string, body: unknown, init?: RequestInit) =>
    request<T>(path, {
      method: 'PATCH',
      body: JSON.stringify(body),
      ...init,
    }),

  delete: <T>(path: string, init?: RequestInit) =>
    request<T>(path, { method: 'DELETE', ...init }),
};
