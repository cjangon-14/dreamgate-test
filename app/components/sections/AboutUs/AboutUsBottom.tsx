import { missionIcon, visionIcon } from "~/assets";

const AboutUsBottom = () => (
  /* 
     - bg-navy-dark: Automatically inherits your deep galaxy/space theme.
     - Shadow structure remains for high-end elevation and depth.
  */
  <div className="relative bg-navy-dark px-6 md:px-8 py-12 md:py-20 flex items-center shadow-[0_60px_90px_20px_rgba(0,0,0,0.4)] z-10">
    {/* Starlight Gold top border — Updated to use your exact brand gold tones */}
    <div className="absolute top-0 left-0 w-full h-2 bg-[linear-gradient(to_right,#B8860B_0%,#FFD700_32%,#D4AF37_72%,#B8860B_99%)]" />

    <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
      {/* Mission */}
      <div className="flex items-start gap-4">
        <img src={missionIcon} alt="" className="shrink-0 mt-1" />
        <div>
          {/* text-accent-yellow: Maps directly to your new brand gold */}
          <h3 className="font-goteam text-accent-yellow text-xl md:text-2xl mb-3 uppercase tracking-wider">
            Our Mission
          </h3>
          <p className="font-satoshi text-white/80 text-base md:text-lg leading-relaxed">
            To inspire wonder, togetherness, and exploration—bringing the
            creative horizons of the Dream Gate realm to life, one immersive
            experience, one smile, and one shared memory at a time.
          </p>
        </div>
      </div>

      {/* Vision */}
      <div className="flex items-start gap-4">
        <img src={visionIcon} alt="" className="shrink-0 mt-1" />
        <div>
          {/* text-accent-yellow: Maps directly to your new brand gold */}
          <h3 className="font-goteam text-accent-yellow text-xl md:text-2xl mb-3 uppercase tracking-wider">
            Our Vision
          </h3>
          <p className="font-satoshi text-white/80 text-base md:text-lg leading-relaxed">
            To become a premier standalone leisure and design destination; a
            place where cosmic innovation, storytelling, and digital
            entertainment meet to create unforgettable experiences for all
            dreamers.
          </p>
        </div>
      </div>
    </div>

    {/* Starlight Gold bottom border */}
    <div
      className="absolute bottom-0 left-0 w-full h-2"
      style={{
        background:
          "linear-gradient(to right, #B8860B 0%, #FFD700 32%, #D4AF37 72%, #B8860B 99%)",
      }}
    />
  </div>
);

export default AboutUsBottom;
