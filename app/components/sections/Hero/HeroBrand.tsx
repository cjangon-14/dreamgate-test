import { blueSkyLogoCropped, textStar } from "../../../assets";

const HeroBrand = () => (
  <div className="relative mb-6 flex flex-col items-center leading-none select-none">
    <div className="logo-glow flex flex-col items-center">
      <div className=" z-10 relative">
        <img
          src={blueSkyLogoCropped}
          alt="BLUE SKY logo"
          className="w-56 sm:w-72 md:w-80 lg:w-96"
          draggable="false"
          decoding="async"
        />
      </div>

      {/* Sub-Header text section */}
      <div className="flex items-center justify-center gap-4 mt-2 sm:mt-4 z-10 w-full">
        {/* Changed text-navy-dark to text-white for visibility against the deep space sky */}
        <span className="text-base sm:text-lg md:text-xl text-end text-white font-black uppercase font-satoshi leading-none tracking-widest opacity-95 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          Themed
          <br />
          Park
        </span>
        <img
          src={textStar}
          alt=""
          aria-hidden="true"
          className="w-3 h-10 sm:h-12 md:h-14 z-20 opacity-80"
          draggable="false"
          decoding="async"
        />
        {/* Changed text-navy-dark to text-white for visibility against the deep space sky */}
        <span className="text-base sm:text-lg md:text-xl text-start text-white font-black uppercase font-satoshi leading-none tracking-widest opacity-95 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
          Action
          <br />
          Plaza
        </span>
      </div>
    </div>
  </div>
);

export default HeroBrand;
