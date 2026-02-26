import { coreValuesBg } from "~/assets";
import { coreValues } from "~/data/coreValues";

// ── gradient used for card borders ──────────────────────────────────────────
const BORDER_GRADIENT =
  "linear-gradient(to right, #c78814 0%, #ffd993 32%, #ffb01d 72%, #d08800 99%)";

interface CardProps {
  title: string;
  description: string;
}

const ValueCard = ({ title, description }: CardProps) => (
  // Outer wrapper creates the gradient border via background + padding trick
  <div className="gradient-border backdrop-blur-[4px] rounded-[3rem] w-75 h-60 flex-none ">
    <div className="rounded-[3rem] bg-transparent -sm h-full px-5 py-6 flex flex-col gap-2 items-center text-center justify-center">
      <h3 className="font-goteam  text-accent-yellow text-lg uppercase tracking-wide ">
        {title}
      </h3>
      <p className="font-satoshi font-medium text-white/75 text-md leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

const CoreValues = () => {
  const row1 = coreValues.slice(0, 4); // Brilliance · Liveliness · Unforgettable · Evolving
  const row2 = coreValues.slice(4);    // Safety · Kindness · Youthful

  return (
    <section className="relative overflow-hidde px-8 h-screen flex flex-col py-8">
      {/* Core Values - BG */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-cover bg-no-repeat w-full h-full"
        style={{ backgroundImage: `url(${coreValuesBg})` }}
      />

      {/* ── Section title ─────────────────────────────────────────────── */}
      <div className="relative z-10 text-center mt-35 mb-4">
        <h2 className="font-bitcrusher text-7xl uppercase">
          <span className="text-accent-yellow">Our Core </span>
          <span className="text-[#6ed8f5]">Values</span>
        </h2>
      </div>

      {/* ── Cards ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 container-core flex flex-col gap-4 flex-1 ">
        {/* Row 1 — 4 cards */}
        <div className="flex gap-4 h-60 justify-center">
          {row1.map((v) => (
            <ValueCard key={v.id} title={v.title} description={v.description} />
          ))}
        </div>

        {/* Row 2 — 3 cards centered */}
        <div className="flex gap-4 justify-center h-60">
          {row2.map((v) => (
            <ValueCard key={v.id} title={v.title} description={v.description} />
          ))}
        </div>
      </div>
      {/* Gold bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-[linear-gradient(to_right,#c78814_0%,#ffd993_32%,#ffb01d_72%,#d08800_99%)] shadow-[0_-40px_90px_30px_rgba(0,0,0,0.4)] z-0" />
    </section>
  );
};

export default CoreValues;