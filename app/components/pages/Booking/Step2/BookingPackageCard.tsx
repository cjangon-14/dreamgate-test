import { useState } from "react";
import BookingPackageExpandedDetails from "./BookingPackageExpandedDetails";

interface Package {
  id: string;
  name: string;
  label: string;
  price: number;
  description: string;
  image: string;
  badge?: string;
  badgeColor?: string;
  gradient?: string;
  inclusions: string[];
  choices: string[];
  comboSelectCount?: number;
  selectedChoices?: string[];
  color?: string;
  quantity: number;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface TicketAddOns {
  [ticketNumber: number]: AddOn[];
}

interface TicketChoices {
  [ticketNumber: number]: string[];
}

interface BookingPackageCardProps {
  pkg: Package;
  onQuantityChange: (id: string, delta: number) => void;
  onAddOnsChange?: (packageId: string, addOns: AddOn[], ticketAddOns: TicketAddOns) => void;
  onChoicesChange?: (packageId: string, ticketChoices: TicketChoices) => void;
  canAddMore?: boolean;
  initialTicketAddOns?: TicketAddOns;
  initialTicketChoices?: TicketChoices;
}

export default function BookingPackageCard({
  pkg,
  onQuantityChange,
  onAddOnsChange,
  onChoicesChange,
  canAddMore = true,
  initialTicketAddOns = {},
  initialTicketChoices = {},
}: BookingPackageCardProps) {
  const [ticketAddOns, setTicketAddOns] = useState<TicketAddOns>(initialTicketAddOns);
  const [ticketChoices, setTicketChoices] = useState<TicketChoices>(initialTicketChoices);

  const handleAddOnsChange = (ticketNumber: number, addOns: AddOn[]) => {
    const updated = { ...ticketAddOns, [ticketNumber]: addOns };
    setTicketAddOns(updated);
    const allAddOns = Object.values(updated).flat();
    if (onAddOnsChange) {
      onAddOnsChange(pkg.id, allAddOns, updated);
    }
  };

  const handleChoicesChange = (ticketNumber: number, choices: string[]) => {
    const updated = { ...ticketChoices, [ticketNumber]: choices };
    setTicketChoices(updated);
    if (onChoicesChange) {
      onChoicesChange(pkg.id, updated);
    }
  };

const handleRemovePackage = (ticketNumber: number) => {
  const updatedAddOns: TicketAddOns = {};
  const updatedChoices: TicketChoices = {};
  let newTicketNumber = 1;
  
  for (let i = 1; i <= pkg.quantity; i++) {
    if (i !== ticketNumber) {
      if (ticketAddOns[i]) updatedAddOns[newTicketNumber] = ticketAddOns[i];
      if (ticketChoices[i]) updatedChoices[newTicketNumber] = ticketChoices[i];
      newTicketNumber++;
    }
  }
  
  setTicketAddOns(updatedAddOns);
  setTicketChoices(updatedChoices);
  
  const allAddOns = Object.values(updatedAddOns).flat();
  if (onAddOnsChange) {
    onAddOnsChange(pkg.id, allAddOns, updatedAddOns);
  }
  if (onChoicesChange) {
    onChoicesChange(pkg.id, updatedChoices);
  }
  
  onQuantityChange(pkg.id, -1);
};

  const handleAddSamePackage = (currentAddOns: AddOn[], currentChoices: string[]) => {
    const newTicketNumber = pkg.quantity + 1;
    const updatedAddOns = { ...ticketAddOns, [newTicketNumber]: currentAddOns };
    const updatedChoices = { ...ticketChoices, [newTicketNumber]: currentChoices };
    setTicketAddOns(updatedAddOns);
    setTicketChoices(updatedChoices);
    
    const allAddOns = Object.values(updatedAddOns).flat();
    if (onAddOnsChange) {
      onAddOnsChange(pkg.id, allAddOns, updatedAddOns);
    }
    if (onChoicesChange) {
      onChoicesChange(pkg.id, updatedChoices);
    }
    
    onQuantityChange(pkg.id, 1);
  };
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition bg-white">
      {/* Card Top */}
      
      
      <div className="flex items-stretch flex-row min-h-52">
        {/* Package Image — flush left */}
        <div className="shrink-0 relative">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="h-full w-61 object-cover"
          />
          {pkg.gradient && (
            <div
              className="absolute inset-0"
              style={{ background: pkg.gradient, opacity: 0.8 }}
            />
          )}
          {pkg.badge && (
            <span
              className={`absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-md ${pkg.badgeColor ?? "bg-navy-main"}`}
            >
              {pkg.badge}
            </span>
          )}
        </div>

        <div className="flex flex-col mx-3">
          {/* Package Info */}
          <div className="flex-1 p-5 flex justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-satoshi font-bold text-navy-dark">
                {pkg.label}
              </h3>
              <p className="text-sm text-regular mt-1">{pkg.description}</p>
            </div>
            <div className="flex flex-col items-end shrink-0 min-w-46">
              {/* Price */}
              <span className="text-xl font-goteam text-navy-dark whitespace-nowrap">
                PHP {pkg.price.toFixed(2)}
              </span>
              {/* 1 Pass Per Person */}
              <div className="flex items-center gap-1.5 text-navy-dark/60 text-sm font-satoshi mt-1">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="whitespace-nowrap">1 Pass Per Person</span>
              </div>
            </div>
          </div>

          {/* Quantity & Package Details */}
          <div className="flex justify-between items-center flex-row px-5 py-4">
            <button className="border border-sky-main text-sky-main font-satoshi font-semibold px-4 py-2 rounded-lg hover:bg-sky-main/10 transition text-sm hover:cursor-pointer">
              Package Details
            </button>
            <div className="flex items-center gap-2 ">
              <button
                onClick={() => handleRemovePackage(pkg.quantity)}
                disabled={pkg.quantity === 0}
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition text-lg font-bold ${
                  pkg.quantity > 0
                    ? "bg-accent-yellow text-white hover:bg-accent-yellow/90 cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                −
              </button>
              <span className="w-6 text-center font-semibold text-navy-dark">
                {pkg.quantity}
              </span>
              <button
                onClick={() => onQuantityChange(pkg.id, 1)}
                disabled={!canAddMore}
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition text-lg font-bold ${
                  canAddMore
                    ? "bg-accent-yellow text-white hover:bg-accent-yellow/90 cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details Sections - One for each ticket */}
        {Array.from({ length: pkg.quantity }).map((_, index) => {
          const ticketNumber = index + 1;
          return (
            <BookingPackageExpandedDetails
              key={`${pkg.id}-ticket-${ticketNumber}`}
              label={pkg.label}
              price={pkg.price}
              inclusions={pkg.inclusions}
              choices={pkg.choices}
              color={pkg.color}
              comboSelectCount={pkg.comboSelectCount}
              ticketNumber={ticketNumber}
              selectedAddOns={ticketAddOns[ticketNumber] || []}
              selectedChoices={ticketChoices[ticketNumber] ?? pkg.choices.slice(0, pkg.comboSelectCount ?? 2)}
              onAddOnsChange={(addOns) =>
                handleAddOnsChange(ticketNumber, addOns)
              }
              onChoicesChange={(choices) =>
                handleChoicesChange(ticketNumber, choices)
              }
              onRemovePackage={() => handleRemovePackage(ticketNumber)}
              onAddSamePackage={handleAddSamePackage}
              canAddMore={canAddMore}
            />
          );
        })}
    </div>
  );
}
