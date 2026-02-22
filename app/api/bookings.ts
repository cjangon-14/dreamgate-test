/**
 * Bookings API
 *
 * Placeholder REST calls for the /bookings endpoints.
 * Swap the `throw new Error` stubs for real `apiClient` calls once
 * the backend is ready.
 *
 * Endpoints assumed:
 *   GET    /bookings             – list bookings for the current user
 *   GET    /bookings/:id         – single booking detail
 *   POST   /bookings             – create / place a new booking
 *   PATCH  /bookings/:id/cancel  – cancel a booking
 *   GET    /bookings/:id/status  – poll booking status
 */

import { apiClient } from './client';

// ─── Types ────────────────────────────────────────────────────────────────────

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'refunded';

export interface BookingItem {
  attractionId: string;
  quantity: number;
  /** Unit price at time of booking */
  unitPrice: number;
}

export interface Booking {
  id: string;
  userId: string;
  items: BookingItem[];
  totalAmount: number;
  status: BookingStatus;
  visitDate: string; // ISO date string, e.g. "2026-03-15"
  createdAt: string;
  updatedAt: string;
  referenceNumber: string;
}

export interface CreateBookingPayload {
  items: BookingItem[];
  visitDate: string;
  /** Optional promo/voucher code */
  promoCode?: string;
}

// ─── Queries ──────────────────────────────────────────────────────────────────

/** Fetch all bookings for the currently authenticated user. */
export async function getMyBookings(): Promise<Booking[]> {
  // TODO: uncomment once API is live
  // const { data } = await apiClient.get<Booking[]>('/bookings');
  // return data;
  throw new Error('getMyBookings: API not yet connected.');
}

/** Fetch a single booking by ID. */
export async function getBookingById(id: string): Promise<Booking> {
  // TODO: uncomment once API is live
  // const { data } = await apiClient.get<Booking>(`/bookings/${id}`);
  // return data;
  throw new Error('getBookingById: API not yet connected.');
}

/** Poll the status of a booking (useful after payment). */
export async function getBookingStatus(id: string): Promise<BookingStatus> {
  // TODO: uncomment once API is live
  // const { data } = await apiClient.get<{ status: BookingStatus }>(`/bookings/${id}/status`);
  // return data.status;
  throw new Error('getBookingStatus: API not yet connected.');
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/** Place a new booking. Returns the created booking including reference number. */
export async function createBooking(
  payload: CreateBookingPayload
): Promise<Booking> {
  // TODO: uncomment once API is live
  // const { data } = await apiClient.post<Booking>('/bookings', payload);
  // return data;
  throw new Error('createBooking: API not yet connected.');
}

/** Cancel an existing booking by ID. */
export async function cancelBooking(id: string): Promise<Booking> {
  // TODO: uncomment once API is live
  // const { data } = await apiClient.patch<Booking>(`/bookings/${id}/cancel`, {});
  // return data;
  throw new Error('cancelBooking: API not yet connected.');
}
