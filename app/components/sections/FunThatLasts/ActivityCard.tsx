import { cardImagePlaceholder } from "~/assets";
import type { FunActivity } from "~/types";

const ActivityCard = ({ activity }: { activity: FunActivity }) => (
  <div className="relative rounded-2xl overflow-hidden h-75 sm:h-90 md:h-107.5 cursor-pointer">
    <img
      src={cardImagePlaceholder}
      alt={activity.title}
      className="w-full h-full object-cover"
    />
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(to top, #04afbd 0%, rgba(4,175,189,0.3) 45%, transparent 70%)",
      }}
    />
    <div className="absolute bottom-0 left-0 p-4 sm:p-5 w-full">
      <h3 className="font-satoshi font-bold text-white text-lg sm:text-xl leading-snug mb-1">
        {activity.title}
      </h3>
      <p className="font-satoshi text-white/80 text-sm leading-relaxed mb-3 line-clamp-2">
        {activity.description}
      </p>
      <a
        href="#"
        className="inline-flex items-center gap-1 text-white text-sm font-semibold"
      >
        View Details
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </a>
    </div>
  </div>
);

export default ActivityCard;
