import type { Route } from "./+types/attractions";
import AttractionsHeader from "~/components/pages/Attractions/AttractionsHeader";
import AttractionsGrid from "~/components/pages/Attractions/AttractionsGrid";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Attractions - Blue Sky Themed Park" },
    { name: "description", content: "Explore all the amazing attractions at Blue Sky Themed Park" },
  ];
}

export default function Attractions() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <AttractionsHeader />
      <AttractionsGrid />
    </div>
  );
}
