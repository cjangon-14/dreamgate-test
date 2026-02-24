import BobsBackground from "./BestOfBlueSky/BobsBackground";
import BobsHeader from "./BestOfBlueSky/BobsHeader";
import BobsGrid from "./BestOfBlueSky/BobsGrid";

const BestOfBlueSky = () => (
  <section className="bobs-bg relative overflow-hidden">
    <BobsBackground />

    <div className="container-max relative z-20">
      <BobsHeader />
      <BobsGrid />
    </div>
  </section>
);

export default BestOfBlueSky;
