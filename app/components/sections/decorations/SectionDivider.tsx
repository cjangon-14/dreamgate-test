import { sectionDivider } from "~/assets";

const SectionDivider = () => {
  return (
    <div className="relative z-30 -mt-20 -mb-20 pointer-events-none select-none">
      {/* Left sun */}
      <img
        src={sectionDivider}
        alt=""
        className="absolute w-full left-0 top-0 -translate-y-1/2 w-24 opacity-100"
      />

      {/* Spacer so the div has height — adjust to match your graphic height */}
      <div className="w-full h-40" />
    </div>
  );
};

export default SectionDivider;
