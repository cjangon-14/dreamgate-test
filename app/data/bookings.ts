import axios from "axios";

export type BookingStatus = 0 | 1 | 2 | 3 | 4;

import { attractions } from "~/data/attractions";

export interface BookingPackageItem {
  id: string;
  attractions: string[];
  add_ons: { id: string; quantity: number; price: number }[];
  discount_id: number | null;
  quantity: number;
}

export interface CreateBookingPayload {
  first_name: string;
  middle_name?: string;
  last_name: string;
  suffix?: string;
  email: string;
  mobile_no: string;
  age: number;
  gender: string;
  address: string;
  slot_date: string;
  packages: BookingPackageItem[];
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
  status: BookingStatus;
  payment_details: {
    payment_link: string;
    amount_due: string;
    expires_at: string;
    reference_no: string | null;
    status: number;
  };
  packages: BookingPackageItem[];
}

const API_BASE = "http://localhost:3005";
const LOCAL_STORAGE_KEY = "dreamGateBookings";

const generateCode = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomChars = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `DG-${timestamp}-${randomChars}`;
};

const normalizeCode = (code: string) => code.trim().toUpperCase();

const loadLocalBookings = (): BookingResponse[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? (JSON.parse(stored) as BookingResponse[]) : [];
  } catch {
    return [];
  }
};

const saveLocalBookings = (bookings: BookingResponse[]) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(bookings));
  } catch {
    // ignore storage failures
  }
};

const findLocalBookingByCode = (code: string) => {
  const normalizedCode = normalizeCode(code);
  return loadLocalBookings().find(
    (booking) => normalizeCode(booking.booking_code) === normalizedCode,
  );
};

const generateReferenceNumber = (): string => {
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `REF-${randomDigits}`;
};

const buildPaymentLink = (bookingCode: string): string =>
  `https://mockpay.dream-gate.example.com/checkout/${encodeURIComponent(
    bookingCode,
  )}`;

const getExpiryDate = (): string =>
  new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();

export const getMyBookings = async (): Promise<BookingResponse[]> => {
  try {
    const response = await axios.get(`${API_BASE}/bookings`);
    return response.data;
  } catch (error) {
    console.error("Server unavailable, loading local bookings:", error);
    return loadLocalBookings();
  }
};

export const getBookingById = async (id: number): Promise<BookingResponse> => {
  try {
    const response = await axios.get(`${API_BASE}/bookings/${id}`);
    return response.data;
  } catch {
    const local = loadLocalBookings().find((booking) => booking.id === id);
    if (local) return local;
    throw new Error("Booking not found");
  }
};

export const getBookingByCode = async (code: string): Promise<BookingResponse> => {
  const normalizedCode = normalizeCode(code);
  try {
    const response = await axios.get(
      `${API_BASE}/bookings?booking_code=${encodeURIComponent(normalizedCode)}`,
    );
    if (response.data.length > 0) return response.data[0];
  } catch (error) {
    console.warn("Server lookup failed, checking local bookings:", error);
  }

  const local = findLocalBookingByCode(normalizedCode);
  if (local) return local;

  throw new Error("Booking not found");
};

export const getBookingStatus = async (code: string): Promise<BookingStatus> => {
  const booking = await getBookingByCode(code);
  return booking.status;
};

export const cancelBooking = async (code: string): Promise<BookingResponse> => {
  const booking = await getBookingByCode(code);
  const updated = {
    ...booking,
    status: 2 as BookingStatus,
    payment_details: {
      ...booking.payment_details,
      status: 0,
    },
  };

  try {
    const response = await axios.put(`${API_BASE}/bookings/${booking.id}`, updated);
    return response.data;
  } catch (error) {
    const localBookings = loadLocalBookings();
    const index = localBookings.findIndex((item) => item.id === booking.id);
    if (index !== -1) {
      localBookings[index] = updated;
      saveLocalBookings(localBookings);
      return updated;
    }
    throw new Error("Booking not found");
  }
};

export const createBooking = async (
  payload: CreateBookingPayload,
): Promise<BookingResponse> => {
  const bookingCode = generateCode();

  const totalAmount = payload.packages.reduce((sum, pkg) => {
    const packageData = attractions.find((item) => item.id === pkg.id);
    const packagePrice = packageData?.base_amount ?? 0;
    const addOnTotal = pkg.add_ons.reduce(
      (inner, item) => inner + item.quantity * item.price,
      0,
    );
    return sum + pkg.quantity * packagePrice + addOnTotal;
  }, 0);

  const amountDue = totalAmount.toFixed(2);

  const booking: BookingResponse = {
    id: Date.now(),
    booking_code: bookingCode,
    name: `${payload.first_name} ${payload.last_name}`.trim(),
    email: payload.email,
    mobile_no: payload.mobile_no,
    gender: payload.gender,
    address: payload.address,
    slot_date: payload.slot_date,
    base_amount: Number(amountDue),
    status: 0,
    payment_details: {
      payment_link: buildPaymentLink(bookingCode),
      amount_due: amountDue,
      expires_at: getExpiryDate(),
      reference_no: generateReferenceNumber(),
      status: 0,
    },
    packages: payload.packages,
  };

  try {
    const response = await axios.post(`${API_BASE}/bookings`, booking);
    return response.data;
  } catch (error) {
    const localBookings = loadLocalBookings();
    localBookings.push(booking);
    saveLocalBookings(localBookings);
    return booking;
  }
};

export const completeBookingPayment = async (code: string): Promise<BookingResponse> => {
  const booking = await getBookingByCode(code);
  const updated: BookingResponse = {
    ...booking,
    status: 1,
    payment_details: {
      ...booking.payment_details,
      status: 1,
    },
  };

  try {
    const response = await axios.put(`${API_BASE}/bookings/${booking.id}`, updated);
    return response.data;
  } catch (error) {
    const localBookings = loadLocalBookings();
    const index = localBookings.findIndex((item) => item.id === booking.id);
    if (index !== -1) {
      localBookings[index] = updated;
      saveLocalBookings(localBookings);
      return updated;
    }
    throw new Error("Booking not found");
  }
};
