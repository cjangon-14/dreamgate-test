import { blueSkyLogoCropped, cloud1, cloud2, textStar } from "../../../assets";

const HeroBrand = () => (
  <div className="relative mb-6 flex flex-col items-center leading-none select-none">
    <div className="logo-glow flex flex-col items-center">
      <img
        src={cloud2}
        alt="Cloud 2"
        className="absolute w-38 h-auto z-20 top-75 -left-13"
        decoding="async"
      />
      <img
        src={cloud1}
        alt="Cloud 1"
        className="absolute w-44 h-auto z-20 top-30 -right-25"
        decoding="async"
      />

      <div className="logo-container z-0 relative">
        <img
          src={blueSkyLogoCropped}
          alt="BLUE SKY logo"
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
