"use client";

import * as React from "react";
import { useState } from "react";
import BookingInput from "./BookingInput";
import { Calendar } from "~/components/ui/calendar";
import { Card, CardContent } from "~/components/ui/card";
import { addDays, format } from "date-fns";
import { type DateRange } from "react-day-picker";

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  address: string;
  age: string;
  gender: string;
}

interface BookingStep1Props {
  onNext: () => void;
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
}

const nameRegex = /^[a-zA-ZÀ-ÿ\s'\-]+$/;

function getErrors(formData: FormData) {
  const errors: Partial<Record<keyof FormData, string>> = {};

  if (!formData.firstName.trim()) {
    errors.firstName = "First name is required.";
  } else if (!nameRegex.test(formData.firstName)) {
    errors.firstName = "First name must not contain numbers or symbols.";
  }

  if (formData.middleName && !nameRegex.test(formData.middleName)) {
    errors.middleName = "Middle name must not contain numbers or symbols.";
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "Last name is required.";
  } else if (!nameRegex.test(formData.lastName)) {
    errors.lastName = "Last name must not contain numbers or symbols.";
  }

  if (!formData.address.trim()) {
    errors.address = "Address is required.";
  }

  if (!formData.age.trim()) {
    errors.age = "Age is required.";
  } else {
    const ageNum = Number(formData.age);
    if (!Number.isInteger(ageNum) || ageNum < 18 || ageNum > 120) {
      errors.age = "Enter a valid age (18 - 120).";
    }
  }

  if (!formData.gender) {
    errors.gender = "Please select a gender.";
  }

  return errors;
}

export default function BookingStep1({
  onNext,
  formData,
  onFormDataChange,
}: BookingStep1Props) {
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});

  const errors = getErrors(formData);
  const isFormValid = Object.keys(errors).length === 0;

  const handleInputChange = (field: keyof FormData, value: string) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleNext = () => {
    if (isFormValid) {
      onNext();
    } else {
      // Mark all fields as touched to show all errors at once
      setTouched({
        firstName: true,
        middleName: true,
        lastName: true,
        suffix: true,
        address: true,
        age: true,
        gender: true,
      });
    }
  };

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    undefined,
  );

  return (
    <>
      <hr className="border-gray-200 mb-6" />

      {/* Required Fields Notice */}
      <div className="bg-amber-50 border border-accent-yellow/15 rounded-lg px-4 py-3 flex items-center gap-2 mb-4">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.99988 1.6C8.36738 1.6 8.70488 1.8025 8.87988 2.125L14.2799 12.125C14.4474 12.435 14.4399 12.81 14.2599 13.1125C14.0799 13.415 13.7524 13.6 13.3999 13.6H2.59988C2.24738 13.6 1.91988 13.415 1.73988 13.1125C1.55988 12.81 1.55238 12.435 1.71988 12.125L7.11988 2.125C7.29488 1.8025 7.63238 1.6 7.99988 1.6ZM7.99988 10.4C7.55738 10.4 7.19988 10.7575 7.19988 11.2C7.19988 11.6425 7.55738 12 7.99988 12C8.44238 12 8.79988 11.6425 8.79988 11.2C8.79988 10.7575 8.44238 10.4 7.99988 10.4ZM7.99988 5.6C7.54488 5.6 7.18238 5.9875 7.21488 6.4425L7.39988 9.0425C7.42238 9.355 7.68488 9.6 7.99738 9.6C8.31238 9.6 8.57238 9.3575 8.59488 9.0425L8.77988 6.4425C8.81238 5.9875 8.45238 5.6 7.99488 5.6H7.99988Z"
            fill="#455873"
          />
        </svg>

        <p className="text-sm font-manrope font-medium text-navy-dark">
          All fields with{" "}
          <span className="inline-block w-3 h-3 bg-red-500 rounded-sm align-middle mx-1" />{" "}
          mark is required
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* Guest Info */}
        <h2 className="text-2xl font-satoshi font-bold text-navy-dark mb-1">
          Guest Info
        </h2>
        <p className="text-sm font-satoshi text-gray-500 mb-6">
          Fill up all the necessary personal information in the form to ensure
          an accurate processing of your booking.
        </p>

        {/* Full Name */}
        <div className="mb-5">
          <label className="block text-sm font-satoshi font-semibold text-navy-dark mb-2">
            Full Name
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <BookingInput
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                onBlur={() => handleBlur("firstName")}
              />
              {touched.firstName && errors.firstName && (
                <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <BookingInput
                placeholder="Middle Name"
                required={false}
                value={formData.middleName}
                onChange={(e) =>
                  handleInputChange("middleName", e.target.value)
                }
                onBlur={() => handleBlur("middleName")}
              />
              {touched.middleName && errors.middleName && (
                <p className="text-xs text-red-500 mt-1">{errors.middleName}</p>
              )}
            </div>
            <div>
              <BookingInput
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                onBlur={() => handleBlur("lastName")}
              />
              {touched.lastName && errors.lastName && (
                <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
              )}
            </div>
            <div>
              <BookingInput
                placeholder="Suffix"
                required={false}
                value={formData.suffix}
                onChange={(e) => handleInputChange("suffix", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Address / Age / Gender */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_10%_1.5fr] gap-3 mb-8">
          <div>
            <label className="block text-sm font-satoshi font-semibold text-navy-dark mb-2">
              Address
            </label>
            <BookingInput
              placeholder="Enter Address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              onBlur={() => handleBlur("address")}
            />
            {touched.address && errors.address && (
              <p className="text-xs text-red-500 mt-1">{errors.address}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-satoshi font-semibold text-navy-dark mb-2">
              Age
            </label>
            <BookingInput
              type="number"
              placeholder="0"
              value={formData.age}
              onChange={(e) => handleInputChange("age", e.target.value)}
              onBlur={() => handleBlur("age")}
            />
            {touched.age && errors.age && (
              <p className="text-xs text-red-500 mt-1">{errors.age}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-satoshi font-semibold text-navy-dark mb-2">
              Gender
            </label>
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <div className="relative flex-1">
                <div
                  className="absolute top-0 left-0 w-0 h-0 
                border-l-[16px] border-l-red-500 
                border-b-[16px] border-b-transparent 
                z-10"
                />
                <button
                  type="button"
                  onClick={() => {
                    handleInputChange("gender", "Male");
                    handleBlur("gender");
                  }}
                  className={`w-full py-2 text-sm font-satoshi transition hover:cursor-pointer ${
                    formData.gender === "Male"
                      ? "bg-sky-main text-white"
                      : "text-black/40 hover:bg-sky-main/10"
                  }`}
                >
                  Male
                </button>
              </div>
              <div className="w-px bg-gray-200" />
              <button
                type="button"
                onClick={() => {
                  handleInputChange("gender", "Female");
                  handleBlur("gender");
                }}
                className={`flex-1 py-2 text-sm font-satoshi transition hover:cursor-pointer ${
                  formData.gender === "Female"
                    ? "bg-sky-main text-white"
                    : "text-black/40 hover:bg-sky-main/10"
                }`}
              >
                Female
              </button>
            </div>
            {touched.gender && errors.gender && (
              <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
            )}
          </div>
        </div>

        {/* Booking Info */}
        <h2 className="text-2xl font-satoshi font-bold text-navy-dark mb-4">
          Booking Info
        </h2>
        <div className="mb-8">
          <label className="block text-sm font-satoshi font-bold text-navy-dark mb-1">
            Booking Date
          </label>
          <p className="text-sm font-satoshi text-gray-500">
            Choose your preferred booking date to secure your spot at the park
            and ensure a fun-filled day of exciting rides!
          </p>

          <div className="border border-[#BAD2E5] rounded-2xl bg-white mb-6">
            <div className="relative">
              {/* Red corner triangle (only shown when required) */}
              <div className="absolute top-0 left-0 w-0 h-0 border-l-16 border-l-red-500 border-b-16 border-b-transparent rounded-tl-lg z-10" />

              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                numberOfMonths={2}
                disabled={[{ before: new Date() }, { dayOfWeek: [1, 2, 3, 4] }]}
                className="bg-transparent w-full justify-center "
              />
            </div>
          </div>
        </div>

        {/* Selected Date */}
        <div className="border-2 border-[#BAD2E5] rounded-xl p-4 mb-6">
          <p className="font-satoshi flex justify-between">
            <span className="text-gray-600">Booking date:</span>
            <span className="text-navy-dark font-bold text-lg">
              {selectedDate
                ? format(selectedDate, "EEE MMM d yyyy")
                : "No date selected"}
            </span>
          </p>
        </div>

        <hr className="border-gray-200 mb-6" />

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!isFormValid && Object.keys(touched).length > 0 && false}
            className={`text-white font-satoshi font-bold px-8 py-2.5 rounded-lg transition hover:cursor-not-allowed ${
              isFormValid
                ? "bg-sky-main hover:bg-sky-dark hover:cursor-pointer"
                : "bg-sky-main/50 text-white/50"
            }`}
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
}
