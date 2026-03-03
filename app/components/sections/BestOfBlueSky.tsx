import BobsBackground from "./BestOfBlueSky/BobsBackground";
import BobsHeader from "./BestOfBlueSky/BobsHeader";
import BobsGrid from "./BestOfBlueSky/BobsGrid";
import BobsGridLocal from "./BestOfBlueSky/BobsGridLocal";
const BestOfBlueSky = () => (
  <section className="bobs-bg relative overflow-hidden min-h-screen">
    <BobsBackground />

    <div className="container-max relative z-50">
      <BobsHeader />
      {/* <BobsGrid /> */}
      <BobsGridLocal />
    </div>
  </section>
);

export default BestOfBlueSky;
