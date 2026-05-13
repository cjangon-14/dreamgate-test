import type { Route } from "./+types/booking";
import BookingHeader from "~/components/pages/Booking/BookingHeader";
import BookingGrid from "~/components/pages/Booking/Step2/BookingGrid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Book Your Journey - Dream Gate" },
    {
      name: "description",
      content:
        "Secure your passage into the Dream Gate realm and experience an unforgettable cosmic journey.",
    },
  ];
}

export default function Booking() {
  return (
    <div className=" min-h-screen pb-12 md:pb-16">
      <div className="pt-16 bg-sky-main"></div>
      <BookingHeader />
      <div className="container mx-auto px-12 md:px-38 py-6 md:py-8">
        <BookingGrid />
      </div>
    </div>
  );
}
