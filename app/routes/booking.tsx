import type { Route } from "./+types/booking";
import BookingHeader from "~/components/pages/Booking/BookingHeader";
import BookingGrid from "~/components/pages/Booking/BookingGrid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Book Your Visit - Blue Sky Themed Park" },
    { name: "description", content: "Book your unforgettable visit to Blue Sky Themed Park" },
  ];
}

export default function Booking() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <BookingHeader />
      <BookingGrid />
    </div>
  );
}
