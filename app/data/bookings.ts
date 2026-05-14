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

const LOCAL_STORAGE_KEY = "dreamGateBookings";

// NOTE: json-server infrastructure kept intact at http://localhost:3005 for others to use
// Current implementation uses mock data via localStorage for easier GitHub deployment

const generateCode = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomChars = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `DG-${timestamp}-${randomChars}`;
};

const normalizeCode = (code: string) => code.trim().toUpperCase();

const createMockBookings = (): BookingResponse[] => {
  return [
    {
      id: 1,
      booking_code: "DG-TEST-001",
      name: "John Doe",
      email: "john@example.com",
      mobile_no: "09123456789",
      gender: "Male",
      address: "123 Dream Street, Manila",
      slot_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      base_amount: 2500,
      status: 0,
      payment_details: {
        payment_link: `https://mockpay.dream-gate.example.com/checkout/DG-TEST-001`,
        amount_due: "2500.00",
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        reference_no: "REF-123456",
        status: 0,
      },
      packages: [
        {
          id: "premium",
          attractions: ["Cosmic Castle", "Nebula Tunnel"],
          add_ons: [],
          discount_id: null,
          quantity: 2,
        },
      ],
    },
    {
      id: 2,
      booking_code: "DG-TEST-002",
      name: "Jane Smith",
      email: "jane@example.com",
      mobile_no: "09987654321",
      gender: "Female",
      address: "456 Fantasy Avenue, Quezon City",
      slot_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      base_amount: 5000,
      status: 1,
      payment_details: {
        payment_link: `https://mockpay.dream-gate.example.com/checkout/DG-TEST-002`,
        amount_due: "5000.00",
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        reference_no: "REF-789012",
        status: 1,
      },
      packages: [
        {
          id: "vip",
          attractions: ["Cosmic Castle", "Nebula Tunnel", "Star Garden"],
          add_ons: [{ id: "photography", quantity: 2, price: 500 }],
          discount_id: null,
          quantity: 1,
        },
      ],
    },
  ];
};

const loadLocalBookings = (): BookingResponse[] => {
  if (typeof window === "undefined") return createMockBookings();
  try {
    const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as BookingResponse[];
      }
    }

    const bookings = createMockBookings();
    saveLocalBookings(bookings);
    return bookings;
  } catch {
    const bookings = createMockBookings();
    saveLocalBookings(bookings);
    return bookings;
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
  const bookings = [...createMockBookings(), ...loadLocalBookings()];
  return bookings.find(
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
  // Always use local/mock bookings
  return loadLocalBookings();
};

export const getBookingById = async (id: number): Promise<BookingResponse> => {
  const local = loadLocalBookings().find((booking) => booking.id === id);
  if (local) return local;
  throw new Error("Booking not found");
};

export const getBookingByCode = async (code: string): Promise<BookingResponse> => {
  // Always use local/mock bookings - no server calls
  const local = findLocalBookingByCode(code);
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

  const localBookings = loadLocalBookings();
  const index = localBookings.findIndex((item) => item.id === booking.id);
  if (index !== -1) {
    localBookings[index] = updated;
    saveLocalBookings(localBookings);
    return updated;
  }
  throw new Error("Booking not found");
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

  // Always save to localStorage - no server calls
  const localBookings = loadLocalBookings();
  localBookings.push(booking);
  saveLocalBookings(localBookings);
  return booking;
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

  // Always update localStorage - no server calls
  const localBookings = loadLocalBookings();
  const index = localBookings.findIndex((item) => item.id === booking.id);
  if (index !== -1) {
    localBookings[index] = updated;
    saveLocalBookings(localBookings);
    return updated;
  }
  throw new Error("Booking not found");
};
