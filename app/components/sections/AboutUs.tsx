import { aboutUsBg } from "~/assets";

const AboutUs = () => {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col">
      {/* ── TOP HALF: light sky background ── */}
      <div className="relative flex-1 px-8 py-20 flex items-center bg-linear-to-b from-[#CAF7FF] to-[#6ed8f5]">
        <div className="absolute -top-50 left-0 w-full h-48 pointer-events-none object-cover ">
          <img src={aboutUsBg} alt="" className="" />
        </div>

        {/* Content row */}
        <div className="container-max relative z-10 flex items-center justify-between gap-12 w-full">
          {/* Text */}
          <div className="max-w-2xl">
            <h2 className="section-title mb-6">
              About <span className="text-navy-dark">Us!</span>
            </h2>
            <p className="font-satoshi text-navy-dark/80 text-base md:text-lg leading-relaxed">
              {/* PLACEHOLDER — replace with real copy */}A project of the
              Agriculture Infrastructure &amp; Leasing Corporation (AILC), Blue
              Sky Theme Park is the centerpiece of the BYB Metro township in
              Bayambang, Pangasinan. Designed to be the ultimate destination for
              families, thrill-seekers, and tourists, our park offers a unique
              blend of adventure, fun, and community spirit. Blue Sky Theme Park
              stands as a symbol of transformation. With its world-class
              attractions, immersive experiences, and vibrant atmosphere, it is
              poised to become Northern Luzon's premier leisure destination. As
              a key component of BYB Metro's ambition to become the "BGC of the
              North," Blue Sky promises to offer an unmatched experience in
              entertainment, relaxation, and enjoyment.
            </p>
          </div>

          {/* Mascot — PLACEHOLDER */}
          <div className="hidden lg:flex flex-shrink-0 w-72 h-80 items-end justify-center">
            {/* Replace with: <img src={mascotPlaceholder} alt="Blue Sky mascot" className="h-full object-contain" /> */}
            <div className="w-full h-full rounded-2xl bg-sky-light/50 border-2 border-dashed border-sky-main/40 flex items-center justify-center">
              <span className="font-satoshi text-sky-main/60 text-sm text-center px-4">
                Mascot PNG
                <br />
                placeholder
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM HALF: dark navy ── */}
      <div className="relative bg-navy-dark px-8 py-14">
        {/* Gold top border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-accent-gold" />

        <div className="container-max grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Mission */}
          <div className="flex items-start gap-5">
            {/* Icon — PLACEHOLDER */}
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-accent-gold/20 border-2 border-dashed border-accent-gold/50 flex items-center justify-center">
              {/* Replace with: <img src={missionIcon} alt="" className="w-9 h-9" /> */}
              <span className="text-accent-gold text-xs text-center leading-tight">
                icon
              </span>
            </div>
            <div>
              <h3 className="font-bitcrusher text-accent-gold text-2xl mb-3 uppercase">
                Our Mission
              </h3>
              <p className="font-satoshi text-white/80 text-sm leading-relaxed">
                {/* PLACEHOLDER */}
                To inspire joy, togetherness, and exploration—bringing the
                boundless aspirations of BYB Metro to life, one thrilling ride,
                one smile, and one shared experience at a time.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="flex items-start gap-5">
            {/* Icon — PLACEHOLDER */}
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-accent-gold/20 border-2 border-dashed border-accent-gold/50 flex items-center justify-center">
              {/* Replace with: <img src={visionIcon} alt="" className="w-9 h-9" /> */}
              <span className="text-accent-gold text-xs text-center leading-tight">
                icon
              </span>
            </div>
            <div>
              <h3 className="font-bitcrusher text-accent-gold text-2xl mb-3 uppercase">
                Our Vision
              </h3>
              <p className="font-satoshi text-white/80 text-sm leading-relaxed">
                {/* PLACEHOLDER */}
                To become the premier leisure destination of Northern Luzon; a
                place where innovation, entertainment, and growth meet to create
                unforgettable experiences for all.
              </p>
            </div>
          </div>
        </div>

        {/* Gold bottom border */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-accent-gold" />
      </div>
    </section>
  );
};

export default AboutUs;
