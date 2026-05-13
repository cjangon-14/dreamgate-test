import type { Route } from "./+types/attractions";
import AttractionsHeader from "~/components/pages/Attractions/AttractionsHeader";
import AttractionsGrid from "~/components/pages/Attractions/AttractionsGrid";

export function meta({}: Route.MetaArgs) {
  return [
    /* 
       Updated the tab title and metadata description to use "Realm" 
       instead of "Themed Park" to keep your project SEO-consistent.
    */
    { title: "Attractions - Dream Gate Realm" },
    {
      name: "description",
      content:
        "Explore all the amazing and immersive attractions waiting for you inside the Dream Gate Realm.",
    },
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
