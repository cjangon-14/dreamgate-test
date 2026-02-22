/**
 * API barrel export
 *
 * Import everything you need from '~/api' rather than individual modules.
 *
 * Example:
 *   import { getAttractions, createBooking } from '~/api';
 */

export { apiClient } from './client';
export type { ApiResponse, ApiError } from './client';

export {
  getAttractions,
  getAttractionById,
  createAttraction,
  updateAttraction,
  patchAttraction,
  deleteAttraction,
} from './attractions';

export {
  getMyBookings,
  getBookingById,
  getBookingStatus,
  createBooking,
  cancelBooking,
} from './bookings';

export type {
  Booking,
  BookingItem,
  BookingStatus,
  CreateBookingPayload,
} from './bookings';
