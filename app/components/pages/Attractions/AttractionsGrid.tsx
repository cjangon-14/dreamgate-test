import AttractionCard from "./AttractionCard";

export default function AttractionsGrid() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <AttractionCard key={i} id={i} />
      ))}
    </div>
  );
}
