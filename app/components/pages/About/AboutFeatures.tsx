interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-lg bg-cloud-light">
      <h3 className="text-xl font-bold text-navy-dark mb-2">{title}</h3>
      <p className="text-navy-main">{description}</p>
    </div>
  );
}

export default function AboutFeatures() {
  const features = [
    {
      title: "Award-Winning",
      description: "Recognized internationally for excellence and innovation.",
    },
    {
      title: "Family-Friendly",
      description: "Designed for families of all ages and interests.",
    },
    {
      title: "Sustainable",
      description: "Committed to environmental responsibility and community impact.",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
}
