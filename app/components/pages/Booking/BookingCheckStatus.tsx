import React from 'react';
import type { BookingResponse } from '~/api/bookings';

interface BookingCheckStatusProps {
  bookingResponse: BookingResponse | null;
}

const BookingCheckStatus: React.FC<BookingCheckStatusProps> = ({ bookingResponse }) => {
  if (!bookingResponse) return null;

  return (
    <div className="rounded-xl bg-green-50 border border-green-200 px-6 py-4">
      <p className="text-sm font-satoshi font-semibold text-green-700 mb-4">Booking Found</p>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-satoshi text-gray-600">Booking Code</span>
          <span className="text-navy-dark font-satoshi font-bold text-lg">{bookingResponse.booking_code}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-satoshi text-gray-600">Name</span>
          <span className="text-navy-dark font-satoshi font-semibold">{bookingResponse.name}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-satoshi text-gray-600">Date</span>
          <span className="text-navy-dark font-satoshi font-semibold">{bookingResponse.slot_date}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-satoshi text-gray-600">Amount Due</span>
          <span className="text-navy-dark font-satoshi font-semibold">₱{bookingResponse.payment_details.amount_due}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-satoshi text-gray-600">Status</span>
          <span className={`text-sm font-satoshi font-bold px-3 py-0.5 rounded-full ${bookingResponse.status === 1 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {bookingResponse.status === 1 ? 'Active' : 'Pending'}
          </span>
        </div>
      </div>
      {bookingResponse.payment_details.payment_link && (
        <div className="mt-4">
          <a href={bookingResponse.payment_details.payment_link} target="_blank" rel="noopener noreferrer" className="inline-block bg-accent-yellow text-navy-dark font-satoshi font-bold px-6 py-2.5 rounded-lg cursor-pointer">
            Proceed to Checkout
          </a>
        </div>
      )}
    </div>
  );
};

export default BookingCheckStatus;
