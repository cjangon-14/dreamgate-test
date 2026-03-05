import * as React from "react";

interface BookingTicketRowProps {
  pkg: any;
  ticketNumber: number;
  ticketAddOns: any[];
  ticketChoices: string[];
  isLast: boolean;
}

const BookingTicketRow: React.FC<BookingTicketRowProps> = ({
  pkg,
  ticketNumber,
  ticketAddOns,
  ticketChoices,
  isLast,
}) => {
  return (
    <div className="border-2 border-t-0 border-b-0 border-gray-300">
      <div
        className={`p-10 bg-white ${
          !isLast ? "border-b-2 border-dashed border-[#89A7BF]" : ""
        }`}
      >
        {/* Ticket header row */}
        <div className="flex justify-between items-center mb-3">
          <span
            className="text-white text-xs font-bold px-3 py-1 rounded-md"
            style={{ backgroundColor: pkg.color ?? "#06AEBD" }}
          >
            PACKAGE {ticketNumber}
          </span>
          <span className="font-goteam text-navy-dark text-sm">
            PHP {pkg.price.toFixed(2)}
          </span>
        </div>

        {/* Inclusions / Choices */}
        {pkg.choices?.length > 0 && (
          <div>
            <div className="mb-2 flex flex-row gap-2 items-center">
              <p className="text-xs text-gray-main">Inclusions:</p>
              <div className="flex flex-wrap gap-2">
                {pkg.choices
                  .filter((choice: string) => ticketChoices.includes(choice))
                  .map((choice: string, idx: number) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-xs font-satoshi font-semibold px-3 py-2 rounded-sm text-white"
                      style={{
                        backgroundColor: pkg.color ? `${pkg.color}20` : "#06AEBD",
                        color: pkg.color ? `${pkg.color}FF` : "#06AEBD",
                      }}
                    >
                      &#10003; {choice.toUpperCase()}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Per-ticket Add-Ons */}
        {ticketAddOns.length > 0 && (
          <div className="mt-3 pt-3 border-t border-[#BAD2E5]">
            <p className="text-sm text-regular text-dark-main mb-4">Add-Ons:</p>
            {ticketAddOns.map((addon: any, idx: number) => (
              <div
                key={idx}
                className="grid grid-cols-[1fr_8px_8px_auto_auto] items-center gap-3 mb-2"
              >
                <span className="text-sm font-satoshi font-semibold text-navy-dark">
                  {addon.name}
                </span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 9C2.79565 9 3.55871 9.31607 4.12132 9.87868C4.68393 10.4413 5 11.2044 5 12C5 12.7956 4.68393 13.5587 4.12132 14.1213C3.55871 14.6839 2.79565 15 2 15V17C2 17.5304 2.21071 18.0391 2.58579 18.4142C2.96086 18.7893 3.46957 19 4 19H20C20.5304 19 21.0391 18.7893 21.4142 18.4142C21.7893 18.0391 22 17.5304 22 17V15C21.2044 15 20.4413 14.6839 19.8787 14.1213C19.3161 13.5587 19 12.7956 19 12C19 11.2044 19.3161 10.4413 19.8787 9.87868C20.4413 9.31607 21.2044 9 22 9V7C22 6.46957 21.7893 5.96086 21.4142 5.58579C21.0391 5.21071 20.5304 5 20 5H4C3.46957 5 2.96086 5.21071 2.58579 5.58579C2.21071 5.96086 2 6.46957 2 7V9Z"
                    stroke="#003154"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 5V7"
                    stroke="#003154"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 17V19"
                    stroke="#003154"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13 11V13"
                    stroke="#003154"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm font-satoshi font-bold text-navy-dark w-8 text-center">
                  x
                </span>
                <span className="text-sm font-satoshi font-bold text-navy-dark w-8 text-center">
                  {addon.quantity}
                </span>
                <span className="text-sm font-goteam text-navy-dark w-40 text-right">
                  PHP {(addon.price * addon.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingTicketRow;
