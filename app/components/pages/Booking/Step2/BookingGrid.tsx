import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import BookingStep1 from "../Step1/BookingStep1";
import BookingStep2API from "./BookingStep2API";
import BookingStep3 from "../Step3/BookingStep3";
import BookingSummary from "./BookingSummary";
import BookingStepHeader from "../BookingStepHeader";
import { createBooking } from "~/api/bookings";

interface Discount {
  id: number;
  name: string;
  percentage?: number;
  amount?: number;
}

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
  attractionItems: { id: number; name: string }[];
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

export default function BookingGrid() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [selectedPackages, setSelectedPackages] = useState<Package[]>([]);
  const [addOnsByPackage, setAddOnsByPackage] = useState<{
    [packageId: string]: AddOn[];
  }>({});
  const [ticketAddOnsByPackage, setTicketAddOnsByPackage] = useState<{
    [packageId: string]: TicketAddOns;
  }>({});
  const [ticketChoicesByPackage, setTicketChoicesByPackage] = useState<{
    [packageId: string]: { [ticketNumber: number]: string[] };
  }>({});
  const [discountByPackage, setDiscountByPackage] = useState<{ [packageId: string]: Discount | null }>({});
  const [step1FormData, setStep1FormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    email: "",
    address: "",
    mobile: "",
    age: "",
    gender: "",
    date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const handleNext = () => {
    setDirection(1);
    setStep(step + 1);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(step - 1);
  };

  const handleProceedToPayment = async () => {
    if (!step1FormData.date) {
      alert("Please select a check-in date");
      return;
    }

    setIsSubmitting(true);
    try {
      const packagesPayload = selectedPackages.flatMap((pkg) => {
        const nameToId = new Map(
          pkg.attractionItems?.map((a) => [a.name.toLowerCase(), a.id]) ?? []
        );

        return Array.from({ length: pkg.quantity }, (_, i) => {
          const ticketNumber = i + 1;

          let attractions: number[];
          if (pkg.comboSelectCount) {
            const choiceNames =
              ticketChoicesByPackage[pkg.id]?.[ticketNumber]?.length > 0
                ? ticketChoicesByPackage[pkg.id][ticketNumber]
                : pkg.choices.slice(0, pkg.comboSelectCount);
            attractions = choiceNames
              .map((name) => nameToId.get(name.toLowerCase()))
              .filter((id): id is number => id !== undefined);
          } else {
            attractions = pkg.inclusions
              .map((name) => nameToId.get(name.toLowerCase()))
              .filter((id): id is number => id !== undefined);
          }

          return {
            id: parseInt(pkg.id),
            attractions,
            add_ons: (ticketAddOnsByPackage[pkg.id]?.[ticketNumber] ?? []).map((addOn) => ({
              id: parseInt(addOn.id),
              quantity: addOn.quantity,
            })),
            discount_id: discountByPackage[pkg.id]?.id ?? 5,
          };
        });
      });

      const mobile = step1FormData.mobile.startsWith("0")
        ? "+63" + step1FormData.mobile.slice(1)
        : step1FormData.mobile;

      const payload = {
        last_name: step1FormData.lastName,
        first_name: step1FormData.firstName,
        email: step1FormData.email,
        mobile_no: mobile,
        age: parseInt(step1FormData.age),
        gender: step1FormData.gender.toUpperCase(),
        address: step1FormData.address,
        slot_date: step1FormData.date,
        packages: packagesPayload,
      };

      console.log("[Step3] Booking payload:", JSON.stringify(payload, null, 2));

      const response = await createBooking(payload);
      console.log("[Step3] Booking response:", response);

      if (response.payment_details?.payment_link) {
        console.log("[Step3] Opening payment link:", response.payment_details.payment_link);
        window.open(response.payment_details.payment_link, "_blank");
      }

      navigate("/check-status?booking=" + encodeURIComponent(response.booking_code));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("API error status:", error.response?.status);
        console.error("API error response:", error.response?.data);
      } else {
        console.error("Unexpected error:", error);
      }
      alert("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start">
      {/* Left: Form Area */}
      <div className="flex-1 min-w-0">
        <BookingStepHeader step={step} />
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full"
            >
              {step === 1 ? (
                <BookingStep1
                  onNext={handleNext}
                  formData={step1FormData}
                  onFormDataChange={setStep1FormData}
                />
              ) : step === 2 ? (
                <BookingStep2API
                  onNext={handleNext}
                  onBack={handleBack}
                  selectedPackages={selectedPackages}
                  onPackagesChange={setSelectedPackages}
                  onAddOnsChange={setAddOnsByPackage}
                  addOnsByPackage={addOnsByPackage}
                  ticketAddOnsByPackage={ticketAddOnsByPackage}
                  onTicketAddOnsChange={setTicketAddOnsByPackage}
                  ticketChoicesByPackage={ticketChoicesByPackage}
                  onTicketChoicesChange={setTicketChoicesByPackage}
                  onDiscountChange={(packageId, discount) =>
                    setDiscountByPackage((prev) => ({ ...prev, [packageId]: discount }))
                  }
                />
              ) : (
                <BookingStep3
                  onNext={handleProceedToPayment}
                  onBack={handleBack}
                  isSubmitting={isSubmitting}
                  selectedPackages={selectedPackages}
                  ticketAddOnsByPackage={ticketAddOnsByPackage}
                  ticketChoicesByPackage={ticketChoicesByPackage}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right: Booking Summary */}
      <div className="w-full lg:w-100 shrink-0">
        <BookingSummary
          selectedPackages={selectedPackages}
          addOnsByPackage={addOnsByPackage}
          discountByPackage={discountByPackage}
        />
      </div>
    </div>
  );
}
