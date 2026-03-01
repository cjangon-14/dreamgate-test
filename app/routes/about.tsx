import type { Route } from "./+types/about";
import AboutHeader from "~/components/pages/About/AboutHeader";
import AboutContent from "~/components/pages/About/AboutContent";
import AboutFeatures from "~/components/pages/About/AboutFeatures";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About Us - Blue Sky Themed Park" },
    { name: "description", content: "Learn more about Blue Sky Themed Park and our mission" },
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
