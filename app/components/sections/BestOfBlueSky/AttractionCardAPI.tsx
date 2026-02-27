import type { Attraction } from "~/types";
import { cardImagePlaceholder } from "~/assets";

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

const AttractionCardAPI = ({ attraction }: { attraction: Attraction }) => (
  <div className="card-base flex flex-col overflow-hidden p-0! group ">
    {/* Image */}
    <div className="relative w-full h-60 overflow-hidden rounded-t-[20px] shrink-0 isolate">
      <img
        src={attraction.image_path || cardImagePlaceholder}
        alt={attraction.label}
        className="w-full h-full object-cover"
      />
      {attraction.gradient && (
        <div
          className="absolute inset-0"
          style={{ background: attraction.gradient, opacity: 0.8 }}
        />
      )}
      <span
        className={`absolute top-0 -left-1 px-10 py-3 rounded-br-4xl text-md font-bold uppercase tracking-wide ${
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

      <span className="price-tag mb-4">
        PHP {attraction.base_amount.toFixed(2)}
      </span>

      {/* Show API attractions OR local inclusions as fallback */}
      {(attraction.attractions && attraction.attractions.length > 0) || (attraction.inclusions && attraction.inclusions.length > 0) ? (
        <div className="mb-4">
          <p className="font-satoshi font-bold text-navy-dark text-sm mb-2">
            Inclusions
          </p>

          {attraction.selectable_attractions && attraction.selectable_attractions > 0 ? (
            <>
              <li className="flex gap-2 text-sm">
                <svg className="w-5 h-5 text-green-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="font-satoshi text-sm text-navy-dark mb-2">
                  Choose {attraction.selectable_attractions} from:
                </p>
              </li>
              <div className="flex flex-wrap gap-2">
                {attraction.attractions?.map((att: any) => (
                  <span
                    key={att.id}
                    className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wide"
                    style={{
                      backgroundColor: attraction.color ? `${attraction.color}20` : "#088fe320",
                      color: attraction.color ? attraction.color : "#088fe3",
                    }}
                  >
                    {att.name}
                  </span>
                ))}
              </div>
            </>
          ) : (
            // Use API attractions if available, else fall back to local inclusions
            <ul className="space-y-2">
              {(attraction.attractions && attraction.attractions.length > 0
                ? attraction.attractions.map((att: any) => att.name)
                : attraction.inclusions ?? []
              ).map((name: string) => (
                <li key={name} className="flex items-center gap-2 text-sm text-navy-dark">
                  <svg className="w-5 h-5 text-green-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}


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

export default AttractionCardAPI;
