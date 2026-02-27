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

//----- http://192.168.122.80:8000/api/client/v1/packages----- //

import type { Attraction } from '../types';

const API_PACKAGES_URL = import.meta.env.VITE_API_PACKAGES_URL;
const API_ATTRACTIONS_URL = import.meta.env.VITE_API_PACKAGES_ATTRACTIONS_URL;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fetchList = (url: string): Promise<any[]> =>
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) =>
      Array.isArray(data)
        ? data
        : (data.data ?? data.results ?? data.packages ?? [])
    );

// ─── Queries ──────────────────────────────────────────────────────────────────

/** Fetch all packages merged with their nested attractions. */
export async function getAttractions(): Promise<Attraction[]> {
  const [packagesList, attractionsList] = await Promise.all([
    fetchList(API_PACKAGES_URL),
    API_ATTRACTIONS_URL
      ? fetchList(API_ATTRACTIONS_URL)
      : Promise.resolve([]),
  ]);

  // Map attractions data from attractionsList by package id
  const attractionsMap = new Map<string, any[]>(
    attractionsList.map((a: any) => [String(a.id), a.attractions])
  );

  const seenIds = new Set(packagesList.map((a: any) => String(a.id)));

  return [
    ...packagesList.map((item: Attraction) => ({
      ...item,
      attractions: attractionsMap.get(String(item.id)) ?? item.attractions,
    })),
    ...attractionsList.filter((a: any) => !seenIds.has(String(a.id))),
  ] as Attraction[];
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
