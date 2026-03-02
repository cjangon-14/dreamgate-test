import BookingInput from "./BookingInput";

export default function BookingStep1({ onNext }: { onNext: () => void }) {
  return (
    <>
      {/* Info Banner */}
      <div className="rounded-xl bg-[#2BD8FF]/8 border-sky-main/20 px-6 py-4 text-center mb-6">
        <p className="text-regular font-satoshi text-sm">
          Please be informed that each booking is{" "}
          <strong>limited to a maximum of 6 persons</strong> to ensure a
          comfortable and well-managed experience for all guests
        </p>
      </div>

      {/* Step Indicator + Progress Bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="bg-sky-main/20 text-navy-main font-satoshi font-bold text-xs px-3 py-1 rounded-full">
          STEP 1 OF 4
        </span>
        <div className="flex gap-2">
          <div className="h-1 w-12 bg-sky-main rounded-full" />
          <div className="h-1 w-12 bg-gray-200 rounded-full" />
          <div className="h-1 w-12 bg-gray-200 rounded-full" />
          <div className="h-1 w-12 bg-gray-200 rounded-full" />
        </div>
      </div>

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
            <BookingInput placeholder="First Name" />
            <BookingInput placeholder="Middle Name" required={false} />
            <BookingInput placeholder="Last Name" />
            <BookingInput placeholder="Suffix" required={false} />
          </div>
        </div>

        {/* Address / Age / Gender */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_10%_1.5fr] gap-3 mb-8">
          <div>
            <label className="block text-sm font-satoshi font-semibold text-navy-dark mb-2">
              Address
            </label>
            <BookingInput placeholder="Enter Address" />
          </div>
          <div>
            <label className="block text-sm font-satoshi font-semibold text-navy-dark mb-2">
              Age
            </label>
            <BookingInput type="number" placeholder="0" />
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
                <button className="w-full py-2 text-sm font-satoshi text-black/40 hover:bg-sky-main/10 transition">
                  Male
                </button>
              </div>
              <div className="w-px bg-gray-200" />
              <button className="flex-1 py-2 text-sm font-satoshi text-black/40 hover:bg-sky-main/10 transition">
                Female
              </button>
            </div>
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
        </div>

        <hr className="border-gray-200 mb-6" />

        {/* Next Button */}
        <div className="flex justify-end">
          <button onClick={onNext} className="bg-sky-main hover:bg-sky-dark text-white font-satoshi font-bold px-8 py-2.5 rounded-lg transition cursor-pointer">
            Next
          </button>
        </div>
      </form>
    </>
  );
}
