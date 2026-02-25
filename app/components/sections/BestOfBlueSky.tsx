import BobsBackground from "./BestOfBlueSky/BobsBackground";
import BobsHeader from "./BestOfBlueSky/BobsHeader";
import BobsGrid from "./BestOfBlueSky/BobsGrid";

const BestOfBlueSky = () => (
  <section className="bobs-bg relative overflow-hidden min-h-screen">
    <BobsBackground />

    <div className="container-max relative z-50">
      <BobsHeader />
      <BobsGrid />
    </div>
  </section>
);

export default BestOfBlueSky;
