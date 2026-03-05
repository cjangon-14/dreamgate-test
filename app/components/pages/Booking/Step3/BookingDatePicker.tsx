"use client";
import * as React from "react";
import { useState } from "react";
import { Calendar } from "~/components/ui/calendar";
import { Field, FieldLabel } from "~/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
} from "~/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) return false;
  return !isNaN(date.getTime());
}

interface BookingDatePickerProps {
  onCheckInDateChange: (date: string) => void;
}

const BookingDatePicker: React.FC<BookingDatePickerProps> = ({
  onCheckInDateChange,
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
    <div className="bg-cloud-white rounded-lg p-6 mb-6">
      <div className="flex flex-col mb-1 border-4 border-[#BAD2E5] rounded-lg p-4">
        <div className="flex items-center gap-2">
          <Field className="gap-0 flex-1">
            <FieldLabel className="text-sm font-semibold text-regular">
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
                  { before: new Date() },
                  { dayOfWeek: [1, 2, 3, 4] },
                ]}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Selected Date */}
      <p className="font-satoshi flex justify-between border-4 border-[#BAD2E5] rounded-lg p-4">
        <span className="text-regular">Booking date:</span>
        <span className="text-navy-dark font-bold text-lg">
          {value ? value : "No date selected"}
        </span>
      </p>
    </div>
  );
};

export default BookingDatePicker;
