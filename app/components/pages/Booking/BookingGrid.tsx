import BookingCard from "./BookingCard";

export default function BookingGrid() {
  const bookingOptions = [
    {
      title: "Tickets",
      description: "Book your park entry tickets here.",
    },
    {
      title: "Accommodations",
      description: "Reserve your stay at our resorts.",
    },
    {
      title: "Packages",
      description: "Explore our special vacation packages.",
    },
    {
      title: "Group Events",
      description: "Plan group outings and celebrations.",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {bookingOptions.map((option) => (
        <BookingCard
          key={option.title}
          title={option.title}
          description={option.description}
        />
      ))}
    </div>
  );
}
