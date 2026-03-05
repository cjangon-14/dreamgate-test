"use client";
import * as React from "react";
import { useState } from "react";
import { Calendar } from "~/components/ui/calendar";
import { Field, FieldLabel } from "~/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "~/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { CalendarIcon } from "lucide-react";
function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

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
  checkInDate,
  onCheckInDateChange,
  selectedPackages,
  addOnsByPackage,
  ticketAddOnsByPackage = {},
  ticketChoicesByPackage = {},
}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [month, setMonth] = useState<Date | undefined>(undefined);
  const [value, setValue] = useState("");

  const handleDateSelect = (selected: Date | undefined) => {
    setDate(selected);
    setValue(formatDate(selected));
    setOpen(false);
    if (selected) {
      const y = selected.getFullYear();
      const m = String(selected.getMonth() + 1).padStart(2, "0");
      const d = String(selected.getDate()).padStart(2, "0");
      onCheckInDateChange(`${y}-${m}-${d}`);
    } else {
      onCheckInDateChange("");
    }
  };

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
        <h3 className="text-xl rounded-2xl font-bold text-navy-dark mb-2">
          Booking Confirmation
        </h3>
        <p className="text-gray-main text-sm text-regular mb-4">
          Please review the details of your booking before proceeding to payment
        </p>

        {/* Date Selection */}
        <div className="bg-cloud-white rounded-lg p-6 mb-6 ">
          <div className="flex flex-col mb-1 border-4 border-[#BAD2E5] rounded-lg p-4">
            <div className="flex items-center gap-2">
              <Field className="gap-0 flex-1">
                <FieldLabel className="text-sm font-semibold text-regular ">
                  Booking Date:
                </FieldLabel>
                <InputGroup className="border-none focus:ring-0 focus:outline-none shadow-none">
                  <InputGroupInput
                    readOnly
                    value={value}
                    placeholder="Select a date"
                    className="text-navy-dark font-satoshi font-bold text-lg! cursor-default p-1"
                    onChange={(e) => {
                      const parsed = new Date(e.target.value);
                      setValue(e.target.value);
                      if (isValidDate(parsed)) {
                        setDate(parsed);
                        setMonth(parsed);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setOpen(true);
                      }
                    }}
                  />
                </InputGroup>
              </Field>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <button
                    aria-label="Select date"
                    className="shrink-0 rounded-lg cursor-pointer hover:bg-gray-50 transition flex items-center"
                  >
                    <svg
                      width="35"
                      height="35"
                      viewBox="0 0 35 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="bg-transparent"
                    >
                      <rect width="35" height="35" fill="none" />
                      <path
                        d="M21.5 7.5V11.5"
                        stroke="#455873"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M27.3775 22.6271C27.7758 22.2287 27.9996 21.6884 27.9996 21.1251C27.9996 20.5617 27.7758 20.0214 27.3775 19.6231C26.9791 19.2247 26.4388 19.0009 25.8755 19.0009C25.3121 19.0009 24.7718 19.2247 24.3735 19.6231L20.3635 23.6351C20.1257 23.8727 19.9517 24.1664 19.8575 24.4891L19.0205 27.3591C18.9954 27.4451 18.9939 27.5363 19.0161 27.6232C19.0384 27.71 19.0836 27.7893 19.1469 27.8526C19.2103 27.916 19.2896 27.9612 19.3764 27.9834C19.4632 28.0057 19.5544 28.0042 19.6405 27.9791L22.5105 27.1421C22.8332 27.0479 23.1269 26.8738 23.3645 26.6361L27.3775 22.6271Z"
                        stroke="#455873"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M26.5 16V11.5C26.5 10.9696 26.2893 10.4609 25.9142 10.0858C25.5391 9.71071 25.0304 9.5 24.5 9.5H10.5C9.96957 9.5 9.46086 9.71071 9.08579 10.0858C8.71071 10.4609 8.5 10.9696 8.5 11.5V25.5C8.5 26.0304 8.71071 26.5391 9.08579 26.9142C9.46086 27.2893 9.96957 27.5 10.5 27.5H16"
                        stroke="#455873"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.5 15.5H26.5"
                        stroke="#455873"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.5 7.5V11.5"
                        stroke="#455873"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0 "
                  align="end"
                  alignOffset={-8}
                  sideOffset={10}
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={handleDateSelect}
                    className="h-auto w-72 rounded-md bg-white p-3 shadow-lg "
                    disabled={[
                      { before: new Date() }, // Disable past days
                      { dayOfWeek: [1, 2, 3, 4] }, // Disable weekdays (1=Mon, 4=Thu)
                    ]}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {/* Selected Date */}
          <p className=" font-satoshi flex justify-between border-4 border-[#BAD2E5] rounded-lg p-4">
            <span className="text-regular">Booking date:</span>
            <span className="text-navy-dark font-bold text-lg">
              {value ? value : "No date selected"}
            </span>
          </p>
        </div>

        {/* Package Breakdown */}
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
                  (sum: number, addon: any) =>
                    sum + addon.price * addon.quantity,
                  0,
                );
              const pkgTotal = pkg.price * ticketCount + addOnsTotal;

              return (
                <div
                  key={pkg.id}
                  className="rounded-xl overflow-hidden shadow-sm"
                >
                  {/* Header */}
                  <div
                    className={`px-6 py-4 flex items-center justify-between ${pkg.badgeColor ?? "bg-sky-main"}`}
                  >
                    <h5 className="text-white font-bold text-base">
                      {pkg.label}
                    </h5>
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
                      <div className="border-2 border-t-0 border-b-0 border-gray-300">
                        <div
                          key={ticketNumber}
                          className={`p-10 bg-white ${
                            index < ticketCount - 1
                              ? "border-b-2 border-dashed border-[#89A7BF]"
                              : ""
                          }`}
                        >
                          {/* Ticket header row */}
                          <div className="flex justify-between items-center mb-3">
                            <span
                              className="text-white text-xs font-bold px-3 py-1 rounded-md"
                              style={{
                                backgroundColor: pkg.color ?? "#06AEBD",
                              }}
                            >
                              PACKAGE {ticketNumber}
                            </span>
                            <span className="font-goteam text-navy-dark text-sm">
                              PHP {pkg.price.toFixed(2)}
                            </span>
                          </div>

                          {/* Inclusions / Choices */}
                          {pkg.choices?.length > 0 && (
                            <div className="">
                              <div className="mb-2 flex flex-row gap-2 items-center">
                                <p className="text-xs text-gray-main">
                                  Inclusions:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {pkg.choices
                                    .filter((choice: string) =>
                                      ticketChoices.includes(choice),
                                    )
                                    .map((choice: string, idx: number) => (
                                      <span
                                        key={idx}
                                        className="inline-flex items-center gap-1 text-xs font-satoshi font-semibold px-3 py-2 rounded-sm text-white"
                                        style={{
                                          backgroundColor: pkg.color
                                            ? `${pkg.color}20`
                                            : "#06AEBD",
                                          color: pkg.color
                                            ? `${pkg.color}FF`
                                            : "#06AEBD",
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
                              <p className="text-sm text-regular text-dark-main mb-4">
                                Add-Ons:
                              </p>
                              {ticketAddOns.map((addon: any, idx: number) => (
                                <div
                                  key={idx}
                                  className="grid grid-cols-[1fr_8px_8px_auto_auto] items-center gap-3 mb-2"
                                  // className="grid grid-cols-[1fr_auto_auto_auto_auto] items-center gap-3 mb-2"
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
                                    PHP{" "}
                                    {(addon.price * addon.quantity).toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
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
          disabled={!date}
          className="bg-sky-main hover:bg-sky-dark text-white font-satoshi font-bold px-8 py-2.5 rounded-lg transition cursor-pointer disabled:bg-gray-light disabled:text-gray-main cursor-disabled"
        >
          Proceed Payment
        </button>
      </div>
    </div>
  );
};

export default BookingStep3;
