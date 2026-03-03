import { useState } from "react";
import { motion } from "framer-motion";
import BookingAddOnModal from "./BookingAddOnModal";

interface AddOn {
  id: string;
  name: string;
  price: number;
  quantity: number;
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
  onAddOnsChange: (addOns: AddOn[]) => void;
  onRemovePackage?: () => void;
  onAddSamePackage?: (addOns: AddOn[]) => void;
  canAddMore?: boolean;
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
  onAddOnsChange,
  onRemovePackage,
  onAddSamePackage,
  canAddMore = true,
}: BookingPackageExpandedDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChoices, setSelectedChoices] = useState<string[]>(
    choices.slice(0, comboSelectCount),
  );

  const handleChoiceToggle = (choice: string) => {
    setSelectedChoices((prev) => {
      const isSelected = prev.includes(choice);

      if (isSelected) {
        return prev.filter((c) => c !== choice);
      } else {
        if (prev.length >= comboSelectCount) {
          return [...prev.slice(1), choice];
        }
        return [...prev, choice];
      }
    });
  };

  const handleAddOnsConfirm = (addOns: AddOn[]) => {
    const filteredAddOns = addOns.filter((item) => item.quantity > 0);
    onAddOnsChange(filteredAddOns);
    setIsModalOpen(false);
  };

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
                    style={isSelected ? { backgroundColor: color || "#06AEBD" } : {}}
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
                  <div className="flex items-center gap-2">
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
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-satoshi text-navy-dark">
                      x {addOn.quantity}
                    </span>
                    <span className="text-sm font-satoshi font-bold text-sky-main min-w-24 text-right">
                      PHP {(addOn.price * addOn.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
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

        {/* Bottom Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={() => onRemovePackage?.()}
            className="flex-1 bg-navy-dark text-white font-satoshi font-bold py-3 rounded-xl hover:bg-navy-dark/90 transition text-sm hover:cursor-pointer"
          >
            Remove this package
          </button>

          <button
            onClick={() => onAddSamePackage?.(selectedAddOns)}
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
      <BookingAddOnModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddOnsConfirm}
        initialAddOns={selectedAddOns}
      />
    </motion.div>
  );
}
