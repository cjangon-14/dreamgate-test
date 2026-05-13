import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingStep1 from "../Step1/BookingStep1";
import BookingStep2Local from "./BookingStep2Local";
import BookingStep3 from "../Step3/BookingStep3";
import BookingStep4 from "../BookingStep4";
import BookingSummary from "./BookingSummary";
import BookingStepHeader from "../BookingStepHeader";
import {
  createBooking,
  completeBookingPayment,
  type BookingResponse,
} from "~/api/bookings";

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
    email: "",
    mobile: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [createdBooking, setCreatedBooking] = useState<BookingResponse | null>(null);
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

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

  const createBookingPayload = () => {
    return {
      first_name: step1FormData.firstName,
      middle_name: step1FormData.middleName || undefined,
      last_name: step1FormData.lastName,
      suffix: step1FormData.suffix || undefined,
      email: step1FormData.email,
      mobile_no: step1FormData.mobile,
      age: Number(step1FormData.age),
      gender: step1FormData.gender,
      address: step1FormData.address || "",
      slot_date: selectedDate ? selectedDate.toISOString() : "",
      packages: selectedPackages.map((pkg) => ({
        id: pkg.id,
        attractions: ticketChoicesByPackage[pkg.id]
          ? Object.values(ticketChoicesByPackage[pkg.id]).flat()
          : [],
        add_ons: (addOnsByPackage[pkg.id] ?? [])
          .filter((addOn) => addOn.quantity > 0)
          .map((addOn) => ({
            id: addOn.id,
            quantity: addOn.quantity,
            price: addOn.price,
          })),
        discount_id: null,
        quantity: pkg.quantity,
      })),
    };
  };

  const handleCreateBooking = async () => {
    if (!selectedDate) {
      setBookingError("Please choose a booking date before proceeding.");
      return;
    }

    if (selectedPackages.length === 0) {
      setBookingError("Please select at least one package before proceeding.");
      return;
    }

    setBookingError(null);
    setIsCreatingBooking(true);

    try {
      const booking = await createBooking(createBookingPayload());
      setCreatedBooking(booking);
      setDirection(1);
      setStep(4);
    } catch (error) {
      setBookingError(
        error instanceof Error
          ? error.message
          : "Unable to create booking at this time.",
      );
    } finally {
      setIsCreatingBooking(false);
    }
  };

  const handleNext = () => {
    if (step === 2 && selectedPackages.length === 0) return;
    if (step === 3) {
      handleCreateBooking();
      return;
    }
    setDirection(1);
    setStep(step + 1);
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(step - 1);
  };

  const handleMockPayment = async () => {
    if (!createdBooking) return;
    setIsCreatingBooking(true);
    setBookingError(null);

    try {
      const updated = await completeBookingPayment(createdBooking.booking_code);
      setCreatedBooking(updated);
    } catch (error) {
      setBookingError(
        error instanceof Error
          ? error.message
          : "Unable to complete payment.",
      );
    } finally {
      setIsCreatingBooking(false);
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
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                />
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
                  selectedDate={selectedDate}
                  selectedPackages={selectedPackages}
                  addOnsByPackage={addOnsByPackage}
                  ticketAddOnsByPackage={ticketAddOnsByPackage}
                  ticketChoicesByPackage={ticketChoicesByPackage}
                  isSubmitting={isCreatingBooking}
                  errorMessage={bookingError}
                />
              ) : (
                <BookingStep4
                  onBack={handleBack}
                  bookingResponse={createdBooking}
                  onMockPay={handleMockPayment}
                  isSubmitting={isCreatingBooking}
                  errorMessage={bookingError}
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
