import { mascotWbs } from "~/assets";
import WhyDreamGateContent from "./WhyDreamGate/WhyDreamGateContent";

const WhyDreamGate = () => (
  <section className="relative bg-white overflow-hidden">
    <div className="max-w-5xl mx-auto px-6 md:px-8 py-16">
      <div className="flex items-center gap-8 lg:gap-12">
        {/* Spacer for mascot on large screens */}
        <div className="hidden lg:block shrink-0 w-72" />
        <WhyDreamGateContent />
      </div>
    </div>

    {/* Mascot — desktop only */}
    <div className="hidden lg:block absolute -bottom-80  w-[40%] pointer-events-none">
      <img src={mascotWbs} alt="Blue Sky mascot" className="object-contain" />
    </div>

    {/* Gold bottom border */}
    <div className="absolute bottom-0 left-0 w-full h-2 bg-[linear-gradient(to_right,#c78814_0%,#ffd993_32%,#ffb01d_72%,#d08800_99%)]" />
  </section>
);

export default WhyDreamGate;

  