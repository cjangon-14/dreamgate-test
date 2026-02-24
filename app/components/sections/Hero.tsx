import HeroBackground from "./Hero/HeroBackground";
import HeroBrand from "./Hero/HeroBrand";
import HeroCTAButtons from "./Hero/HeroCTAButtons";
import HeroBottomClouds from "./Hero/HeroBottomClouds";

const Hero = () => (
  <div className="relative">
    <div className="hero-bg min-h-screen relative overflow-hidden">
      <HeroBackground />

      {/* Content flows from top, rides sit behind/below */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-[42vh] lg:min-h-screen lg:pb-32 lg:justify-center lg:flex lg:flex-col lg:items-center lg:pt-0">
        <HeroBrand />

        <p className="max-w-xs sm:max-w-sm text-navy-dark/80 text-base z-10 font-satoshi font-medium mb-8">
          Packed day full of excitement, laughter, and unforgettable memories in
          your life
        </p>

        <HeroCTAButtons />
      </div>
    </div>

    <HeroBottomClouds />
  </div>
);


export default Hero;
