import { missionIcon, visionIcon } from "~/assets";

const AboutUsBottom = () => (
  <div className="relative bg-navy-dark px-6 md:px-8 py-12 md:py-20 flex items-center shadow-[0_60px_90px_20px_rgba(0,0,0,0.4)] z-10">
    {/* Gold top border */}
    <div className="absolute top-0 left-0 w-full h-2 bg-[linear-gradient(to_right,#c78814_0%,#ffd993_32%,#ffb01d_72%,#d08800_99%)]" />

    <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
      {/* Mission */}
      <div className="flex items-start gap-4">
        <img src={missionIcon} alt="" className="shrink-0 mt-1" />
        <div>
          <h3 className="font-goteam text-accent-yellow text-xl md:text-2xl mb-3 uppercase">
            Our Mission
          </h3>
          <p className="font-satoshi text-white/80 text-base md:text-lg leading-relaxed">
            To inspire joy, togetherness, and exploration—bringing the
            boundless aspirations of BYB Metro to life, one thrilling ride,
            one smile, and one shared experience at a time.
          </p>
        </div>
      </div>

      {/* Vision */}
      <div className="flex items-start gap-4">
        <img src={visionIcon} alt="" className="shrink-0 mt-1" />
        <div>
          <h3 className="font-goteam text-accent-yellow text-xl md:text-2xl mb-3 uppercase">
            Our Vision
          </h3>
          <p className="font-satoshi text-white/80 text-base md:text-lg leading-relaxed">
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
);

export default AboutUsBottom;
