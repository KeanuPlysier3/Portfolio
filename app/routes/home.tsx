import { Button, Heading, Text } from "@react-spectrum/s2";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };

import type { Route } from "./+types/home";
import Hero from "../components/hero";
import Ticker from "../components/ticker";
import About from "../components/about";
import Work from "../components/work";
import Design from "../components/design";
import MoreCode from "../components/moreCode";
import Contact from "../components/contact";
import Footer from "../components/footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Spectrum Portfolio" },
    { name: "description", content: "React Router + React Spectrum" },
  ];
}

export default function Home() {
  return (
    <>
      <header>
      <Hero />
      </header>

      <Ticker />

      <main>
        <About />
        <Work />
        <Design />
        <MoreCode />
        <Contact />
        {/* <Heading level={1}>Spectrum Portfolio</Heading>
        <Text>React Router + React Spectrum (S2) base template.</Text>
        <Button variant="accent">Get started</Button> */}
      </main>

      <Footer />
    </>
  );
}
