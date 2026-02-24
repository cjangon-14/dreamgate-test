import { bobsBg } from "~/assets";

const BobsBackground = () => (
  <div className="hidden lg:block absolute inset-0 z-10 pointer-events-none">
    <img
      src={bobsBg}
      alt=""
      className="w-full h-full object-cover object-bottom"
      fetchPriority="high"
      loading="eager"
      decoding="async"
    />
  </div>
);

export default BobsBackground;
