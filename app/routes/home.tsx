import Hero from "~/components/sections/Hero";
import BestOfBlueSky from "~/components/sections/BestOfBlueSky";
import type { Route } from "./+types/home";
import Header from "~/components/common/Header";

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
    </>
  );
}
