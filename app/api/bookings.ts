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

import { apiClient } from "./client";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'refunded';

export interface CreateBookingPayload {
  last_name: string;
  first_name: string;
  email: string;
  mobile_no: string;
  age: number;
  gender: string;
  address: string;
  slot_date: string;
  packages: {
    id: number;
    attractions: number[];
    add_ons: { id: number; quantity: number }[];
    discount_id: number | null;
  }[];
}

export interface BookingResponse {
  id: number;
  booking_code: string;
  name: string;
  email: string;
  mobile_no: string;
  gender: string;
  address: string;
  slot_date: string;
  base_amount: number;
  status: number;
  payment_details: {
    payment_link: string;
    amount_due: string;
    expires_at: string;
    reference_no: string | null;
    status: number;
  };
}

interface ApiEnvelope<T> {
  status: number;
  message: string;
  data: T;
}


// ─── Mutations ────────────────────────────────────────────────────────────────

/** Place a new booking. Returns the created booking including reference number. */
export async function createBooking(
  payload: CreateBookingPayload,
): Promise<BookingResponse> {
  const { data } = await apiClient.post<ApiEnvelope<BookingResponse>>("/bookings", payload);
  return data.data;
}

/** Fetch a single booking by its booking code. */
export async function getBookingByCode(code: string): Promise<BookingResponse> {
  const { data } = await apiClient.get<ApiEnvelope<BookingResponse>>(`/bookings/${code}`);
  return data.data;
}
