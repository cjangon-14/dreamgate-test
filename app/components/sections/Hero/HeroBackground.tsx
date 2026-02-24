import {
  bgHero,
  ferrisWheel,
  leftRollercoaster,
  swingRide,
  rightBuilding,
} from "../../../assets";

const HeroBackground = () => (
  <>
    {/* Desktop full background (lg and up) */}
    <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
      <img
        src={bgHero}
        alt=""
        className="w-full h-full object-cover object-bottom"
        fetchPriority="high"
        loading="eager"
        decoding="async"
      />
    </div>

    {/* Tablet & Mobile individual elements (below lg) */}
    <img
      src={ferrisWheel}
      alt="Ferris Wheel"
      className="lg:hidden absolute bottom-0 -left-25 z-10 h-96 md:h-96 w-auto pointer-events-none"
      loading="lazy"
      decoding="async"
    />
    <img
      src={leftRollercoaster}
      alt="Left Rollercoaster"
      className="lg:hidden absolute bottom-0 left-0 z-9 h-100 md:h-60 w-auto pointer-events-none opacity-80"
      loading="lazy"
      decoding="async"
    />
    <img
      src={swingRide}
      alt="Swing Ride"
      className="lg:hidden absolute bottom-0 -right-25 z-10 h-96 md:h-96 w-auto pointer-events-none"
      loading="lazy"
      decoding="async"
    />
    <img
      src={rightBuilding}
      alt="Right Building"
      className="lg:hidden absolute bottom-15 -right-35 z-9 h-150 md:h-60 w-auto pointer-events-none opacity-80"
      loading="lazy"
      decoding="async"
    />
  </>
);

export default HeroBackground;
