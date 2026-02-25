import { useState, useEffect, useRef, useCallback } from "react";
import { cardImagePlaceholder, ftlBg } from "~/assets";
import { funActivities } from "~/data/funActivities";

const VISIBLE = 3;
const total = funActivities.length;

const ActivityCard = ({ activity }: { activity: (typeof funActivities)[0] }) => (
  <div className="relative rounded-2xl overflow-hidden h-[380px] md:h-[430px] cursor-pointer">
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
    <div className="absolute bottom-0 left-0 p-5 w-full">
      <h3 className="font-satoshi font-bold text-white text-xl leading-snug mb-1">
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

const FunThatLasts = () => {
  const [start, setStart] = useState(0);
  const [pending, setPending] = useState<number | null>(null);
  const [dir, setDir] = useState<"left" | "right">("left");
  const [sliding, setSliding] = useState(false);
  const blockRef = useRef(false);
  const startRef = useRef(start);
  startRef.current = start;

  const go = useCallback((newStart: number, direction: "left" | "right") => {
    if (blockRef.current) return;
    blockRef.current = true;
    setPending(newStart);
    setDir(direction);
    // Two rAFs: first lets React render the 4-card strip,
    // second triggers the CSS transition on the next paint.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setSliding(true));
    });
  }, []);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (e.propertyName !== "transform") return;
    setStart(pending!);
    setPending(null);
    setSliding(false);
    blockRef.current = false;
  };

  useEffect(() => {
    const id = setInterval(() => {
      go((startRef.current + 1) % total, "left");
    }, 3000);
    return () => clearInterval(id);
  }, [go]);

  const currentCards = Array.from({ length: VISIBLE }, (_, i) =>
    funActivities[(start + i) % total]
  );

  const isActive = pending !== null;

  // The single card entering the viewport
  const enteringCard = isActive
    ? dir === "left"
      ? funActivities[(start + VISIBLE) % total]      // slides in from the right
      : funActivities[(start - 1 + total) % total]    // slides in from the left
    : null;

  // Strip is always 4 cards: entering card on the appropriate side
  // left:  [c0, c1, c2, entering]  → slide -25% (1 card left)
  // right: [entering, c0, c1, c2]  → start at -25%, slide to 0%
  const stripCards = isActive
    ? dir === "left"
      ? [...currentCards, enteringCard!]
      : [enteringCard!, ...currentCards]
    : currentCards;

  const transform = isActive
    ? dir === "left"
      ? sliding ? "translateX(-25%)" : "translateX(0%)"
      : sliding ? "translateX(0%)"   : "translateX(-25%)"
    : "translateX(0%)";

  return (
    <section className="relative overflow-hidden pt-20 md:pt-28 pb-64 z-20 bg-navy-dark min-h-screen">

      {/* Fun That Lasts - BG */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none bg-cover bg-bottom bg-no-repeat w-full h-full"
        style={{ backgroundImage: `url(${ftlBg})` }}
      />

      {/* Header */}
      <div className="container-max text-center mb-12">
        <h2 className="section-title">
          Fun That Lifts You{" "}
          <span className="text-sky-main">Above The Ordinary</span>
        </h2>
        <p className="font-satoshi text-lg text-white/70 max-w-2xl mx-auto">
          Take your excitement to new heights with heart-racing rides, spectacular
          views, and nonstop adventure from sunrise to sundown.
        </p>
      </div>

      {/* Carousel */}
      <div className="container-max">
        {/* Viewport — clips the 200%-wide strip */}
        <div className="overflow-hidden">
          <div
            style={{
              display: "flex",
              // 4 cards wide when animating, each card = 1/3 of viewport
              width: isActive ? "calc(400% / 3)" : "100%",
              transform,
              transition: sliding ? "transform 0.45s ease" : "none",
            }}
            onTransitionEnd={isActive ? handleTransitionEnd : undefined}
          >
            {stripCards.map((activity, i) => (
              <div
                key={i}
                className="px-2.5"
                // 25% of the 4-card strip = 1/3 of the viewport
                style={{ width: isActive ? "25%" : "calc(100% / 3)" }}
              >
                <ActivityCard activity={activity} />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => go((startRef.current - 1 + total) % total, "right")}
            aria-label="Previous"
            className="w-10 h-10 rounded-full border-2 border-white/30 text-white flex items-center justify-center hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2">
            {funActivities.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (i === startRef.current) return;
                  go(i, i > startRef.current ? "left" : "right");
                }}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full ${
                  i === start ? "bg-sky-main w-5" : "bg-white/30 w-2"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => go((startRef.current + 1) % total, "left")}
            aria-label="Next"
            className="w-10 h-10 rounded-full border-2 border-white/30 text-white flex items-center justify-center hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom clouds */}
      <div className="absolute -bottom-4 left-0 w-full pointer-events-none z-10" />
    </section>
  );
};

export default FunThatLasts;