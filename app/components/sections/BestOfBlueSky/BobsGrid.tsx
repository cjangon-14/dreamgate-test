import { attractions } from "~/data/attractions";
import AttractionCard from "./AttractionCard";

const BobsGrid = () => (
  <div className="grid-cards">
    {attractions.map((attraction) => (
      <AttractionCard key={attraction.id} attraction={attraction} />
    ))}
  </div>
);

export default BobsGrid;
