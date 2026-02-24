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

      <div className="flex items-center justify-center gap-3 -mt-4 z-10">
        <span className="text-xl text-end text-navy-dark font-black uppercase font-satoshi leading-4.5 tracking-none">
          Themed
          <br />
          Park
        </span>
        <img
          src={textStar}
          alt=""
          aria-hidden="true"
          className="w-3 h-14 z-20"
          draggable="false"
          decoding="async"
        />
        <span className="text-xl text-start text-navy-dark font-black uppercase font-satoshi leading-4.5 tracking-none">
          Events
          <br />
          Center
        </span>
      </div>
    </div>
  </div>
);

export default HeroBrand;
