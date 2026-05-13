import AttractionCardAPI from "./AttractionCardAPI";
import AttractionCardLocal from "./AttractionCardLocal";
import { attractions } from "~/data/attractions";

const BobsGridLocal = () => (
  <div className="grid-cards">
    {attractions.map((attraction) => (
      <AttractionCardLocal key={attraction.id} attraction={attraction} />
    ))}
  </div>
);

export default BobsGridLocal;
