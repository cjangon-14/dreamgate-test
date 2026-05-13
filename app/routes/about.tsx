import type { Route } from "./+types/about";
import AboutHeader from "~/components/pages/About/AboutHeader";
import AboutContent from "~/components/pages/About/AboutContent";
import AboutFeatures from "~/components/pages/About/AboutFeatures";

export function meta({}: Route.MetaArgs) {
  return [
    /* 
       Updated the tab title and metadata description from 'Themed Park' 
       to 'Realm' to keep your core brand architecture cohesive across every route.
    */
    { title: "About Us - Dream Gate Realm" },
    {
      name: "description",
      content:
        "Learn more about the creative vision, standalone narrative, and immersive mission behind the Dream Gate Realm.",
    },
  ];
}

export default function About() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-20">
      <AboutHeader />
      <AboutContent />
      <AboutFeatures />
    </div>
  );
}
