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

interface BookingPackageCardProps {
  pkg: Package;
  onQuantityChange: (id: string, delta: number) => void;
}

export default function BookingPackageCard({
  pkg,
  onQuantityChange,
}: BookingPackageCardProps) {
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
              className={`absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-md ${pkg.badgeColor ?? "bg-sky-main"}`}
            >
              {pkg.badge}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          {/* Package Info */}
          <div className="flex-1 p-5 flex justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-satoshi font-bold text-navy-dark">
                {pkg.label}
              </h3>
              <p className="text-sm text-regular mt-1 line-clamp-2">
                {pkg.description}
              </p>
            </div>
            <div className="flex flex-col items-end shrink-0 min-w-56">
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
            <button className="border border-sky-main text-sky-main font-satoshi font-semibold px-4 py-2 rounded-lg hover:bg-sky-main/5 transition text-sm">
              Package Details
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onQuantityChange(pkg.id, -1)}
                className="w-9 h-9 flex items-center justify-center bg-accent-yellow text-white rounded-lg hover:bg-accent-yellow/90 transition text-lg font-bold cursor-pointer"
              >
                −
              </button>
              <span className="w-6 text-center font-semibold text-navy-dark">
                {pkg.quantity}
              </span>
              <button
                onClick={() => onQuantityChange(pkg.id, 1)}
                className="w-9 h-9 flex items-center justify-center bg-accent-yellow text-white rounded-lg hover:bg-accent-yellow/90 transition text-lg font-bold cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Details Section */}
      {pkg.quantity > 0 && (
        <div className="border-t border-gray-100 p-5 bg-[#F0F9FA]">
          {/* Name + Price */}
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-base font-satoshi font-bold text-navy-dark">
              {pkg.label}
            </h4>
            <span className="text-sky-main font-bold text-sm">
              PHP {pkg.price.toFixed(2)}
            </span>
          </div>

          {/* Inclusions */}
          <p className="text-sm font-satoshi font-bold text-navy-dark mb-2">
            Inclusions
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {pkg.inclusions.map((inclusion, idx) => (
              <span
                key={idx}
                className="bg-sky-main text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1"
              >
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
                {inclusion}
              </span>
            ))}
          </div>

          {/* Add-Ons */}
          <button className="w-full border-2 border-dashed border-gray-300 text-navy-dark/60 font-satoshi font-semibold py-3 rounded-xl hover:bg-white transition text-sm mb-4">
            + Add-Ons
          </button>

          {/* Bottom Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button className="flex-1 bg-navy-dark text-white font-satoshi font-bold py-3 rounded-xl hover:bg-navy-dark/90 transition text-sm">
              Remove this package
            </button>
            <button className="flex-1 bg-accent-yellow text-white font-satoshi font-bold py-3 rounded-xl hover:bg-accent-yellow/90 transition text-sm">
              Add Same Package
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
