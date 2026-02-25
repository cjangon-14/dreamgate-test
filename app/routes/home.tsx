import Hero from "~/components/sections/Hero";
import BestOfBlueSky from "~/components/sections/BestOfBlueSky";
import type { Route } from "./+types/home";
import Header from "~/components/common/Header";
import FunThatLasts from "~/components/sections/FunThatLasts";
import SectionDivider from "~/components/sections/decorations/SectionDivider";
import AboutUs from "~/components/sections/AboutUs";
import CloudDivider from "~/components/sections/decorations/CloudDivider";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blue Sky Themed Park" },
    { name: "description", content: "Blue Sky Themed Park & Events Center" },
  ];
}

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <BestOfBlueSky />
      <SectionDivider />
      <FunThatLasts />
      <CloudDivider />
      <AboutUs />
    </>
  );
}
