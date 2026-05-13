import { useState } from "react";
import BookingPackageCard from "./BookingPackageCard";
import { attractions } from "~/data/attractions";

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
  quantity: number;
  color?: string;
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

interface BookingStep2Props {
  onNext: () => void;
  onBack: () => void;
  selectedPackages: Package[];
  onPackagesChange: (packages: Package[]) => void;
  onAddOnsChange?: (addOnsByPackage: { [packageId: string]: AddOn[] }) => void;
  addOnsByPackage?: { [packageId: string]: AddOn[] };
  ticketAddOnsByPackage?: { [packageId: string]: TicketAddOns };
  onTicketAddOnsChange?: (ticketAddOnsByPackage: { [packageId: string]: TicketAddOns }) => void;
  ticketChoicesByPackage?: { [packageId: string]: TicketChoices };
  onTicketChoicesChange?: (ticketChoicesByPackage: { [packageId: string]: TicketChoices }) => void;
}

export default function BookingStep2Local({
  onNext,
  onBack,
  selectedPackages,
  onPackagesChange,
  onAddOnsChange,
  addOnsByPackage: initialAddOns = {},
  ticketAddOnsByPackage: initialTicketAddOns = {},
  onTicketAddOnsChange,
  ticketChoicesByPackage: initialTicketChoices = {},
  onTicketChoicesChange,
}: BookingStep2Props) {
  const [packages, setPackages] = useState<Package[]>(
    attractions.map((attr) => {
      const existing = selectedPackages.find((p) => p.id === attr.id);
      return {
        id: attr.id,
        name: attr.name,
        label: attr.label,
        price: attr.base_amount,
        description: attr.description,
        image: attr.image_path,
        badge: attr.name,
        badgeColor: attr.badgeColor,
        gradient: attr.gradient,
        inclusions: attr.inclusions ?? [],
        choices: attr.choices ?? [],
        quantity: existing?.quantity ?? 0,
        color: attr.color,
      };
    }),
  );
  const [addOnsByPackage, setAddOnsByPackage] = useState<{
    [packageId: string]: AddOn[];
  }>(initialAddOns);
  const [ticketAddOnsByPackage, setTicketAddOnsByPackage] = useState<{
    [packageId: string]: TicketAddOns;
  }>(initialTicketAddOns);
  const [ticketChoicesByPackage, setTicketChoicesByPackage] = useState<{
    [packageId: string]: TicketChoices;
  }>(initialTicketChoices);

  const handleQuantityChange = (id: string, delta: number) => {
    const totalTickets = packages.reduce((sum, pkg) => sum + pkg.quantity, 0);
    const MAX_TICKETS = 5;

    // Only allow increment if total won't exceed limit
    if (delta > 0 && totalTickets >= MAX_TICKETS) {
      return;
    }

    const updated = packages.map((pkg) =>
      pkg.id === id
        ? { ...pkg, quantity: Math.max(0, pkg.quantity + delta) }
        : pkg,
    );
    setPackages(updated);
    onPackagesChange(updated.filter(p => p.quantity > 0));
  };

  const totalTickets = packages.reduce((sum, pkg) => sum + pkg.quantity, 0);
  const canAddMore = totalTickets < 5;

  const handleAddOnsChange = (packageId: string, addOns: AddOn[], ticketAddOns: TicketAddOns) => {
    const updatedFlat = { ...addOnsByPackage, [packageId]: addOns };
    setAddOnsByPackage(updatedFlat);
    if (onAddOnsChange) {
      onAddOnsChange(updatedFlat);
    }
    const updatedTickets = { ...ticketAddOnsByPackage, [packageId]: ticketAddOns };
    setTicketAddOnsByPackage(updatedTickets);
    if (onTicketAddOnsChange) {
      onTicketAddOnsChange(updatedTickets);
    }
  };

  const handleChoicesChange = (packageId: string, ticketChoices: TicketChoices) => {
    const updated = { ...ticketChoicesByPackage, [packageId]: ticketChoices };
    setTicketChoicesByPackage(updated);
    if (onTicketChoicesChange) {
      onTicketChoicesChange(updated);
    }
  };

  return (
    <>
      <hr className="border-gray-200 mb-6" />

      {/* Package Selection Header */}
      <h2 className="text-2xl font-satoshi font-bold text-navy-dark mb-1">
        Package Selection
      </h2>
      <p className="text-sm font-satoshi text-sky-main mb-6">
        Choose your preferred package and add-ons, and tailor it to match your
        booking needs.
      </p>

      {/* Packages List */}
      <div className="space-y-4 mb-8">
        {packages.map((pkg) => (
          <BookingPackageCard
            key={pkg.id}
            pkg={pkg}
            onQuantityChange={handleQuantityChange}
            onAddOnsChange={handleAddOnsChange}
            onChoicesChange={handleChoicesChange}
            canAddMore={canAddMore}
            initialTicketAddOns={ticketAddOnsByPackage[pkg.id] ?? {}}
            initialTicketChoices={ticketChoicesByPackage[pkg.id] ?? {}}
          />
        ))}
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="border border-sky-main/20 text-sky-main font-satoshi font-bold px-8 py-2.5 rounded-lg hover:bg-sky-main/10 transition cursor-pointer"
        >
          Back
        </button>
        <div className="flex flex-col items-end gap-1">
          {totalTickets === 0 && (
            <p className="text-xs text-red-500 font-satoshi">
              Please select at least one package to continue.
            </p>
          )}
          <button
            onClick={() => { if (totalTickets > 0) onNext(); }}
            disabled={totalTickets === 0}
            className={`bg-accent-yellow text-navy-dark font-satoshi font-bold px-8 py-2.5 rounded-lg transition ${
              totalTickets === 0
                ? "cursor-not-allowed bg-gray-light text-gray-main"
                : "hover:bg-accent-yellow/90"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
