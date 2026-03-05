import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingStep1 from "../Step1/BookingStep1";
import BookingStep2Local from "./BookingStep2Local";
import BookingStep3 from "../Step3/BookingStep3";
import BookingStep4 from "../BookingStep4";
import BookingSummary from "./BookingSummary";
import BookingStepHeader from "../BookingStepHeader";

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

export default function BookingGrid() {
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
  const [step1FormData, setStep1FormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    address: "",
    age: "",
    gender: "",
  });
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");


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
    if (step === 2 && selectedPackages.length === 0) return;
    setDirection(1);
    setStep(step + 1);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(step - 1);
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
              <BookingStep1 onNext={handleNext} formData={step1FormData} onFormDataChange={setStep1FormData} />
            ) : step === 2 ? (
              <BookingStep2Local
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
              />
            ) : step === 3 ? (
              <BookingStep3
                onNext={handleNext}
                onBack={handleBack}
                checkInDate={checkInDate}
                onCheckInDateChange={setCheckInDate}
                selectedPackages={selectedPackages}
                addOnsByPackage={addOnsByPackage}
                ticketAddOnsByPackage={ticketAddOnsByPackage}
                ticketChoicesByPackage={ticketChoicesByPackage}
              />
            ) : (
              <BookingStep4
                onBack={handleBack}
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
        />
      </div>
    </div>
  );
}
