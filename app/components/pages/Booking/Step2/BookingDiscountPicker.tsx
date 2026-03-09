"use client";

import * as React from "react";
import { Button } from "~/components/ui/button";
import { getDiscounts } from "~/api/discounts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface Discount {
  id: number;
  name: string;
  percentage?: number;
  amount?: number;
}

interface BookingDiscountPickerProps {
  onDiscountChange?: (discount: Discount) => void;
}

export function BookingDiscountPicker({
  onDiscountChange,
}: BookingDiscountPickerProps) {
  const [selectedDiscountId, setSelectedDiscountId] = React.useState("");
  const [discounts, setDiscounts] = React.useState<Discount[]>([]);
  const [loading, setLoading] = React.useState(true);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState(0);

  // Fetch discounts on mount
  React.useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const data = await getDiscounts();
        console.log("Raw discount data:", data);
        // Handle different response formats
        const discountArray = Array.isArray(data) 
          ? data 
          : data?.data || data?.discounts || Object.values(data || {});
        console.log("Processed discount array:", discountArray);
        setDiscounts(discountArray);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch discounts:", error);
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

  React.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  const handleDiscountChange = (discountId: string) => {
    setSelectedDiscountId(discountId);
    const selected = discounts.find(
      (d) => d.id.toString() === discountId
    );
    if (selected && onDiscountChange) {
      onDiscountChange(selected);
    }
  };

  const selectedDiscount = discounts.find(
    (d) => d.id.toString() === selectedDiscountId
  );

  // Filter to only show PWD and Senior Citizen
  const filteredDiscounts = discounts.filter(
    (d) =>
      d.name.toLowerCase().includes("pwd") ||
      d.name.toLowerCase().includes("senior")
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          disabled={loading}
          className={`w-full flex justify-between items-center px-4 ${
            selectedDiscountId
              ? "text-navy-dark bg-white border-gray-300"
              : "text-gray-400 bg-white border-gray-300"
          }`}
        >
          <span>
            {loading
              ? "Loading discounts..."
              : selectedDiscount
                ? selectedDiscount.name
                : "Discount Type"}
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border-none bg-white"
        style={{ width: triggerWidth ? `${triggerWidth}px` : "auto" }}
        align="start"
      >
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup
            value={selectedDiscountId}
            onValueChange={handleDiscountChange}
            className="font-satoshi text-sm"
          >
            {filteredDiscounts.map((discount) => (
              <DropdownMenuRadioItem
                key={discount.id}
                value={discount.id.toString()}
                className="[&>span]:hidden px-4 py-2 cursor-pointer"
              >
                {discount.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
