import { aboutUsBg, mascotImage, missionIcon, visionIcon } from "~/assets";

const AboutUs = () => {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* ── TOP HALF: light sky background ── */}
      <div className="relative flex-[3] px-8 py-20 flex items-center bg-linear-to-b from-[#CAF7FF] to-[#6ed8f5] overflow-hidden">
        <div className="absolute -top-50 left-0 w-full h-48 pointer-events-none object-cover ">
          <img src={aboutUsBg} alt="" className="" />
        </div>

        {/* Content row */}
        <div className="container-max2 relative z-10 flex items-center justify-between gap-12 w-full mt-50">
          {/* Text */}
          <div className="max-w-[68%]">
            <h2 className="section-title mb-6">
              About <span className="text-[#047C88]">Us!</span>
            </h2>
            <p className="font-satoshi font-medium text-navy-dark text-base md:text-lg leading-relaxed">
              A project of the Agriculture Infrastructure &amp; Leasing
              Corporation (AILC), Blue Sky Theme Park is the centerpiece of the
              BYB Metro township in Bayambang, Pangasinan. Designed to be the
              ultimate destination for families, thrill-seekers, and tourists,
              our park offers a unique blend of adventure, fun, and community
              spirit. Blue Sky Theme Park stands as a symbol of transformation.
              With its world-class attractions, immersive experiences, and
              vibrant atmosphere, it is poised to become Northern Luzon's
              premier leisure destination. As a key component of BYB Metro's
              ambition to become the "BGC of the North," Blue Sky promises to
              offer an unmatched experience in entertainment, relaxation, and
              enjoyment.
            </p>
          </div>
        </div>
      </div>
      {/* Mascot */}
      <div className="absolute -right-1 -bottom-[38px] hidden lg:flex flex-shrink-0 w-125 items-end justify-center z-20">
        <img
          src={mascotImage}
          alt="Blue Sky mascot"
          className="h-full object-contain"
        />
      </div>
      {/* ── BOTTOM HALF: dark navy ── */}
      <div className="relative bg-navy-dark px-8 py-2 flex items-center shadow-[0_60px_90px_20px_rgba(0,0,0,0.4)] z-10">
        {/* Gold top border */}
        <div className="absolute top-0 left-0 w-full h-2 bg-[linear-gradient(to_right,#c78814_0%,#ffd993_32%,#ffb01d_72%,#d08800_99%)]" />

        <div className="max-w-3/4 mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-20 mt-20 mb-20">
          {/* Mission */}
          <div className="flex items-center gap-5">
            <div className="flex">
              {/* Replace with: <img src={missionIcon} alt="" className="w-9 h-9" /> */}
              <img src={missionIcon} alt="" className="mr-4" />
            </div>
            <div className="w-100">
              <h3 className="font-goteam text-accent-yellow text-2xl mb-3 uppercase">
                Our Mission
              </h3>
              <p className="font-satoshi text-white/80 text-lg leading-relaxed">
                To inspire joy, togetherness, and exploration—bringing the
                boundless aspirations of BYB Metro to life, one thrilling ride,
                one smile, and one shared experience at a time.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="flex items-center gap-5">
            {/* Icon — PLACEHOLDER */}
            <div className="flex">
              {/* Replace with: <img src={visionIcon} alt="" className="w-9 h-9" /> */}
              <img src={visionIcon} alt="" className="mr-4" />
            </div>
            <div className="w-100">
              <h3 className="font-goteam text-accent-yellow text-2xl mb-3 uppercase">
                Our Vision
              </h3>
              <p className="font-satoshi text-white/80 text-lg leading-relaxed">
                To become the premier leisure destination of Northern Luzon; a
                place where innovation, entertainment, and growth meet to create
                unforgettable experiences for all.
              </p>
            </div>
          </div>
        </div>

        {/* Gold bottom border */}
        <div
          className="absolute bottom-0 left-0 w-full h-2"
          style={{
            background:
              "linear-gradient(to right, #c78814 0%, #ffd993 32%, #ffb01d 72%, #d08800 99%)",
          }}
        />
      </div>
    </section>
  );
};

export default AboutUs;
