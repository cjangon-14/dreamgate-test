import AttractionCardAPI from "./AttractionCardAPI";
import { attractions } from "~/data/attractions";

const BobsGridLocal = () => (
  <div className="grid-cards">
    {attractions.map((attraction) => (
      <AttractionCardAPI key={attraction.id} attraction={attraction} />
    ))}
  </div>
);

export default BobsGridLocal;
