import * as React from "react";
import BookingDatePicker from "./BookingDatePicker";
import BookingPackageBreakdown from "./BookingPackageBreakdown";

interface BookingStep3Props {
  onNext: () => void;
  onBack: () => void;
  checkInDate: string;
  onCheckInDateChange: (date: string) => void;
  selectedPackages: any[];
  addOnsByPackage: any;
  ticketAddOnsByPackage?: {
    [packageId: string]: { [ticketNumber: number]: any[] };
  };
  ticketChoicesByPackage?: {
    [packageId: string]: { [ticketNumber: number]: string[] };
  };
}

const BookingStep3: React.FC<BookingStep3Props> = ({
  onNext,
  onBack,
  selectedPackages,
  addOnsByPackage,
  ticketAddOnsByPackage = {},
  ticketChoicesByPackage = {},
}) => {
  return (
    <div>
      {/* Info Banner */}
      <div className="rounded-xl bg-[#2BD8FF]/8 border-sky-main/20 px-6 py-4 text-center mb-6">
        <p className="text-regular font-satoshi text-sm">
          Please review the details of your booking before proceeding to a
          payment.
        </p>
      </div>

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
          className="bg-sky-main hover:bg-sky-dark text-white font-satoshi font-bold px-8 py-2.5 rounded-lg transition cursor-pointer disabled:bg-gray-light disabled:text-gray-main cursor-disabled"
        >
          Proceed Payment
        </button>
      </div>
    </div>
  );
};

export default BookingStep3;
