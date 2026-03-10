import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router";
import BookingCheckStatus from "~/components/pages/Booking/BookingCheckStatus";
import { getBookingByCode, type BookingResponse } from "~/api/bookings";
import { blueSkyLogoCropped, cloudHero, sectionDivider } from "~/assets";
import axios from "axios";

export function meta() {
  return [
    { title: "Check Booking Status - Blue Sky Themed Park" },
    { name: "description", content: "Check the status of your booking at Blue Sky Themed Park" },
  ];
}

export default function CheckStatus() {
  const [searchParams] = useSearchParams();
  const bookingParam = searchParams.get("booking") ?? "";

  const [bookingResponse, setBookingResponse] = useState<BookingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingParam) return;
    const fetchBooking = async () => {
      setIsLoading(true);
      setError(null);
      setBookingResponse(null);
      try {
        const response = await getBookingByCode(bookingParam);
        setBookingResponse(response);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
          setError("No booking found with that code.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooking();
  }, [bookingParam]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 w-full"
        style={{
          height: "150%",
          background: "linear-gradient(to bottom, #003052 0%, #00374B 100%)",
        }}
      />

      {/* Decorative clouds */}
      <img
        src={cloudHero}
        alt=""
        className="absolute -bottom-20 w-full opacity-20 pointer-events-none select-none cloud-animated-status"
      />

      {/* Stars / decorations */}
      <img
        src={sectionDivider}
        alt=""
        className="absolute top-1/3 w-full opacity-80 pointer-events-none select-none"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center py-16 px-4">
        {/* Back to Home button */}
        <Link
          to="/"
          className="absolute top-8 left-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        {/* Logo */}
        <img src={blueSkyLogoCropped} alt="Blue Sky" className="h-16 mb-10" />

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center gap-4 text-white/70">
            <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            <p className="font-satoshi text-sm">Loading booking details...</p>
          </div>
        )}

        {/* Error */}
        {error && !isLoading && (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-10 py-8 text-center max-w-sm">
            <div className="w-14 h-14 rounded-full border-2 border-red-400 flex items-center justify-center mx-auto mb-4">
              <span className="text-red-400 text-2xl font-bold">✕</span>
            </div>
            <p className="text-white font-satoshi font-bold text-lg mb-2">
              Booking Not Found
            </p>
            <p className="text-white/60 font-satoshi text-sm mb-6">{error}</p>
            <Link
              to="/"
              className="text-sky-main font-satoshi font-semibold text-sm hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        )}

        {/* No booking param */}
        {!bookingParam && !isLoading && (
          <p className="text-white/60 font-satoshi text-sm">
            No booking code provided.{" "}
            <Link to="/booking" className="text-sky-main hover:underline">
              Make a booking →
            </Link>
          </p>
        )}

        {/* Booking found */}
        <BookingCheckStatus bookingResponse={bookingResponse} />
      </div>
    </div>
  );
}
