import { useState, useEffect } from 'react';
import { getAttractions } from '~/api/attractions';

interface AddOn {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface BookingAddOnModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: (addOns: AddOn[]) => void;
  initialAddOns?: AddOn[];
}

export default function BookingAddOnModalAPI({ 
  isOpen = true, 
  onClose = () => {}, 
  onConfirm = () => {},
  initialAddOns = []
}: BookingAddOnModalProps) {
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    getAttractions()
      .then((packages) => {
        // Collect all unique nested attractions across all packages
        const seen = new Set<number>();
        const items: AddOn[] = [];
        for (const pkg of packages) {
          for (const attr of pkg.attractions ?? []) {
            if (!seen.has(attr.id)) {
              seen.add(attr.id);
              const existing = initialAddOns.find((a) => a.id === String(attr.id));
              items.push({
                id: String(attr.id),
                name: attr.name,
                price: attr.base_amount,
                quantity: existing?.quantity ?? 0,
              });
            }
          }
        }
        setAddOns(items);
      })
      .catch((err) => setError(err.message ?? 'Failed to load add-ons.'))
      .finally(() => setLoading(false));
  }, [isOpen]);

  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => { lenis?.start(); };
  }, [isOpen]);

  const handleQuantityChange = (id: string, delta: number) => {
    setAddOns(
      addOns.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
    );
  };

  if (!isOpen) return null;

  const renderBody = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12 text-gray-400 font-satoshi text-sm">
          Loading add-ons...
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex justify-center items-center py-12 text-red-500 font-satoshi text-sm">
          {error}
        </div>
      );
    }
    return (
      <div>
        {addOns.map((addOn) => (
          <div
            key={addOn.id}
            className="grid grid-cols-[2fr_1fr_1.5fr] gap-8 items-center py-3.5 border-b border-gray-100 last:border-b-0"
          >
            {/* Ride Name */}
            <div>
              <h3 className="text-base font-satoshi font-bold text-navy-dark">
                {addOn.name}
              </h3>
            </div>

            {/* Price Badge */}
            <div>
              <span className="bg-[#EEF4F9] text-regular text-xs font-satoshi font-bold px-3 py-1.5 rounded-md whitespace-nowrap inline-block">
                P{addOn.price} PASS PER TICKET
              </span>
            </div>

            {/* Quantity Controls */}
            <div className="flex ">
              <div className="flex items-center bg-[#F5F8FB] gap-2 px-1 py-1 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(addOn.id, -1)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-600 font-bold hover:cursor-pointer"
                >
                  −
                </button>
                <span className="w-8 text-center font-satoshi font-semibold text-navy-dark">
                  {addOn.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(addOn.id, 1)}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gate-main font-bold hover:cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="px-8 pt-8 pb-0 shrink-0">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-satoshi font-bold text-navy-dark">
                Add-Ons
              </h2>
              <p className="text-sm font-satoshi font-light text-navy-dark">
                Select any add-ons to enhance your booking
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition text-2xl w-6 h-6 flex items-center justify-center"
            >
              ×
            </button>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-[2fr_1fr_1.5fr] gap-8 pb-4 border-b border-gray-200">
            <div className="text-sm font-satoshi font-medium text-[#047C88]">Rides</div>
            <div className="text-sm font-satoshi font-medium text-[#047C88]">Price</div>
            <div className="text-sm font-satoshi font-medium text-[#047C88]">Quantity</div>
          </div>
        </div>

        {/* Scrollable Add-Ons List */}
        <div className="overflow-y-auto px-8 py-2 flex-1" data-lenis-prevent>
          {renderBody()}
        </div>

        {/* Sticky Footer */}
        <div className="px-8 pb-8 pt-4 border-t border-gray-200 shrink-0">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-navy-dark font-satoshi font-bold py-3 rounded-xl hover:bg-gray-50 transition hover:cursor-pointer"
            >
              Back
            </button>
            <button
              onClick={() => onConfirm(addOns)}
              className="flex-1 bg-gate-main hover:bg-gate-dark text-white font-satoshi font-bold py-3 rounded-xl transition hover:cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}