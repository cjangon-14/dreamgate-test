import React from "react";
import { useNavigate } from "react-router";
import type { BookingResponse } from "~/api/bookings";

interface BookingStep4Props {
  onBack: () => void;
  bookingResponse: BookingResponse | null;
  onMockPay: () => void;
  isSubmitting?: boolean;
  errorMessage?: string | null;
}

const BookingStep4: React.FC<BookingStep4Props> = ({
  onBack,
  bookingResponse,
  onMockPay,
  isSubmitting = false,
  errorMessage = null,
}) => {
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (bookingResponse) {
      navigate(`/checkout?booking=${encodeURIComponent(bookingResponse.booking_code)}`);
    }
  };

  const paymentOptions = [
    {
      id: "credit-card",
      title: "Credit / Debit Card",
      description: "Pay using your Visa, Mastercard or JCB Credit/Debit card",
    },
    {
      id: "over-counter",
      title: "Over the Counter",
      description: "Pay by cash through any of our payment partners nationwide.",
    },
    {
      id: "emoney",
      title: "eMoney / Wallet",
      description:
        "Pay using your eMoney options such as GCash, Maya, and other wallets.",
    },
  ];

  if (!bookingResponse) {
    return (
      <div className="rounded-2xl bg-sky-main/10 border border-sky-main/20 p-8 text-center">
        <p className="text-sm font-satoshi text-sky-main/90">
          Preparing your booking details. Please wait or go back to review your selection.
        </p>
      </div>
    );
  }

  const isPaid = bookingResponse.status === 1;

  return (
    <div>
      <div className="rounded-2xl bg-white border border-sky-main/20 p-6 mb-6 shadow-sm">
        <h3 className="text-2xl font-satoshi font-bold text-navy-dark mb-3">
          Booking Confirmation
        </h3>
        <p className="text-sm text-sky-main mb-4">
          Your booking has been generated. Complete the payment below to confirm
          your reservation.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-sky-main/10 p-4">
            <p className="text-xs uppercase text-sky-main/50 tracking-[0.2em] mb-2">
              Booking Reference
            </p>
            <p className="text-base font-bold text-navy-dark">
              {bookingResponse.booking_code}
            </p>
          </div>
          <div className="rounded-xl bg-sky-main/10 p-4">
            <p className="text-xs uppercase text-sky-main/50 tracking-[0.2em] mb-2">
              Amount Due
            </p>
            <p className="text-base font-bold text-navy-dark">
              ₱{Number(bookingResponse.payment_details.amount_due).toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl bg-sky-main/10 p-4 sm:col-span-2">
            <p className="text-xs uppercase text-sky-main/60 tracking-[0.2em] mb-2">
              Payment Status
            </p>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {isPaid ? "Payment completed" : "Pending payment"}
            </span>
          </div>
        </div>
      </div>

      {errorMessage ? (
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 mb-6 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      <div className="mb-8">
        <h3 className="text-xl font-satoshi font-bold text-navy-dark mb-3">
          Mock Payment Options
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Use any option below to simulate a payment flow for your booking.
        </p>

        <div className="space-y-3">
          {paymentOptions.map((option) => (
            <div
              key={option.id}
              className="rounded-xl border border-sky-main/20 bg-white p-4 shadow-sm"
            >
              <p className="font-semibold text-navy-dark">{option.title}</p>
              <p className="text-sm text-sky-main">{option.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={handleCheckout}
          disabled={isPaid || isSubmitting}
          className={`w-full rounded-xl px-6 py-3 text-sm font-bold transition ${
            isPaid
              ? "bg-gray-200 text-gray-600 cursor-not-allowed"
              : "bg-sky-main text-white hover:bg-sky-dark"
          } ${isSubmitting ? "opacity-80 cursor-not-allowed" : ""}`}
        >
          {isPaid
            ? "Payment Already Completed"
            : isSubmitting
              ? "Redirecting to checkout..."
              : "Proceed to Checkout"}
        </button>

        {bookingResponse.payment_details.payment_link && (
          <a
            href={bookingResponse.payment_details.payment_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-sm text-sky-main hover:underline"
          >
            View booking details
          </a>
        )}
      </div>

      <div className="mt-8 flex justify-start">
        <button
          onClick={onBack}
          className="border border-sky-main/20 text-sky-main font-satoshi font-bold px-8 py-2.5 rounded-lg hover:bg-sky-main/10 transition cursor-pointer"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BookingStep4;
