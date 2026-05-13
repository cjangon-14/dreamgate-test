import React from "react";
import type { BookingResponse } from "~/api/bookings";

const formatMoney = (amount: number | string) =>
  parseFloat(String(amount)).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

interface BookingCheckStatusProps {
  bookingResponse: BookingResponse | null;
}

const BookingCheckStatus: React.FC<BookingCheckStatusProps> = ({
  bookingResponse,
}) => {
  if (!bookingResponse) return null;

  const formattedDate = new Date(bookingResponse.slot_date)
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();

  /* 
     UPDATED QR COLOR: Converted from '003052' to your solid Nebula Blue color parameter '3d3dbd' 
     to ensure the generated badge matches your updated design tokens.
  */
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(bookingResponse.booking_code)}&bgcolor=ffffff&color=3d3dbd&margin=10`;

  const isPending = bookingResponse.status !== 1;

  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-6">
      {/* Heading */}
      <div className="text-center items-center flex flex-col gap-3">
        <h1 className="text-white font-satoshi font-black text-3xl mb-2 uppercase">
          Your booking is confirmed!
        </h1>
        <p className="text-white/60 font-satoshi text-sm max-w-sm">
          Your adventure awaits! Check out your confirmed booking details below.
        </p>
      </div>

      {/* Status badge */}
      <span
        className={`font-satoshi font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wide ${
          isPending
            ? "bg-yellow-400/20 text-yellow-300 border border-yellow-400/30"
            : "bg-green-400/20 text-green-300 border border-green-400/30"
        }`}
      >
        ● {isPending ? "Pending Payment" : "Active"}
      </span>

      {/* Ticket card */}
      <div className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex">
          {/* Left: main info */}
          <div className="flex-1 p-8">
            {/* UPDATED: Changed from 'Theme Park' to 'Realm' layout semantics */}
            <p className="text-sky-main font-satoshi font-bold text-xs uppercase tracking-widest mb-3">
              Dream Gate Realm
            </p>
            <h2 className="font-bitcrusher text-navy-dark text-4xl uppercase leading-tight mb-6">
              {bookingResponse.name}
            </h2>
            <div className="border-t-2 border-dashed border-gray-200 mb-6" />
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              <div>
                <p className="text-xs font-satoshi text-gray-400 uppercase tracking-wide mb-1">
                  Booking Date
                </p>
                <p className="font-satoshi font-bold text-navy-dark text-sm">
                  {formattedDate}
                </p>
              </div>
              <div>
                <p className="text-xs font-satoshi text-gray-400 uppercase tracking-wide mb-1">
                  Booking Number
                </p>
                <p className="font-satoshi font-bold text-navy-dark text-sm">
                  {bookingResponse.booking_code}
                </p>
              </div>
              <div>
                <p className="text-xs font-satoshi text-gray-400 uppercase tracking-wide mb-1">
                  Amount Due
                </p>
                <p className="font-goteam text-navy-dark text-base">
                  ₱{formatMoney(bookingResponse.payment_details.amount_due)}
                </p>
              </div>
              <div>
                <p className="text-xs font-satoshi text-gray-400 uppercase tracking-wide mb-1">
                  Email
                </p>
                <p className="font-satoshi text-navy-dark text-sm truncate">
                  {bookingResponse.email}
                </p>
              </div>
            </div>
          </div>

          {/* Tear separator */}
          <div className="relative flex items-stretch w-8">
            {/* UPDATED: Changed static hex color class background indicators to use your dark theme variable directly */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-navy-dark z-10" />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-navy-dark z-10" />
            <div className="mx-auto w-px border-l-2 border-dashed border-gray-200" />
          </div>

          {/* Right: QR code */}
          <div className="w-44 flex flex-col items-center justify-center gap-4 p-6 bg-gray-50">
            <img
              src={qrUrl}
              alt="Booking QR Code"
              className="w-28 h-28 rounded-lg"
            />
            <p className="text-xs font-satoshi font-bold text-gray-400 uppercase tracking-widest">
              My Ticket
            </p>
          </div>
        </div>
      </div>

      {/* Payment CTA */}
      {bookingResponse.payment_details.payment_link && (
        <a
          href={bookingResponse.payment_details.payment_link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-accent-yellow text-navy-dark font-satoshi font-bold px-10 py-3 rounded-xl hover:bg-accent-yellow/90 transition text-sm"
        >
          Proceed to Checkout →
        </a>
      )}
    </div>
  );
};

export default BookingCheckStatus;
