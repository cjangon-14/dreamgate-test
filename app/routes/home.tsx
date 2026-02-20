import Hero from "~/components/sections/Hero";
import type { Route } from "./+types/home";
import Header from "~/components/common/Header";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return(
    <>
    <Header />
    <Hero />
    </>
  );
}
