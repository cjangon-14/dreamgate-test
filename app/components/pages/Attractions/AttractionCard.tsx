interface AttractionCardProps {
  id: number;
}

export default function AttractionCard({ id }: AttractionCardProps) {
  return (
    <div className="rounded-lg overflow-hidden bg-cloud-light shadow-card hover:shadow-card-hover transition-shadow">
      <div className="h-48 bg-gradient-to-br from-sky-light to-sky-main" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-navy-dark mb-2">
          Attraction {id}
        </h3>
        <p className="text-navy-main mb-4">
          Experience the thrill and wonder of this amazing attraction.
        </p>
        <button className="text-accent-orange font-semibold hover:underline">
          Learn More →
        </button>
      </div>
    </div>
  );
}
