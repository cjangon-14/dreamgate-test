import { useState, useEffect, useRef, useCallback } from "react";
import { funActivities } from "~/data/funActivities";
import ActivityCard from "./ActivityCard";

const total = funActivities.length;

function getVisible() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth < 640) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

function useVisibleCount() {
  const [visible, setVisible] = useState(getVisible);
  useEffect(() => {
    const handler = () => setVisible(getVisible());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return visible;
}

const FtlCarousel = () => {
  const visible = useVisibleCount();
  const [start, setStart] = useState(0);
  const [pending, setPending] = useState<number | null>(null);
  const [dir, setDir] = useState<"left" | "right">("left");
  const [sliding, setSliding] = useState(false);
  const blockRef = useRef(false);
  const startRef = useRef(start);
  startRef.current = start;

  // Reset animation when visible count changes (screen resize)
  useEffect(() => {
    setSliding(false);
    setPending(null);
    blockRef.current = false;
  }, [visible]);

  const go = useCallback((newStart: number, direction: "left" | "right") => {
    if (blockRef.current) return;
    blockRef.current = true;
    setPending(newStart);
    setDir(direction);
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

  const currentCards = Array.from({ length: visible }, (_, i) =>
    funActivities[(start + i) % total]
  );

  const isActive = pending !== null;

  const enteringCard = isActive
    ? dir === "left"
      ? funActivities[(start + visible) % total]
      : funActivities[(start - 1 + total) % total]
    : null;

  const stripCards = isActive
    ? dir === "left"
      ? [...currentCards, enteringCard!]
      : [enteringCard!, ...currentCards]
    : currentCards;

  // translate = 1 card width as % of the strip
  const translatePct = 100 / (visible + 1);
  const transform = isActive
    ? dir === "left"
      ? sliding ? `translateX(-${translatePct}%)` : "translateX(0%)"
      : sliding ? "translateX(0%)" : `translateX(-${translatePct}%)`
    : "translateX(0%)";

  return (
    <div className="max-w-3/4 mx-auto px-4 sm:px-6 lg:px-8 mt-10 mb-20">
      {/* Viewport — clips the animated strip */}
      <div className="overflow-hidden">
        <div
          style={{
            display: "flex",
            width: isActive
              ? `calc(${visible + 1} * 100% / ${visible})`
              : "100%",
            transform,
            transition: sliding ? "transform 0.45s ease" : "none",
          }}
          onTransitionEnd={isActive ? handleTransitionEnd : undefined}
        >
          {stripCards.map((activity, i) => (
            <div
              key={i}
              className="px-2"
              style={{
                width: isActive
                  ? `calc(100% / ${visible + 1})`
                  : `calc(100% / ${visible})`,
              }}
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
          className="w-10 h-10 rounded-full border-2 border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-2">
          {funActivities.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (i === startRef.current) return;
                go(i, i > startRef.current ? "left" : "right");
              }}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === start ? "bg-sky-main w-5" : "bg-white/30 w-2"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => go((startRef.current + 1) % total, "left")}
          aria-label="Next"
          className="w-10 h-10 rounded-full border-2 border-white/30 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FtlCarousel;
