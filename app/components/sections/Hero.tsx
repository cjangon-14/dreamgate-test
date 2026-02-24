import HeroBackground from "./Hero/HeroBackground";
import HeroBrand from "./Hero/HeroBrand";
import HeroCTAButtons from "./Hero/HeroCTAButtons";
import HeroBottomClouds from "./Hero/HeroBottomClouds";

const Hero = () => (
  <div className="relative">
    <div className="hero-bg min-h-screen relative overflow-hidden pb-32 sm:pb-40 md:pb-52">
      <HeroBackground />

      <div className="container mx-auto px-4 text-center flex flex-col items-center justify-center min-h-screen pt-5 -mt-20">
        <HeroBrand />

        <p className="max-w-md text-navy-dark/80 text-base mb-10 z-10 font-satoshi font-medium">
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
