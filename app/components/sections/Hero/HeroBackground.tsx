import {
  bgHeroFull,
  mobileBg,
  cloudHero,
} from "../../../assets";

const HeroBackground = () => (
  <>
    <img
      src={bgHeroFull}
      alt=""
      aria-hidden="true"
      className="hidden lg:block absolute inset-0 z-0 w-full h-full object-cover object-bottom pointer-events-none"
      loading="eager"
      fetchPriority="high"
      decoding="async"
    />

    <img
      src={mobileBg}
      alt=""
      aria-hidden="true"
      className="lg:hidden absolute inset-0 z-0 w-full h-full object-cover object-center pointer-events-none"
      loading="eager"
      fetchPriority="high"
      decoding="async"
    />

    <img
      src={cloudHero}
      alt=""
      aria-hidden="true"
      className="lg:hidden absolute -bottom-3 left-0 w-full z-10 pointer-events-none"
      loading="eager"
      fetchPriority="high"
      decoding="async"
    />
  </>
);

export default HeroBackground;
