import { useEffect, useState } from "react";

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

interface AddOn {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface BookingSummaryProps {
  selectedPackages: Package[];
  addOnsByPackage?: { [packageId: string]: AddOn[] };
}

export default function BookingSummary({
  selectedPackages,
  addOnsByPackage = {},
}: BookingSummaryProps) {
  const packageTotal = selectedPackages.reduce(
    (sum, pkg) => sum + pkg.price * pkg.quantity,
    0,
  );

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      setScrolled(document.documentElement.scrollTop > 120);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const addOnsTotal = Object.values(addOnsByPackage).reduce(
    (sum, addOns) =>
      sum +
      addOns.reduce((addOnSum, addOn) => addOnSum + addOn.price * addOn.quantity, 0),
    0,
  );

  const total = packageTotal + addOnsTotal;

  return (
    <div className={`border border-sky-main/20 rounded-xl overflow-hidden w-110 ${
      scrolled 
      ? "fixed top-18 w-110 " 
      : "relative"
      
      }`}>

      <div className="p-6 bg-white">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-satoshi font-bold text-navy-dark">
            Booking Summary
          </h3>
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="35"
              height="35"
              rx="5.5"
              stroke="#BAD2E5"
            />
            <path
              d="M19 22H14"
              stroke="#455873"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 14H14"
              stroke="#455873"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M22 18H14"
              stroke="#455873"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 9C10 8.73478 10.1054 8.48043 10.2929 8.29289C10.4804 8.10536 10.7348 8 11 8C11.2476 7.99864 11.4905 8.06803 11.7 8.2L12.633 8.8C12.842 8.93358 13.0849 9.00456 13.333 9.00456C13.5811 9.00456 13.824 8.93358 14.033 8.8L14.967 8.2C15.176 8.06642 15.4189 7.99545 15.667 7.99545C15.9151 7.99545 16.158 8.06642 16.367 8.2L17.3 8.8C17.509 8.93358 17.7519 9.00456 18 9.00456C18.2481 9.00456 18.491 8.93358 18.7 8.8L19.633 8.2C19.842 8.06642 20.0849 7.99545 20.333 7.99545C20.5811 7.99545 20.824 8.06642 21.033 8.2L21.967 8.8C22.176 8.93358 22.4189 9.00456 22.667 9.00456C22.9151 9.00456 23.158 8.93358 23.367 8.8L24.3 8.2C24.5095 8.06803 24.7524 7.99864 25 8C25.2652 8 25.5196 8.10536 25.7071 8.29289C25.8946 8.48043 26 8.73478 26 9V27C26 27.2652 25.8946 27.5196 25.7071 27.7071C25.5196 27.8946 25.2652 28 25 28C24.7524 28.0014 24.5095 27.932 24.3 27.8L23.367 27.2C23.158 27.0664 22.9151 26.9954 22.667 26.9954C22.4189 26.9954 22.176 27.0664 21.967 27.2L21.033 27.8C20.824 27.9336 20.5811 28.0046 20.333 28.0046C20.0849 28.0046 19.842 27.9336 19.633 27.8L18.7 27.2C18.491 27.0664 18.2481 26.9954 18 26.9954C17.7519 26.9954 17.509 27.0664 17.3 27.2L16.367 27.8C16.158 27.9336 15.9151 28.0046 15.667 28.0046C15.4189 28.0046 15.176 27.9336 14.967 27.8L14.033 27.2C13.824 27.0664 13.5811 26.9954 13.333 26.9954C13.0849 26.9954 12.842 27.0664 12.633 27.2L11.7 27.8C11.4905 27.932 11.2476 28.0014 11 28C10.7348 28 10.4804 27.8946 10.2929 27.7071C10.1054 27.5196 10 27.2652 10 27V9Z"
              stroke="#455873"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-sm font-satoshi text-sky-main mb-4">
          Double-check your selected packages and total amount here.
        </p>
        <hr className="border-gray-200 mb-6" />

        {selectedPackages.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-gray-400">
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.3">
                <path
                  d="M6.75 12L22.62 4.41C22.7999 4.32389 22.9952 4.27453 23.1944 4.2648C23.3936 4.25506 23.5928 4.28516 23.7802 4.35332C23.9676 4.42148 24.1396 4.52634 24.286 4.66176C24.4325 4.79718 24.5504 4.96045 24.633 5.142L27.75 12"
                  stroke="#455873"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 15V12"
                  stroke="#455873"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 21V22.5"
                  stroke="#455873"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 28.5V31.5"
                  stroke="#455873"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M30 12H6C4.34315 12 3 13.3431 3 15V28.5C3 30.1569 4.34315 31.5 6 31.5H30C31.6569 31.5 33 30.1569 33 28.5V15C33 13.3431 31.6569 12 30 12Z"
                  stroke="#455873"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>

            <p className="text-sm font-satoshi">
              Order summary is currently empty
            </p>
          </div>
        ) : (
          <div className="p-2">
            {selectedPackages.map((pkg, index) => {
              const pkgAddOnsTotal = (addOnsByPackage[pkg.id] ?? []).reduce(
                (sum, addOn) => sum + addOn.price * addOn.quantity,
                0,
              );
              const pkgRowTotal = pkg.price * pkg.quantity + pkgAddOnsTotal;
              return (
              <div key={pkg.id}>
                <div className="grid grid-cols-[1fr_auto_0.5fr] items-center gap-4 ">
                  {/* LEFT: Package Info */}
                  <div>
                    <div className="font-satoshi font-medium text-navy-dark text-sm">
                      {pkg.label}
                    </div>
                  </div>

                  {/* MIDDLE: Quantity */}
                  <div className="flex items-center gap-3">
                    <svg
                      width="29"
                      height="23"
                      viewBox="0 0 29 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.25 8.16667L17.0667 3.95C17.1666 3.90216 17.2751 3.87474 17.3858 3.86933C17.4964 3.86393 17.6071 3.88064 17.7112 3.91851C17.8154 3.95638 17.9109 4.01463 17.9922 4.08987C18.0736 4.1651 18.1391 4.2558 18.185 4.35667L19.9167 8.16667"
                        stroke="#455873"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.5 9.83333V8.16667"
                        stroke="#455873"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.5 13.1667V14"
                        stroke="#455873"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.5 17.3333V19"
                        stroke="#455873"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21.1665 8.16667H7.83317C6.9127 8.16667 6.1665 8.91286 6.1665 9.83333V17.3333C6.1665 18.2538 6.9127 19 7.83317 19H21.1665C22.087 19 22.8332 18.2538 22.8332 17.3333V9.83333C22.8332 8.91286 22.087 8.16667 21.1665 8.16667Z"
                        stroke="#455873"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span className="text-sm font-satoshi font-bold text-gray-600">
                      x {pkg.quantity}
                    </span>
                  </div>

                  {/* RIGHT: Price */}
                  <div className="text-right min-w-max">
                    <span className="font-goteam text-navy-dark text-lg">
                      {pkgRowTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Add-Ons for this Package */}
                {addOnsByPackage[pkg.id] &&
                  addOnsByPackage[pkg.id].length > 0 && (
                    <div className=" pb-3">
                      <div className="text-sm font-satoshi font-medium text-[#047C88] ">
                        (WITH ADD-ONS)
                      </div>
                    </div>
                  )}

                {index < selectedPackages.length - 1 && (
                  <div className="border-b border-gray-200" />
                )}
              </div>
              );
            })}

            {/* Discount Row */}
            <div className="border-t border-sky-main/20 border-dashed py-4 flex items-center justify-between">
              <span className="font-satoshi font-medium text-sky-main">
                Discount
              </span>
              <span className="font-goteam text-navy-dark text-lg">0.00</span>
            </div>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="bg-sky-main/10 border-t border-sky-main/20 px-6 py-4 flex items-center justify-between">
        <span className="font-satoshi font-bold text-navy-dark text-lg">
          Total
        </span>
        <span className="font-goteam text-sky-main text-2xl">
          PHP {total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
