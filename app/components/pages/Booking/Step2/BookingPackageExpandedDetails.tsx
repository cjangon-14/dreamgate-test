import { useState } from "react";
import { motion } from "framer-motion";
import BookingAddOnModalLocal from "./BookingAddOnModalLocal";
import BookingAddOnModalAPI from "./BookingAddOnModalAPI";
import { BookingDiscountPicker } from "./BookingDiscountPicker";

interface AddOn {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Discount {
  id: number;
  name: string;
  percentage?: number;
  amount?: number;
}

interface BookingPackageExpandedDetailsProps {
  label: string;
  price: number;
  inclusions: string[];
  choices: string[];
  color?: string;
  comboSelectCount?: number;
  ticketNumber: number;
  selectedAddOns: AddOn[];
  selectedChoices: string[];
  onAddOnsChange: (addOns: AddOn[]) => void;
  onChoicesChange: (choices: string[]) => void;
  onRemovePackage?: () => void;
  onAddSamePackage?: (addOns: AddOn[], choices: string[]) => void;
  canAddMore?: boolean;
  onDiscountChange?: (discount: Discount) => void;
}

export default function BookingPackageExpandedDetails({
  label,
  price,
  inclusions,
  choices,
  color,
  comboSelectCount = 2,
  ticketNumber,
  selectedAddOns,
  selectedChoices,
  onAddOnsChange,
  onChoicesChange,
  onRemovePackage,
  onAddSamePackage,
  canAddMore = true,
  onDiscountChange,
}: BookingPackageExpandedDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>({
    id: 5,
    name: "Regular",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleChoiceToggle = (choice: string) => {
    const isSelected = selectedChoices.includes(choice);
    if (!isSelected) {
      if (selectedChoices.length >= comboSelectCount) {
        onChoicesChange([...selectedChoices.slice(1), choice]);
      } else {
        onChoicesChange([...selectedChoices, choice]);
      }
    }
  };

  const handleAddOnsConfirm = (addOns: AddOn[]) => {
    const filteredAddOns = addOns.filter((item) => item.quantity > 0);
    onAddOnsChange(filteredAddOns);
    setIsModalOpen(false);
  };

  // Calculate totals
  const addOnsTotal = selectedAddOns.reduce(
    (sum, addOn) => sum + addOn.price * addOn.quantity,
    0
  );
  const subtotal = price + addOnsTotal;

  // Calculate discount
  let discountAmount = 0;
  if (selectedDiscount) {
    if (selectedDiscount.percentage) {
      discountAmount = (subtotal * selectedDiscount.percentage) / 100;
    } else if (selectedDiscount.amount) {
      discountAmount = selectedDiscount.amount;
    }
  }

  const total = subtotal - discountAmount;

  return (
    <motion.div
      className="border-t border-gray-100 p-5  bg-[#F0F9FA] relative"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Ticket Number Badge */}
      <div className="absolute top-2 right-2 w-8 h-8 bg-sky-main text-white rounded-full flex items-center justify-center font-satoshi font-bold text-sm">
        {ticketNumber}
      </div>

      <div className="bg-gray-50 border border-gray-300 px-8 py-6 rounded-2xl">
        {/* Name + Price */}
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-base font-satoshi font-bold text-navy-dark">
            {label}
          </h4>
          <span className="text-navy-dark font-goteam text-sm">
            PHP {price.toFixed(2)}
          </span>
        </div>

        {/* Combo Choices */}
        {choices && choices.length > 0 && (
          <div className="mb-4">
            {/* Inclusions */}
            <p className="text-sm font-satoshi font-bold text-navy-dark mb-2">
              Inclusions
            </p>
            <div className="flex flex-wrap gap-2">
              {inclusions.map((inclusion, idx) => (
                <span
                  key={idx}
                  className="text-regular text-md rounded flex items-center "
                >
                  {inclusion}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {choices.map((choice, idx) => {
                const isSelected = selectedChoices.includes(choice);
                return (
                  <button
                    key={idx}
                    onClick={() => handleChoiceToggle(choice)}
                    className={`text-xs font-medium px-3 py-1.5 rounded flex items-center gap-1 transition cursor-pointer uppercase ${
                      isSelected
                        ? `text-white bg-${color || "#06AEBD"}`
                        : "border border-[#6EEBF5] bg-white text-[#047C88] hover:bg-gray-200"
                    }`}
                    style={
                      isSelected ? { backgroundColor: color || "#06AEBD" } : {}
                    }
                  >
                    {isSelected && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.5 5L3.5 7.5L8.5 2"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    {choice}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Add-Ons Section */}
        {selectedAddOns.length > 0 ? (
          <div className="mb-4 p-4 bg-white border border-gray-200 rounded-xl">
            <p className="text-sm font-satoshi font-bold text-navy-dark mb-3">
              Add-Ons:
            </p>
            <div className="space-y-2 mb-3">
              {selectedAddOns.map((addOn) => (
                <div
                  key={addOn.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex flex-1 items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-sky-main"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        fill="#06AEBD"
                        fillOpacity="0.2"
                        stroke="#06AEBD"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M4 8L6.5 10.5L12 5"
                        stroke="#06AEBD"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm font-satoshi font-semibold text-navy-dark">
                      {addOn.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
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
                    <span className="text-sm ml-2 font-satoshi text-navy-dark w-8">
                      {`x ${addOn.quantity}`}
                    </span>
                    <span className="text-sm font-goteam text-navy-dark w-46 text-right">
                      PHP {(addOn.price * addOn.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {/* Price Breakdown */}
            <div className="mb-4 p-3">
              <div className="space-y-1 text-xs font-satoshi">
                {isChecked && selectedDiscount && discountAmount > 0 && (
                  <div className="flex justify-between text-red-500">
                    <span>% Discount ({selectedDiscount.name}):</span>
                    <span>- PHP {discountAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full border border-gray-300 text-navy-dark font-satoshi font-semibold py-2 rounded-lg hover:bg-gray-50 transition text-sm"
            >
              Edit Add-Ons
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full border-2 border-dashed border-gray-300 text-navy-dark/60 font-satoshi font-semibold py-3 rounded-xl hover:bg-white transition text-sm mb-4 hover:cursor-pointer"
          >
            + Add-Ons
          </button>
        )}
        <div className="flex flex-col gap-2 mb-4 ">
          <label className="bg-red-100 p-4 rounded-lg border border-red-300 text-navy-dark text-sm font-satoshi flex items-center gap-3">
            {/* Bind the 'checked' attribute to the state variable */}
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => {
                setIsChecked(e.target.checked);
                // Reset to default discount when unchecking
                if (!e.target.checked) {
                  const defaultDiscount = { id: 5, name: "Regular" };
                  setSelectedDiscount(defaultDiscount);
                  onDiscountChange?.(defaultDiscount);
                }
              }}
            />
            {/* Display the current state value */}
            Check this box to see if you qualify for BYB Theme Park discounts.
          </label>
          {isChecked && (
            <div>
              <p className="text-sm font-satoshi font-bold text-navy-dark mb-3">
                Choose the discount type to apply
              </p>
              <BookingDiscountPicker
                onDiscountChange={(discount) => {
                  setSelectedDiscount(discount);
                  onDiscountChange?.(discount);
                }}
              />
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={() => onRemovePackage?.()}
            className="flex-1 bg-navy-dark text-white font-satoshi font-bold py-3 rounded-xl hover:bg-navy-dark/90 transition text-sm hover:cursor-pointer"
          >
            Remove this package
          </button>

          <button
            onClick={() => onAddSamePackage?.(selectedAddOns, selectedChoices)}
            disabled={!canAddMore}
            className={`flex-1 bg-accent-yellow text-white font-satoshi font-bold py-3 rounded-xl hover:bg-accent-yellow/90 transition text-sm ${
              canAddMore
                ? "bg-accent-yellow text-white hover:bg-accent-yellow/90 hover:cursor-pointer"
                : "bg-gray-300 text-gray-500 hover:bg-gray-300 cursor-not-allowed"
            }`}
          >
            Add Same Package
          </button>
        </div>
      </div>
      <BookingAddOnModalAPI
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddOnsConfirm}
        initialAddOns={selectedAddOns}
      />
    </motion.div>
  );
}
