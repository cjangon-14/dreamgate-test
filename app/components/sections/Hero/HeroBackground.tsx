import {
  bgHero,
  bgHeroFull,
  ferrisWheel,
  leftRollercoaster,
  swingRide,
  rightBuilding,
} from "../../../assets";

const HeroBackground = () => (
  <>
    {/* Desktop full background (lg and up) */}
    <div
      className="hidden lg:block absolute inset-0 z-0 pointer-events-none
             bg-cover
             bg-bottom
             bg-no-repeat
             bg-fixed
             w-full h-full"
      style={{ backgroundImage: `url(${bgHeroFull})` }}
    />

    {/* Tablet & Mobile sky background image (below lg) */}
    <div
      className="lg:hidden absolute inset-0 z-0 pointer-events-none
             bg-cover bg-top bg-no-repeat w-full h-full"
      style={{ backgroundImage: `url(${bgHero})` }}
    />

    {/* Tablet & Mobile individual elements (below lg) */}
    <img
      src={ferrisWheel}
      alt="Ferris Wheel"
      className="lg:hidden absolute bottom-1 -left-25 z-[5] h-[42vh] sm:h-[58vh] w-auto pointer-events-none"
      loading="lazy"
      decoding="async"
    />
    <img
      src={leftRollercoaster}
      alt="Left Rollercoaster"
      className="lg:hidden absolute bottom-0 left-6 z-[4] h-[38vh] sm:h-[42vh] w-auto pointer-events-none opacity-80"
      loading="lazy"
      decoding="async"
    />
    <img
      src={swingRide}
      alt="Swing Ride"
      className="lg:hidden absolute bottom-0 -right-25 sm:-right-10 z-[5] h-[42vh] sm:h-[58vh] w-auto pointer-events-none"
      loading="lazy"
      decoding="async"
    />
    <img
      src={rightBuilding}
      alt="Right Building"
      className="lg:hidden absolute bottom-0 -right-16 sm:-right-20 z-[4] h-[48vh] sm:h-[52vh] w-auto pointer-events-none opacity-60"
      loading="lazy"
      decoding="async"
    />
  </>
);

export default HeroBackground;
