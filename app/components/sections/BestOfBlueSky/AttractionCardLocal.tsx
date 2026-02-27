import type { Attraction } from "~/types";

const categoryColors: Record<Attraction["category"], string> = {
  ride: "bg-sky-main text-white",
  show: "bg-accent-orange text-white",
  experience: "bg-navy-main text-white",
};

const categoryLabel: Record<Attraction["category"], string> = {
  ride: "Ride",
  show: "Show",
  experience: "Experience",
};

const AttractionCardLocal = ({ attraction }: { attraction: Attraction }) => (
  <div className="card-base flex flex-col overflow-hidden p-0! group ">
    {/* Image */}
    <div className="relative w-full h-48 overflow-hidden rounded-t-[20px] shrink-0 isolate">
      <img
        src={attraction.image_path}
        alt={attraction.label}
        className="w-full h-full object-cover"
      />
      {attraction.gradient && (
        <div
          className="absolute inset-0"
          style={{ background: attraction.gradient, opacity: 0.75 }}
        />
      )}
      <span
        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
          attraction.badgeColor ?? categoryColors[attraction.category]
        }`}
      >
        {attraction.name ?? categoryLabel[attraction.category]}
      </span>
    </div>

    {/* Content */}
    <div className="flex flex-col flex-1 px-5 pt-5 pb-6">
      <h3 className="font-satoshi font-bold text-navy-dark text-lg leading-snug mb-1">
        {attraction.name}
      </h3>
      <p className="font-satoshi text-regular text-sm leading-relaxed mb-3">
        {attraction.description}
      </p>

      <span className="price-tag mb-4">PHP {attraction.base_amount.toFixed(2)}</span>

      {attraction.inclusions && attraction.inclusions.length > 0 && (
        <div className="mb-4">
          <p className="font-satoshi font-bold text-navy-dark text-sm mb-2">
            Inclusions
          </p>
          <ul className="space-y-2">
            {attraction.inclusions.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-sm text-navy-dark"
              >
                <svg
                  className="w-5 h-5 text-green-500 shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          {attraction.choices && attraction.choices.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {attraction.choices.map((choice) => (
                <span
                  key={choice}
                  className="px-2.5 py-1 rounded-md border-0 text-xs font-semibold uppercase tracking-wide"
                  style={{
                    color: attraction.color,
                    backgroundColor: attraction.color
                      ? `${attraction.color}14`
                      : undefined,
                  }}
                >
                  {choice}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-auto border-t border-gray-100">
        <a
          href="#book"
          className="w-full block text-center px-5 py-3 rounded-xl border-2 border-navy-dark/20 text-regular text-sm font-bold uppercase tracking-widest hover:bg-navy-dark hover:text-white transition-colors duration-200"
        >
          Book Now
        </a>
      </div>
    </div>
  </div>
);

export default AttractionCardLocal;
