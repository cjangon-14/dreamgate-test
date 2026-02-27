import { coreValuesBg } from "~/assets";
import CoreValuesHeader from "./CoreValues/CoreValuesHeader";
import CoreValuesGrid from "./CoreValues/CoreValuesGrid";

const CoreValues = () => (
  <section className="relative overflow-hidden px-4 md:px-8 min-h-screen flex flex-col py-8">
    {/* Background */}
    <div
      className="absolute inset-0 z-0 pointer-events-none bg-cover bg-no-repeat w-full h-full"
      style={{ backgroundImage: `url(${coreValuesBg})` }}
    />
    <CoreValuesHeader />
    <CoreValuesGrid />
    {/* Gold bottom border */}
    <div className="absolute bottom-0 left-0 w-full h-2 bg-[linear-gradient(to_right,#c78814_0%,#ffd993_32%,#ffb01d_72%,#d08800_99%)] shadow-[0_-40px_90px_30px_rgba(0,0,0,0.4)] z-0" />
  </section>
);

export default CoreValues;
