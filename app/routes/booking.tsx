import type { Route } from "./+types/booking";
import BookingHeader from "~/components/pages/Booking/BookingHeader";
import BookingGrid from "~/components/pages/Booking/Step2/BookingGrid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Book Your Visit - Blue Sky Themed Park" },
    { name: "description", content: "Book your unforgettable visit to Blue Sky Themed Park" },
  ];
}

export default function Booking() {
  return (
    <div className=" min-h-screen py-12 md:py-16">
      <BookingHeader />
      <div className="container mx-auto px-12 md:px-38 py-6 md:py-8">
        <BookingGrid />
      </div>
    </div>
  );
}
