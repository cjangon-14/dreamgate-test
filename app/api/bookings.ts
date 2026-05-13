import type {
  BookingResponse,
  CreateBookingPayload,
} from "~/data/bookings";
import {
  createBooking as createBookingLocal,
  getBookingByCode as getBookingByCodeLocal,
  getBookingById as getBookingByIdLocal,
  getBookingStatus as getBookingStatusLocal,
  getMyBookings as getMyBookingsLocal,
  cancelBooking as cancelBookingLocal,
  completeBookingPayment as completeBookingPaymentLocal,
} from "~/data/bookings";

export type { BookingResponse, CreateBookingPayload };
export type { BookingStatus } from "~/data/bookings";

export async function createBooking(
  payload: CreateBookingPayload,
): Promise<BookingResponse> {
  return createBookingLocal(payload);
}

export async function getBookingByCode(code: string): Promise<BookingResponse> {
  return getBookingByCodeLocal(code);
}

export async function getBookingById(id: number): Promise<BookingResponse> {
  return getBookingByIdLocal(id);
}

export async function getBookingStatus(code: string): Promise<number> {
  return getBookingStatusLocal(code);
}

export async function getMyBookings(): Promise<BookingResponse[]> {
  return getMyBookingsLocal();
}

export async function cancelBooking(code: string): Promise<BookingResponse> {
  return cancelBookingLocal(code);
}

export async function completeBookingPayment(
  code: string,
): Promise<BookingResponse> {
  return completeBookingPaymentLocal(code);
}
