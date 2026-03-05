import BobsBackground from "./BestOfBlueSky/BobsBackground";
import BobsHeader from "./BestOfBlueSky/BobsHeader";
import BobsGridLocal from "./BestOfBlueSky/BobsGridLocal";
import BobsGridAPI from "./BestOfBlueSky/BobsGridAPI";
const BestOfBlueSky = () => (
  <section className="bobs-bg relative overflow-hidden min-h-screen">
    <BobsBackground />

    <div className="container-max relative z-50">
      <BobsHeader />
      {/* <BobsGridAPI /> */}
      <BobsGridLocal />
    </div>
  </section>
);

export default BestOfBlueSky;
