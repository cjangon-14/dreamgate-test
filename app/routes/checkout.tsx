import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { completeBookingPayment, getBookingByCode, type BookingResponse } from "~/api/bookings";
import { sectionDivider, cloudHero } from "~/assets";

export function meta() {
  return [
    { title: "Payment Checkout - Dream Gate Realm" },
    {
      name: "description",
      content: "Complete your payment for Dream Gate Realm booking",
    },
  ];
}

type PaymentMethod = "card" | "otc" | "emoney" | null;
type CheckoutStep = "method" | "form" | "processing" | "success";

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const bookingCode = searchParams.get("booking") ?? "";

  const [booking, setBooking] = React.useState<BookingResponse | null>(null);
  const [loadingBooking, setLoadingBooking] = React.useState(true);

  const [step, setStep] = useState<CheckoutStep>("method");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchBooking = async () => {
      if (!bookingCode) {
        setLoadingBooking(false);
        return;
      }
      try {
        const response = await getBookingByCode(bookingCode);
        setBooking(response);
      } catch (err) {
        setError("Could not load booking details");
      } finally {
        setLoadingBooking(false);
      }
    };
    fetchBooking();
  }, [bookingCode]);

  const handleMethodSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
    if (method === "card") {
      setStep("form");
    } else {
      setStep("processing");
      processPayment();
    }
  };

  const handleCardInputChange = (field: string, value: string) => {
    if (field === "cardNumber") {
      value = value.replace(/\D/g, "").slice(0, 16);
      value = value.replace(/(\d{4})/g, "$1 ").trim();
    }
    if (field === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 3);
    }
    if (field === "expiryMonth") {
      value = value.replace(/\D/g, "").slice(0, 2);
    }
    if (field === "expiryYear") {
      value = value.replace(/\D/g, "").slice(0, 4);
    }
    setCardData((prev) => ({ ...prev, [field]: value }));
  };

  const validateCard = (): boolean => {
    if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, "").length !== 16) {
      setError("Please enter a valid 16-digit card number");
      return false;
    }
    if (!cardData.cardHolder.trim()) {
      setError("Please enter cardholder name");
      return false;
    }
    if (!cardData.expiryMonth || !cardData.expiryYear) {
      setError("Please enter expiry date");
      return false;
    }
    if (!cardData.cvv || cardData.cvv.length !== 3) {
      setError("Please enter valid CVV");
      return false;
    }
    return true;
  };

  const processPayment = async () => {
    if (step === "form" && !validateCard()) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (!booking) {
        throw new Error("Booking not found");
      }

      // Complete the payment
      const updated = await completeBookingPayment(booking.booking_code);
      setBooking(updated);
      setStep("success");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Payment processing failed. Please try again."
      );
      setStep("method");
      setPaymentMethod(null);
    } finally {
      setProcessing(false);
    }
  };

  const handleRetry = () => {
    setStep("method");
    setPaymentMethod(null);
    setCardData({
      cardNumber: "",
      cardHolder: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    });
  };

  if (loadingBooking) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 w-full"
          style={{
            height: "150%",
            background: "radial-gradient(circle at 50% 20%, #2a2a8c 0%, #1e1e60 100%)",
          }}
        />
        <div className="relative z-10 text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="font-satoshi">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 w-full"
          style={{
            height: "150%",
            background: "radial-gradient(circle at 50% 20%, #2a2a8c 0%, #1e1e60 100%)",
          }}
        />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8 text-center max-w-md">
            <p className="text-white font-satoshi mb-6">No booking found. Redirecting...</p>
            <Link
              to="/"
              className="inline-block bg-sky-main text-white px-6 py-2 rounded-lg font-satoshi font-bold hover:bg-sky-dark transition"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 w-full"
        style={{
          height: "150%",
          background:
            "radial-gradient(circle at 50% 20%, #2a2a8c 0%, #1e1e60 100%)",
        }}
      />

      {/* Decorative elements */}
      <img
        src={cloudHero}
        alt=""
        className="absolute -bottom-20 w-full opacity-20 pointer-events-none select-none"
      />
      <img
        src={sectionDivider}
        alt=""
        className="absolute -top-30 w-full opacity-60 pointer-events-none select-none"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center py-16 px-4 min-h-screen">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-8 left-8 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8">
          {/* Left: Checkout Form */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {step === "method" && (
                <motion.div
                  key="method"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <h2 className="text-3xl font-satoshi font-bold text-white mb-6">
                    Select Payment Method
                  </h2>

                  {error && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Payment Methods */}
                  <div className="space-y-3">
                    <button
                      onClick={() => handleMethodSelect("card")}
                      className="w-full bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-sky-main/60 rounded-lg p-5 text-left transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-satoshi font-bold text-white mb-1 group-hover:text-sky-main transition">
                            💳 Credit / Debit Card
                          </p>
                          <p className="text-white/60 text-sm">
                            Visa, Mastercard, JCB, or any major card
                          </p>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-white/40 group-hover:border-sky-main transition" />
                      </div>
                    </button>

                    <button
                      onClick={() => handleMethodSelect("otc")}
                      className="w-full bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-sky-main/60 rounded-lg p-5 text-left transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-satoshi font-bold text-white mb-1 group-hover:text-sky-main transition">
                            🏪 Over the Counter
                          </p>
                          <p className="text-white/60 text-sm">
                            Pay at authorized payment partner locations
                          </p>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-white/40 group-hover:border-sky-main transition" />
                      </div>
                    </button>

                    <button
                      onClick={() => handleMethodSelect("emoney")}
                      className="w-full bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-sky-main/60 rounded-lg p-5 text-left transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-satoshi font-bold text-white mb-1 group-hover:text-sky-main transition">
                            📱 eMoney / Digital Wallet
                          </p>
                          <p className="text-white/60 text-sm">
                            GCash, Maya, PayMaya, or similar services
                          </p>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-white/40 group-hover:border-sky-main transition" />
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "form" && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-5"
                >
                  <h2 className="text-3xl font-satoshi font-bold text-white mb-6">
                    Card Details
                  </h2>

                  {error && (
                    <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200 text-sm">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-white/80 font-satoshi text-sm font-semibold mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.cardNumber}
                      onChange={(e) =>
                        handleCardInputChange("cardNumber", e.target.value)
                      }
                      className="w-full bg-white/10 border-2 border-white/30 focus:border-sky-main rounded-lg px-4 py-3 text-white placeholder-white/40 font-mono focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 font-satoshi text-sm font-semibold mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={cardData.cardHolder}
                      onChange={(e) =>
                        handleCardInputChange("cardHolder", e.target.value)
                      }
                      className="w-full bg-white/10 border-2 border-white/30 focus:border-sky-main rounded-lg px-4 py-3 text-white placeholder-white/40 font-satoshi focus:outline-none transition"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-white/80 font-satoshi text-sm font-semibold mb-2">
                        Month
                      </label>
                      <input
                        type="text"
                        placeholder="MM"
                        maxLength={2}
                        value={cardData.expiryMonth}
                        onChange={(e) =>
                          handleCardInputChange("expiryMonth", e.target.value)
                        }
                        className="w-full bg-white/10 border-2 border-white/30 focus:border-sky-main rounded-lg px-4 py-3 text-white placeholder-white/40 font-mono focus:outline-none transition text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 font-satoshi text-sm font-semibold mb-2">
                        Year
                      </label>
                      <input
                        type="text"
                        placeholder="YYYY"
                        maxLength={4}
                        value={cardData.expiryYear}
                        onChange={(e) =>
                          handleCardInputChange("expiryYear", e.target.value)
                        }
                        className="w-full bg-white/10 border-2 border-white/30 focus:border-sky-main rounded-lg px-4 py-3 text-white placeholder-white/40 font-mono focus:outline-none transition text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 font-satoshi text-sm font-semibold mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength={3}
                        value={cardData.cvv}
                        onChange={(e) =>
                          handleCardInputChange("cvv", e.target.value)
                        }
                        className="w-full bg-white/10 border-2 border-white/30 focus:border-sky-main rounded-lg px-4 py-3 text-white placeholder-white/40 font-mono focus:outline-none transition text-center"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleRetry}
                      className="flex-1 bg-white/10 border-2 border-white/30 hover:bg-white/20 text-white font-satoshi font-bold py-3 rounded-lg transition"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => processPayment()}
                      disabled={processing}
                      className="flex-1 bg-gradient-to-r from-sky-main to-sky-dark text-white font-satoshi font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-sky-main/50 disabled:opacity-50 transition"
                    >
                      {processing ? "Processing..." : "Pay Now"}
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/30 border-t-sky-main mb-6"></div>
                  <p className="text-white font-satoshi text-lg">
                    Processing your payment...
                  </p>
                  <p className="text-white/60 font-satoshi text-sm mt-2">
                    Please do not close this page
                  </p>
                </motion.div>
              )}

              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="inline-block mb-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </motion.div>
                    <h2 className="text-3xl font-satoshi font-bold text-white mb-2">
                      Payment Successful!
                    </h2>
                    <p className="text-white/60 font-satoshi">
                      Your booking is confirmed and payment received
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-sky-main/20 to-sky-dark/20 border border-sky-main/50 rounded-lg p-6 space-y-3">
                    <div className="flex justify-between items-center text-white/80">
                      <span className="font-satoshi text-sm">
                        Booking Reference:
                      </span>
                      <span className="font-mono font-bold text-sky-main">
                        {booking.booking_code}
                      </span>
                    </div>
                    <div className="border-t border-white/20" />
                    <div className="flex justify-between items-center text-white/80">
                      <span className="font-satoshi text-sm">Amount Paid:</span>
                      <span className="font-bold text-white">
                        ₱{Number(booking.payment_details.amount_due).toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-white/20" />
                    <div className="flex justify-between items-center text-white/80">
                      <span className="font-satoshi text-sm">Status:</span>
                      <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-bold">
                        PAID
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-4">
                    <Link
                      to={`/check-status?booking=${booking.booking_code}`}
                      className="w-full bg-gradient-to-r from-sky-main to-sky-dark text-white font-satoshi font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-sky-main/50 transition text-center"
                    >
                      View Booking Details
                    </Link>
                    <Link
                      to="/"
                      className="w-full bg-white/10 border-2 border-white/30 hover:bg-white/20 text-white font-satoshi font-bold py-3 rounded-lg transition text-center"
                    >
                      Return Home
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-80 shrink-0"
          >
            <div className="sticky top-20 bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 space-y-6">
              <h3 className="text-white font-satoshi font-bold text-lg">
                Order Summary
              </h3>

              <div className="bg-white/5 rounded-lg p-4 space-y-3">
                <div className="flex justify-between text-white/80">
                  <span className="font-satoshi text-sm">Booking Number</span>
                  <span className="font-mono text-xs font-bold text-secondary">
                    {booking.booking_code}
                  </span>
                </div>
                <div className="border-t border-white/20" />
                <div className="flex justify-between text-white/80">
                  <span className="font-satoshi text-sm">Guest Name</span>
                  <span className="font-satoshi font-semibold text-white text-sm">
                    {booking.name}
                  </span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span className="font-satoshi text-sm">Email</span>
                  <span className="font-satoshi text-white/60 text-xs">
                    {booking.email}
                  </span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span className="font-satoshi text-sm">Visit Date</span>
                  <span className="font-satoshi font-semibold text-white text-sm">
                    {new Date(booking.slot_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="border-t border-white/20" />

              <div className="space-y-2">
                <div className="flex justify-between text-white/60">
                  <span className="font-satoshi">Subtotal</span>
                  <span className="font-goteam">
                    ₱{booking.base_amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span className="font-satoshi">Taxes & Fees</span>
                  <span className="font-goteam">₱0.00</span>
                </div>
              </div>

              <div className="border-t border-white/20 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-satoshi font-bold text-white">
                    Total Due
                  </span>
                  <span className="font-goteam text-2xl text-secondary font-bold">
                    ₱{Number(booking.payment_details.amount_due).toFixed(2)}
                  </span>
                </div>
              </div>

              {step === "success" && (
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-center">
                  <p className="text-green-200 font-satoshi text-sm font-semibold">
                    ✓ Payment Confirmed
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
