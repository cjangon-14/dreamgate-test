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
    { title: "Blue Sky Themed Park" },
    { name: "description", content: "Blue Sky Themed Park & Adventure Hub" },
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
