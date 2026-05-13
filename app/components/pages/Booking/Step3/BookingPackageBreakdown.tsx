import * as React from "react";
import BookingTicketRow from "./BookingTicketRow";

interface BookingPackageBreakdownProps {
  selectedPackages: any[];
  ticketAddOnsByPackage: { [packageId: string]: { [ticketNumber: number]: any[] } };
  ticketChoicesByPackage: { [packageId: string]: { [ticketNumber: number]: string[] } };
}

const BookingPackageBreakdown: React.FC<BookingPackageBreakdownProps> = ({
  selectedPackages,
  ticketAddOnsByPackage,
  ticketChoicesByPackage,
}) => {
  return (
    <div className="mb-6">
      <h4 className="text-base font-semibold text-dark-main mb-4">
        Package Breakdown
      </h4>
      <div className="space-y-4">
        {selectedPackages.map((pkg) => {
          const ticketCount = pkg.quantity;
          const pkgTicketAddOns = ticketAddOnsByPackage[pkg.id] ?? {};
          const addOnsTotal = Object.values(pkgTicketAddOns)
            .flat()
            .reduce(
              (sum: number, addon: any) => sum + addon.price * addon.quantity,
              0,
            );
          const pkgTotal = pkg.price * ticketCount + addOnsTotal;

          return (
            <div key={pkg.id} className="rounded-xl overflow-hidden shadow-sm">
              {/* Header */}
              <div
                className={`px-6 py-4 flex items-center justify-between ${pkg.badgeColor ?? "bg-gate-main"}`}
              >
                <h5 className="text-white font-bold text-base">{pkg.label}</h5>
                <span className="bg-white text-navy-dark text-xs font-bold px-4 py-1.5 rounded-full">
                  {ticketCount} Package{ticketCount > 1 ? "s" : ""}
                </span>
              </div>

              {/* Per-ticket rows */}
              {Array.from({ length: ticketCount }).map((_, index) => {
                const ticketNumber = index + 1;
                const ticketAddOns = pkgTicketAddOns[ticketNumber] ?? [];
                const ticketChoices =
                  (ticketChoicesByPackage[pkg.id] ?? {})[ticketNumber] ??
                  pkg.choices.slice(0, 2);

                return (
                  <BookingTicketRow
                    key={ticketNumber}
                    pkg={pkg}
                    ticketNumber={ticketNumber}
                    ticketAddOns={ticketAddOns}
                    ticketChoices={ticketChoices}
                    isLast={index === ticketCount - 1}
                  />
                );
              })}

              {/* Footer total */}
              <div className="bg-[#E9F2F9] px-10 py-6 flex justify-between items-center border-2 border-gray-300 border-t-gray-200 rounded-b-xl">
                <span className="text-sm font-bold text-navy-dark">
                  Total Package Amount
                </span>
                <span className="font-goteam text-navy-dark text-base">
                  PHP {pkgTotal.toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingPackageBreakdown;
