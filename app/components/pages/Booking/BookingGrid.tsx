import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingStep1 from "./BookingStep1";
import BookingStep2 from "./BookingStep2";
import BookingSummary from "./BookingSummary";

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

export default function BookingGrid() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for back
  const [selectedPackages, setSelectedPackages] = useState<Package[]>([]);

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

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start">
      {/* Left: Form Area */}
      <div className="flex-1 min-w-0 relative overflow-hidden">
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
              <BookingStep1 onNext={handleNext} />
            ) : (
              <BookingStep2
                onNext={handleNext}
                onBack={handleBack}
                selectedPackages={selectedPackages}
                onPackagesChange={setSelectedPackages}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right: Booking Summary */}
      <div className="w-full lg:w-100 shrink-0">
        <BookingSummary selectedPackages={selectedPackages}/>
      </div>
    </div>
  );
}
