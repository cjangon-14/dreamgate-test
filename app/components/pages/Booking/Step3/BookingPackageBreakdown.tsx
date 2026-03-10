import * as React from "react";
import BookingTicketRow from "./BookingTicketRow";

interface BookingPackageBreakdownProps {
  selectedPackages: any[];
  ticketAddOnsByPackage: { [packageId: string]: { [ticketNumber: number]: any[] } };
  ticketChoicesByPackage: { [packageId: string]: { [ticketNumber: number]: string[] } };
  discountByPackage?: { [packageId: string]: { [ticketNumber: number]: { id: number; name: string; percentage?: number; amount?: number } | null } };
}

const BookingPackageBreakdown: React.FC<BookingPackageBreakdownProps> = ({
  selectedPackages,
  ticketAddOnsByPackage,
  ticketChoicesByPackage,
  discountByPackage = {},
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
          const pkgSubtotal = pkg.price * ticketCount + addOnsTotal;

          // Compute discount per ticket (VAT-exempt for Senior/PWD)
          const ticketDiscounts = discountByPackage[pkg.id] ?? {};
          let discountAmount = 0;
          for (let t = 1; t <= ticketCount; t++) {
            const discount = ticketDiscounts[t];
            if (!discount || (!discount.percentage && !discount.amount)) continue;
            if (discount.id === 5) continue;
            const tAddOns = (pkgTicketAddOns[t] ?? []).reduce(
              (s: number, a: any) => s + a.price * a.quantity, 0
            );
            const tSubtotal = pkg.price + tAddOns;
            if (discount.percentage) {
              const vatExclusive = tSubtotal / 1.10;
              discountAmount += (tSubtotal - vatExclusive) + (vatExclusive * discount.percentage) / 100;
            } else if (discount.amount) {
              discountAmount += discount.amount;
            }
          }
          // Use the first active discount for label display
          const activeDiscount = Object.values(ticketDiscounts).find(
            (d) => d && d.id !== 5 && (d.percentage || d.amount)
          ) ?? null;

          const pkgTotal = pkgSubtotal - discountAmount;

          return (
            <div key={pkg.id} className="rounded-xl overflow-hidden shadow-sm">
              {/* Header */}
              <div
                className={`px-6 py-4 flex items-center justify-between ${pkg.badgeColor ?? "bg-sky-main"}`}
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
              <div className="bg-[#E9F2F9] px-10 py-6 flex flex-col gap-2 border-2 border-gray-300 border-t-gray-200 rounded-b-xl">
                {discountAmount > 0 && activeDiscount && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-pink-500 font-satoshi">
                      Discount ({activeDiscount.name})
                    </span>
                    <span className="font-goteam text-pink-500 text-base">
                      - PHP {discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-navy-dark">
                    Total Package Amount
                  </span>
                  <span className="font-goteam text-navy-dark text-base">
                    PHP {pkgTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingPackageBreakdown;
