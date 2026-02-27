import {
  bgHeroFull,
  mobileBg,
  cloudHero,
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

    {/* Mobile & Tablet background (below lg) */}
    <div
      className="lg:hidden absolute inset-0 z-0 pointer-events-none
             bg-cover bg-center bg-no-repeat w-full h-full"
      style={{ backgroundImage: `url(${mobileBg})` }}
    />

    {/* Mobile & Tablet cloud overlay at bottom */}
    <img
      src={cloudHero}
      alt=""
      aria-hidden="true"
      className="lg:hidden absolute -bottom-3 left-0 w-full z-100  pointer-events-none"
      loading="eager"
      decoding="async"
    />
  </>
);

export default HeroBackground;
