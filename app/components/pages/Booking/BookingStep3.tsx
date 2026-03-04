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
}

const BookingStep3: React.FC<BookingStep3Props> = ({
  onNext,
  onBack,
  checkInDate,
  onCheckInDateChange,
  selectedPackages,
  addOnsByPackage,
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
        <div className="bg-cloud-white rounded-lg p-6 mb-6">
          <div className="flex flex-col gap-4 mb-4">
            <Field>
              <FieldLabel className="text-sm font-semibold text-dark-main mb-2">
                Booking Date
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  value={value}
                  placeholder="Select a date"
                  className="text-navy-dark font-satoshi font-bold text-sm"
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
                <InputGroupAddon align="inline-end">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <InputGroupButton
                        variant="ghost"
                        size="icon-xs"
                        aria-label="Select date"
                      >
                        <CalendarIcon />
                      </InputGroupButton>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
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
                        className="h-auto w-72 rounded-md bg-white p-3 shadow-lg"
                        disabled={[
                          { before: new Date() }, // Disable past days
                          { dayOfWeek: [1, 2, 3, 4] }, // Disable weekdays (1=Mon, 4=Thu)
                        ]}
                        // Disable dates more than 1 year in the future
                      />
                    </PopoverContent>
                  </Popover>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </div>
        </div>

        {/* Package Breakdown */}
        <div className="mb-6">
          <h4 className="text-base font-semibold text-dark-main mb-4">
            Package Breakdown
          </h4>
          <div className="space-y-4">
            {selectedPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-lg border border-gray-light overflow-hidden"
              >
                <div className="bg-linear-to-r from-teal-600 to-cyan-500 px-4 py-3">
                  <h5 className="text-white font-bold text-sm">{pkg.name}</h5>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-main text-sm">
                      ₱{pkg.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Inclusions */}
                  {pkg.inclusions?.length > 0 && (
                    <div className="mb-3 pb-3 border-b border-gray-light">
                      <p className="text-xs text-gray-main mb-2">Inclusions:</p>
                      <div className="flex flex-wrap gap-2">
                        {pkg.inclusions.map(
                          (inclusion: string, idx: number) => (
                            <span
                              key={idx}
                              className="inline-block bg-sky-50 text-sky-main text-xs px-2 py-1 rounded-full"
                            >
                              {inclusion}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {/* Add-Ons if any */}
                  {addOnsByPackage[pkg.id]?.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-main mb-2">Add-Ons:</p>
                      {addOnsByPackage[pkg.id].map(
                        (addon: any, idx: number) => (
                          <div
                            key={idx}
                            className="flex justify-between items-center text-xs text-gray-main mb-1"
                          >
                            <span>{addon.name}</span>
                            <span>
                              ₱{addon.price.toFixed(2)} x {addon.quantity}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={onBack}
          className="px-6 py-2 text-dark-main font-semibold rounded-lg border border-gray-light hover:bg-gray-light transition"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!date}
          className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition disabled:bg-gray-light disabled:text-gray-main cursor-disabled"
        >
          Proceed Payment
        </button>
      </div>
    </div>
  );
};

export default BookingStep3;
