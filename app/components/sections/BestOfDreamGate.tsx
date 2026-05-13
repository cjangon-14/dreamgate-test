import BobsBackground from "./BestOfDreamGate/BobsBackground";
import BobsHeader from "./BestOfDreamGate/BobsHeader";
import BobsGridLocal from "./BestOfDreamGate/BobsGridLocal";
import BobsGridAPI from "./BestOfDreamGate/BobsGridAPI";
const BestOfDreamGate = () => (
  <section className="bobs-bg relative overflow-hidden min-h-screen">
    <BobsBackground />

    <div className="container-max relative z-50">
      <BobsHeader />
      {/* <BobsGridAPI /> */}
      <BobsGridLocal />
    </div>
  </section>
);

export default BestOfDreamGate;
