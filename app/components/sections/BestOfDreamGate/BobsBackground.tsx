import { bogtBg } from "~/assets";

const BobsBackground = () => (
  <div className="hidden lg:block absolute inset-1 z-10 pointer-events-none">
    <img
      src={bogtBg}
      alt=""
      className="hidden lg:block absolute z-0 pointer-events-none
             bg-cover
             bg-bottom
             bg-no-repeat
             w-full h-full"
      fetchPriority="high"
      loading="eager"
      decoding="async"
    />
  </div>
);

export default BobsBackground;
