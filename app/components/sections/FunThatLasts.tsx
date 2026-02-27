import FtlBackground from "./FunThatLasts/FtlBackground";
import FtlHeader from "./FunThatLasts/FtlHeader";
import FtlCarousel from "./FunThatLasts/FtlCarousel";

const FunThatLasts = () => (
  <section className="relative overflow-hidden pt-20 md:pt-28 pb-32 md:pb-64 z-20 bg-navy-dark min-h-screen">
    <FtlBackground />
    <FtlHeader />
    <FtlCarousel />
  </section>
);

export default FunThatLasts;
