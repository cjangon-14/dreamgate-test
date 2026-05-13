import type { Route } from "./+types/home";
import Hero from "~/components/sections/Hero";
import BestOfDreamGate from "~/components/sections/BestOfDreamGate";
import FunThatLasts from "~/components/sections/FunThatLasts";
import SectionDivider from "~/components/sections/decorations/SectionDivider";
import AboutUs from "~/components/sections/AboutUs";
import CloudDivider from "~/components/sections/decorations/CloudDivider";
import CoreValues from "~/components/sections/CoreValues";
import WhyDreamGate from "~/components/sections/WhyDreamGate";
import JustHaveFun from "~/components/sections/JustHaveFun";
import ContactUs from "~/components/sections/ContactUs";

export function meta({}: Route.MetaArgs) {
  return [
    /* 
       Updated the tab title and metadata description from 'Themed Park' 
       to 'Realm' to complete the unified brand architecture across all pages.
    */
    { title: "Dream Gate Realm" },
    {
      name: "description",
      content:
        "Dream Gate Realm - An Immersive Creative Space Portfolio Project.",
    },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      <BestOfDreamGate />
      <SectionDivider />
      <FunThatLasts />
      <CloudDivider />
      <AboutUs />
      <CoreValues />
      <WhyDreamGate />
      <JustHaveFun />
      <ContactUs />
    </>
  );
}
