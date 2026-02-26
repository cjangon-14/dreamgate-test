import { mascotWbs } from "~/assets";

const WhyBlueSky = () => {
  return (
    <section className="relative bg-white overflow-hidden ">
      <div className="container-wbs flex items-center gap-12 py-16 px-8 ">
        {/* Mascot */}
        <div className="shrink-0 w-72 ">
          <img
            src={mascotWbs}
            alt="Blue Sky mascot"
            className=" absolute bottom-2 left-[5%] w-[29%] object-contain"
          />
        </div>

        {/* Text content */}
        <div className="flex-1">
          <h2 className="font-bitcrusher text-6xl uppercase mb-6">
            <span className="text-accent-gold">Why </span>
            <span className="text-navy-dark">Blue Sky?</span>
          </h2>

          <div className="flex flex-col gap-4 font-satoshi font-medium text-navy-dark text-base leading-relaxed">
            <p>
              Blue Sky isn't just a theme park; it's an experience that
              represents the future of Bayambang and Northern Luzon. With AILC's
              expertise and the integrated infrastructure of BYB Metro, Blue Sky
              will be a beacon of entertainment, tourism, and community growth.
              Our park is designed to celebrate the spirit of ambition, the
              thrill of discovery, and the joy of togetherness.
            </p>
            <p>
              Set against the breathtaking backdrop of Pangasinan, Blue Sky
              represents the region's upward trajectory—where excitement,
              growth, and future possibilities come together to create lasting
              memories for all.
            </p>
            <p>
              Set against the breathtaking backdrop of Pangasinan, Blue Sky
              represents the region's upward trajectory—where excitement,
              growth, and future possibilities come together to create lasting
              memories for all.
            </p>
          </div>
        </div>
      </div>

      {/* Gold bottom border */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-[linear-gradient(to_right,#c78814_0%,#ffd993_32%,#ffb01d_72%,#d08800_99%)]" />
    </section>
  );
};

export default WhyBlueSky;
