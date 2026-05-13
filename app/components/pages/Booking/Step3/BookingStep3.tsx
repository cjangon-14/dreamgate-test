import * as React from "react";
import BookingDatePicker from "./BookingDatePicker";
import BookingPackageBreakdown from "./BookingPackageBreakdown";

interface BookingStep3Props {
  onNext: () => void;
  onBack: () => void;
  selectedDate?: Date;
  selectedPackages: any[];
  addOnsByPackage: any;
  ticketAddOnsByPackage?: {
    [packageId: string]: { [ticketNumber: number]: any[] };
  };
  ticketChoicesByPackage?: {
    [packageId: string]: { [ticketNumber: number]: string[] };
  };
  isSubmitting?: boolean;
  errorMessage?: string | null;
}

const BookingStep3: React.FC<BookingStep3Props> = ({
  onNext,
  onBack,
  selectedDate,
  selectedPackages,
  addOnsByPackage,
  ticketAddOnsByPackage = {},
  ticketChoicesByPackage = {},
  isSubmitting = false,
  errorMessage = null,
}) => {
  return (
    <div>
      {/* Info Banner */}
      <div className="rounded-xl bg-sky-main/10 border-sky-main/20 px-6 py-4 text-center mb-6">
        <p className="text-sky-main font-satoshi text-sm">
          Please review the details of your booking before proceeding to a
          payment.
        </p>
      </div>

      {errorMessage ? (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 mb-6 text-sm text-red-600">
          {errorMessage}
        </div>
      ) : null}

      {selectedDate ? (
        <div className="rounded-xl bg-white border border-gray-200 p-4 mb-6">
          <p className="text-sm font-satoshi text-gray-500 mb-1">Selected Booking Date</p>
          <p className="text-lg font-satoshi font-bold text-navy-dark">
            {selectedDate.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      ) : null}

      {/* Booking Confirmation Section */}
      <div className="mb-8">
        {/* Package Breakdown */}
        <BookingPackageBreakdown
          selectedPackages={selectedPackages}
          ticketAddOnsByPackage={ticketAddOnsByPackage}
          ticketChoicesByPackage={ticketChoicesByPackage}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={onBack}
          className="border border-navy-dark/20 text-navy-dark font-satoshi font-bold px-8 py-2.5 rounded-lg hover:bg-gray-50 transition cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={isSubmitting}
          className={`bg-navy-main text-white font-satoshi font-bold px-8 py-2.5 rounded-lg transition ${
            isSubmitting
              ? "cursor-not-allowed bg-gray-light text-gray-main"
              : "hover:bg-navy-dark"
          }`}
        >
          {isSubmitting ? "Creating booking..." : "Proceed Payment"}
        </button>
      </div>
    </div>
  );
};

export default BookingStep3;
