import { coreValues } from "~/data/coreValues";
import ValueCard from "./ValueCard";

const CoreValuesGrid = () => {
  const row1 = coreValues.slice(0, 4); // Brilliance · Liveliness · Unforgettable · Evolving
  const row2 = coreValues.slice(4);    // Safety · Kindness · Youthful

  return (
    <div className="relative z-10 px-4 md:px-8 flex flex-col gap-4 pb-8">
      {/* Row 1 — 4 cards, wrap on small screens */}
      <div className="flex flex-wrap gap-3 lg:gap-4 justify-center">
        {row1.map((v) => (
          <ValueCard key={v.id} title={v.title} description={v.description} />
        ))}
      </div>

      {/* Row 2 — 3 cards centered */}
      <div className="flex flex-wrap gap-3 lg:gap-4 justify-center">
        {row2.map((v) => (
          <ValueCard key={v.id} title={v.title} description={v.description} />
        ))}
      </div>
    </div>
  );
};

export default CoreValuesGrid;
