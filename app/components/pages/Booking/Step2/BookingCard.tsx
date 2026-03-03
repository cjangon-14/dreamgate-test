interface BookingCardProps {
  title: string;
  description: string;
}

export default function BookingCard({ title, description }: BookingCardProps) {
  return (
    <div className="p-6 rounded-lg bg-cloud-light hover:shadow-card transition-shadow">
      <h2 className="text-2xl font-bold text-navy-dark mb-3">{title}</h2>
      <p className="text-navy-main mb-4">{description}</p>
      <button className="text-accent-orange font-semibold hover:underline">
        Get Started →
      </button>
    </div>
  );
}
