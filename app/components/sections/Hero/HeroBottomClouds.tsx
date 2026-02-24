import { useEffect, useRef } from "react";
import { cloudHero } from "../../../assets";

const HeroBottomClouds = () => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute bottom-0 left-0 w-full z-10 pointer-events-none">
      <img
        ref={imgRef}
        src={cloudHero}
        alt=""
        aria-hidden="true"
        className="absolute w-full left-0 bottom-10 cloud-animated"
        fetchPriority="high"
        loading="eager"
        decoding="async"
      />
      <div className="bg-white w-full h-[50px] absolute left-0 bottom-0 "/>
    </div>
  );
};

export default HeroBottomClouds;
