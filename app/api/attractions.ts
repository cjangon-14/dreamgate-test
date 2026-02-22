/**
 * Attractions API
 *
 * Placeholder REST calls for the /attractions endpoints.
 * Replace the local `attractions` fallback with real API calls once
 * the backend is ready — just remove the try/catch fallbacks below.
 *
 * Endpoints assumed:
 *   GET    /attractions          – list all
 *   GET    /attractions/:id      – single
 *   POST   /attractions          – create (admin)
 *   PUT    /attractions/:id      – full update (admin)
 *   PATCH  /attractions/:id      – partial update (admin)
 *   DELETE /attractions/:id      – delete (admin)
 */

import { apiClient } from './client';
import type { Attraction } from '../types';

// ─── Queries ──────────────────────────────────────────────────────────────────

/** Fetch all attractions, optionally filtered by category or featured flag. */
export async function getAttractions(params?: {
  category?: Attraction['category'];
  featured?: boolean;
}): Promise<Attraction[]> {
  // TODO: remove fallback once API is live
  // const query = new URLSearchParams(params as Record<string, string>).toString();
  // const { data } = await apiClient.get<Attraction[]>(`/attractions?${query}`);
  // return data;

  // --- PLACEHOLDER: using local data until API is ready ---
  const { attractions } = await import('../data/attractions');
  let result = [...attractions];
  if (params?.category) result = result.filter((a) => a.category === params.category);
  if (params?.featured !== undefined) result = result.filter((a) => a.featured === params.featured);
  return result;
}

/** Fetch a single attraction by ID. */
export async function getAttractionById(id: string): Promise<Attraction | undefined> {
  // TODO: remove fallback once API is live
  // const { data } = await apiClient.get<Attraction>(`/attractions/${id}`);
  // return data;

  const { attractions } = await import('../data/attractions');
  return attractions.find((a) => a.id === id);
}

// ─── Mutations (Admin) ────────────────────────────────────────────────────────

/** Create a new attraction. */
export async function createAttraction(
  payload: Omit<Attraction, 'id'>
): Promise<Attraction> {
  // TODO: uncomment once API is live
  // const { data } = await apiClient.post<Attraction>('/attractions', payload);
  // return data;
  throw new Error('createAttraction: API not yet connected.');
}

/** Fully replace an existing attraction. */
export async function updateAttraction(
  id: string,
  payload: Omit<Attraction, 'id'>
): Promise<Attraction> {
  // TODO: uncomment once API is live
  // const { data } = await apiClient.put<Attraction>(`/attractions/${id}`, payload);
  // return data;
  throw new Error('updateAttraction: API not yet connected.');
}

/** Partially update an existing attraction. */
export async function patchAttraction(
  id: string,
  payload: Partial<Omit<Attraction, 'id'>>
): Promise<Attraction> {
  // TODO: uncomment once API is live
  // const { data } = await apiClient.patch<Attraction>(`/attractions/${id}`, payload);
  // return data;
  throw new Error('patchAttraction: API not yet connected.');
}

/** Delete an attraction by ID. */
export async function deleteAttraction(id: string): Promise<void> {
  // TODO: uncomment once API is live
  // await apiClient.delete(`/attractions/${id}`);
  throw new Error('deleteAttraction: API not yet connected.');
}
