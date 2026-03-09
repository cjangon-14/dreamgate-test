import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import BookingCheckStatus from "~/components/pages/Booking/BookingCheckStatus";
import { getBookingByCode, type BookingResponse } from "~/api/bookings";
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
    <div className="min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-12 md:px-38 py-6 md:py-8">
        <h1 className="text-2xl font-satoshi font-bold text-navy-dark mb-6">Booking Status</h1>

        {isLoading && (
          <p className="text-sm font-satoshi text-gray-500">Loading...</p>
        )}

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-6 py-4 mb-6">
            <p className="text-sm font-satoshi text-red-600">{error}</p>
          </div>
        )}

        <BookingCheckStatus bookingResponse={bookingResponse} />
      </div>
    </div>
  );
}
