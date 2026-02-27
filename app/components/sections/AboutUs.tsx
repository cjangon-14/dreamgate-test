import { mascotImage } from "~/assets";
import AboutUsTop from "./AboutUs/AboutUsTop";
import AboutUsBottom from "./AboutUs/AboutUsBottom";

const AboutUs = () => (
  <section className="relative min-h-screen flex flex-col">
    <AboutUsTop />

    {/* Mascot — desktop only, sits at the top/bottom divider */}
    <div className="absolute -right-1 -bottom-9.5 hidden lg:flex shrink-0 w-125 items-end justify-center z-20">
      <img src={mascotImage} alt="Blue Sky mascot" className="h-full object-contain" />
    </div>

    <AboutUsBottom />
  </section>
);

export default AboutUs;
