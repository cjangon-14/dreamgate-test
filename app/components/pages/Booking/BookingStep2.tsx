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
  quantity: number;
}

interface BookingStep2Props {
  onNext: () => void;
  onBack: () => void;
  selectedPackages: Package[];
  onPackagesChange: (packages: Package[]) => void;
}

export default function BookingStep2({
  onNext,
  onBack,
  selectedPackages,
  onPackagesChange,
}: BookingStep2Props) {
  const [packages, setPackages] = useState<Package[]>(
    attractions.map((attr) => ({
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
      quantity: 0,
    })),
  );

  const handleQuantityChange = (id: string, delta: number) => {
    const updated = packages.map((pkg) =>
      pkg.id === id
        ? { ...pkg, quantity: Math.max(0, pkg.quantity + delta) }
        : pkg,
    );
    setPackages(updated);
    onPackagesChange(updated.filter(p => p.quantity > 0));
  };

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
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-4">
        <span className="bg-sky-main/20 text-navy-main font-satoshi font-bold text-xs px-3 py-1 rounded-full">
          STEP 2 OF 4
        </span>
        <div className="flex gap-2">
          <div className="h-1 w-12 bg-sky-main rounded-full" />
          <div className="h-1 w-12 bg-sky-main rounded-full" />
          <div className="h-1 w-12 bg-gray-200 rounded-full" />
          <div className="h-1 w-12 bg-gray-200 rounded-full" />
        </div>
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Package Selection Header */}
      <h2 className="text-2xl font-satoshi font-bold text-navy-dark mb-1">
        Package Selection
      </h2>
      <p className="text-sm font-satoshi text-gray-500 mb-6">
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
          />
        ))}
      </div>

      <hr className="border-gray-200 mb-6" />

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="border border-navy-dark/20 text-navy-dark font-satoshi font-bold px-8 py-2.5 rounded-lg hover:bg-gray-50 transition cursor-pointer"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-sky-main hover:bg-sky-dark text-white font-satoshi font-bold px-8 py-2.5 rounded-lg transition cursor-pointer"
        >
          Next
        </button>
      </div>
    </>
  );
}
