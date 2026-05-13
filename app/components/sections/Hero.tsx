// Hero.tsx
import HeroBackground from "./Hero/HeroBackground";
import HeroBrand from "./Hero/HeroBrand";
import HeroCTAButtons from "./Hero/HeroCTAButtons";
import HeroBottomClouds from "./Hero/HeroBottomClouds";

const Hero = () => (
  <div className="relative">
    {/* hero-bg inherits your custom multi-point white-to-nebula gradient */}
    <div className="hero-bg min-h-screen relative overflow-hidden">
      <HeroBackground />

      {/* Clear structural layout container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-[42vh] lg:min-h-screen lg:pb-32 lg:justify-center lg:pt-0">
        <HeroBrand />

        {/* Ethereal description copy */}
        <p className="max-w-xs sm:max-w-sm text-white/90 text-base z-10 font-satoshi font-medium mb-8 drop-shadow-sm">
          Grand days full of adventure, smiles, and everlasting stories for your
          soul.
        </p>

        <HeroCTAButtons />
      </div>
    </div>

    <HeroBottomClouds />
  </div>
);

export default Hero;
