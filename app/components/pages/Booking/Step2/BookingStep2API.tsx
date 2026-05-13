import { useState, useEffect } from "react";
import BookingPackageCard from "./BookingPackageCard";
import { getAttractions } from "~/api/attractions";
import { cardImagePlaceholder } from "~/assets";
import { attractions as localAttractions } from "~/data/attractions";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

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
  onTicketAddOnsChange?: (ticketAddOnsByPackage: {
    [packageId: string]: TicketAddOns;
  }) => void;
  ticketChoicesByPackage?: { [packageId: string]: TicketChoices };
  onTicketChoicesChange?: (ticketChoicesByPackage: {
    [packageId: string]: TicketChoices;
  }) => void;
}

export default function BookingStep2API({
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
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [addOnsByPackage, setAddOnsByPackage] = useState<{
    [packageId: string]: AddOn[];
  }>(initialAddOns);
  const [ticketAddOnsByPackage, setTicketAddOnsByPackage] = useState<{
    [packageId: string]: TicketAddOns;
  }>(initialTicketAddOns);
  const [ticketChoicesByPackage, setTicketChoicesByPackage] = useState<{
    [packageId: string]: TicketChoices;
  }>(initialTicketChoices);

  useEffect(() => {
    const normName = (n: string) => n.trim().toLowerCase();

    const localStyleMap = Object.fromEntries(
      localAttractions.map((a, i) => [
        normName(a.name),
        {
          gradient: a.gradient,
          badgeColor: a.badgeColor,
          color: a.color,
          image_path: a.image_path,
          inclusions: a.inclusions,
          choices: a.choices,
          _order: i,
        },
      ]),
    );

    getAttractions()
      .then((attractions) => {
        const ORDER = ["Entrance", "Child Combo", "Teen Combo", "Adult Combo"];
        const mapped: Package[] = attractions
          .map((attr) => {
            const existing = selectedPackages.find(
              (p) => p.id === String(attr.id),
            );
            const hasSelectable =
              attr.selectable_attractions && attr.selectable_attractions > 0;
            const apiAttractionNames =
              attr.attractions && attr.attractions.length > 0
                ? attr.attractions.map((a) => a.name)
                : [];
            const local = localStyleMap[normName(attr.name)];

            return {
              id: String(attr.id),
              name: attr.name,
              label: attr.label,
              price: attr.base_amount,
              description: attr.description,
              image:
                attr.image_path || local?.image_path || cardImagePlaceholder,
              badge: attr.name,
              badgeColor: attr.badgeColor ?? local?.badgeColor,
              gradient: attr.gradient ?? local?.gradient,
              inclusions: hasSelectable
                ? (local?.inclusions ?? attr.inclusions ?? [])
                : apiAttractionNames.length > 0
                  ? apiAttractionNames
                  : (local?.inclusions ?? attr.inclusions ?? []),
              choices: hasSelectable
                ? apiAttractionNames.length > 0
                  ? apiAttractionNames
                  : (local?.choices ?? attr.choices ?? [])
                : (local?.choices ?? attr.choices ?? []),
              comboSelectCount: hasSelectable
                ? attr.selectable_attractions
                : undefined,
              quantity: existing?.quantity ?? 0,
              color: attr.color ?? local?.color,
            };
          })
          .sort((a, b) => {
            const ai = ORDER.indexOf(a.name);
            const bi = ORDER.indexOf(b.name);
            return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
          });
        setPackages(mapped);
      })
      .catch((err) => setError(err.message ?? "Failed to load packages."))
      .finally(() => setLoading(false));
  }, []);

  const handleQuantityChange = (id: string, delta: number) => {
    const totalTickets = packages.reduce((sum, pkg) => sum + pkg.quantity, 0);
    const MAX_TICKETS = 5;

    if (delta > 0 && totalTickets >= MAX_TICKETS) return;

    const updated = packages.map((pkg) =>
      pkg.id === id
        ? { ...pkg, quantity: Math.max(0, pkg.quantity + delta) }
        : pkg,
    );
    setPackages(updated);
    onPackagesChange(updated.filter((p) => p.quantity > 0));
  };

  const totalTickets = packages.reduce((sum, pkg) => sum + pkg.quantity, 0);
  const canAddMore = totalTickets < 5;

  const handleAddOnsChange = (
    packageId: string,
    addOns: AddOn[],
    ticketAddOns: TicketAddOns,
  ) => {
    const updatedFlat = { ...addOnsByPackage, [packageId]: addOns };
    setAddOnsByPackage(updatedFlat);
    if (onAddOnsChange) onAddOnsChange(updatedFlat);

    const updatedTickets = {
      ...ticketAddOnsByPackage,
      [packageId]: ticketAddOns,
    };
    setTicketAddOnsByPackage(updatedTickets);
    if (onTicketAddOnsChange) onTicketAddOnsChange(updatedTickets);
  };

  const handleChoicesChange = (
    packageId: string,
    ticketChoices: TicketChoices,
  ) => {
    const updated = { ...ticketChoicesByPackage, [packageId]: ticketChoices };
    setTicketChoicesByPackage(updated);
    if (onTicketChoicesChange) onTicketChoicesChange(updated);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="w-full">
            <CardHeader>
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="aspect-video w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-16 text-red-500 font-satoshi text-sm">
        {error}
      </div>
    );
  }

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
            onClick={() => {
              if (totalTickets > 0) onNext();
            }}
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
