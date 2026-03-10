import * as React from "react";
import BookingPackageBreakdown from "./BookingPackageBreakdown";

interface BookingStep3Props {
  onNext: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
  selectedPackages: any[];
  ticketAddOnsByPackage?: {
    [packageId: string]: { [ticketNumber: number]: any[] };
  };
  ticketChoicesByPackage?: {
    [packageId: string]: { [ticketNumber: number]: string[] };
  };
  discountByPackage?: { [packageId: string]: { [ticketNumber: number]: { id: number; name: string; percentage?: number; amount?: number } | null } };
}

const BookingStep3: React.FC<BookingStep3Props> = ({
  onNext,
  onBack,
  isSubmitting = false,
  selectedPackages,
  ticketAddOnsByPackage = {},
  ticketChoicesByPackage = {},
  discountByPackage = {},
}) => {
  React.useEffect(() => {
    console.log("[Step3] selectedPackages:", selectedPackages);
    console.log("[Step3] ticketAddOnsByPackage:", ticketAddOnsByPackage);
    console.log("[Step3] ticketChoicesByPackage:", ticketChoicesByPackage);
  }, [selectedPackages, ticketAddOnsByPackage, ticketChoicesByPackage]);

  return (
    <div>
      {/* Info Banner */}
      <div className="rounded-xl bg-[#2BD8FF]/8 border-sky-main/20 px-6 py-4 text-center mb-6">
        <p className="text-regular font-satoshi text-sm">
          Please review the details of your booking before proceeding to payment.
        </p>
      </div>

      {/* Package Breakdown */}
      <div className="mb-8">
        <BookingPackageBreakdown
          selectedPackages={selectedPackages}
          ticketAddOnsByPackage={ticketAddOnsByPackage}
          ticketChoicesByPackage={ticketChoicesByPackage}
          discountByPackage={discountByPackage}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="border border-navy-dark/20 text-navy-dark font-satoshi font-bold px-8 py-2.5 rounded-lg hover:bg-gray-50 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <button
          onClick={() => {
            console.log("[Step3] About to POST — selectedPackages:", selectedPackages);
            console.log("[Step3] About to POST — ticketAddOnsByPackage:", ticketAddOnsByPackage);
            console.log("[Step3] About to POST — ticketChoicesByPackage:", ticketChoicesByPackage);
            onNext();
          }}
          disabled={isSubmitting}
          className="bg-sky-main hover:bg-sky-dark text-white font-satoshi font-bold px-8 py-2.5 rounded-lg transition cursor-pointer disabled:bg-sky-main/50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Proceed Payment"}
        </button>
      </div>
    </div>
  );
};

export default BookingStep3;

