import { useState } from 'react';

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

const defaultAddOns: AddOn[] = [
  { id: '1', name: 'Wonder Flight', price: 50, quantity: 0 },
  { id: '2', name: 'Mini Spinner', price: 50, quantity: 0 },
  { id: '3', name: 'Mini Pendulum', price: 50, quantity: 0 },
  { id: '4', name: 'Grand Carousel', price: 50, quantity: 0 },
  { id: '5', name: 'Wacky Adventure', price: 50, quantity: 0 },
  { id: '6', name: 'Loop', price: 50, quantity: 0 },
  { id: '7', name: 'BYB Express', price: 50, quantity: 0 },
];

export default function BookingAddOnModal({ 
  isOpen = true, 
  onClose = () => {}, 
  onConfirm = () => {},
  initialAddOns = []
}: BookingAddOnModalProps) {
  const getInitialState = () => {
    if (initialAddOns.length > 0) {
      // Merge initial add-ons with default add-ons to maintain all options
      return defaultAddOns.map(defaultItem => {
        const initialItem = initialAddOns.find(item => item.id === defaultItem.id);
        return initialItem ? { ...defaultItem, quantity: initialItem.quantity } : defaultItem;
      });
    }
    return defaultAddOns;
  };

  const [addOns, setAddOns] = useState<AddOn[]>(getInitialState());

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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-satoshi font-bold text-navy-dark">
              Add-Ons
            </h2>
            <p className="text-sm font-satoshi font-light  text-navy-dark">
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
        <div className="grid grid-cols-[2fr_1fr_1.5fr] gap-8 mb-4 pb-4 border-b border-gray-200">
          <div className="text-sm font-satoshi font-medium text-[#047C88]">
            Rides
          </div>
          <div className="text-sm font-satoshi font-medium text-[#047C88]">
            Price
          </div>
          <div className="text-sm font-satoshi font-medium text-[#047C88]">
            Quantity
          </div>
        </div>

        {/* Add-Ons List */}
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
                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sky-main font-bold hover:cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-navy-dark font-satoshi font-bold py-3 rounded-xl hover:bg-gray-50 transition"
          >
            Back
          </button>
          <button
            onClick={() => onConfirm(addOns)}
            className="flex-1 bg-sky-main hover:bg-sky-dark text-white font-satoshi font-bold py-3 rounded-xl transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}