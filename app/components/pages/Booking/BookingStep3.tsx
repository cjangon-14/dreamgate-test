import React from 'react'

interface BookingStep3Props {
  onNext: () => void;
  onBack: () => void;
  checkInDate: string;
  onCheckInDateChange: (date: string) => void;
  checkOutDate: string;
  onCheckOutDateChange: (date: string) => void;
  selectedPackages: any[];
  addOnsByPackage: any;
}

const BookingStep3: React.FC<BookingStep3Props> = ({
  onNext,
  onBack,
  checkInDate,
  onCheckInDateChange,
  checkOutDate,
  onCheckOutDateChange,
  selectedPackages,
  addOnsByPackage,
}) => {
  return (
    <div>
      {/* Info Banner */}
      <div className="rounded-xl bg-[#2BD8FF]/8 border-sky-main/20 px-6 py-4 text-center mb-6">
        <p className="text-regular font-satoshi text-sm">
          Please be informed that each booking is{" "}
          <strong>limited to a maximum of 6 persons</strong> to ensure a
          comfortable and well-managed experience for all guests
        </p>
      </div>

      {/* Booking Confirmation Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-dark-main mb-6">Booking Confirmation</h3>
        <p className="text-gray-main text-sm mb-4">Please confirm the details of your booking to finalize payment?</p>

        {/* Date Selection */}
        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-light">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-dark-main mb-2">
                Booking Date
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => onCheckInDateChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-light rounded-lg text-dark-main placeholder-gray-main focus:outline-none focus:border-sky-main"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-dark-main mb-2">
                Booking Date
              </label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => onCheckOutDateChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-light rounded-lg text-dark-main placeholder-gray-main focus:outline-none focus:border-sky-main"
              />
            </div>
          </div>
        </div>

        {/* Package Breakdown */}
        <div className="mb-6">
          <h4 className="text-base font-semibold text-dark-main mb-4">Package Breakdown</h4>
          <div className="space-y-4">
            {selectedPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-lg border border-gray-light overflow-hidden">
                <div className="bg-linear-to-r from-teal-600 to-cyan-500 px-4 py-3">
                  <h5 className="text-white font-bold text-sm">{pkg.name}</h5>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-main text-sm">₱{pkg.price.toFixed(2)}</span>
                  </div>

                  {/* Inclusions */}
                  {pkg.inclusions?.length > 0 && (
                    <div className="mb-3 pb-3 border-b border-gray-light">
                      <p className="text-xs text-gray-main mb-2">Inclusions:</p>
                      <div className="flex flex-wrap gap-2">
                        {pkg.inclusions.map((inclusion: string, idx: number) => (
                          <span
                            key={idx}
                            className="inline-block bg-sky-50 text-sky-main text-xs px-2 py-1 rounded-full"
                          >
                            {inclusion}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Add-Ons if any */}
                  {addOnsByPackage[pkg.id]?.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-main mb-2">Add-Ons:</p>
                      {addOnsByPackage[pkg.id].map((addon: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center text-xs text-gray-main mb-1">
                          <span>{addon.name}</span>
                          <span>₱{addon.price.toFixed(2)} x {addon.quantity}</span>
                        </div>
                      ))}
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
          disabled={!checkInDate || !checkOutDate}
          className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition disabled:bg-gray-light disabled:text-gray-main cursor-disabled"
        >
          Proceed Payment
        </button>
      </div>
    </div>
  );
}

export default BookingStep3