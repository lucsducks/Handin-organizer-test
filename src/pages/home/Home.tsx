import { Footer, Header } from "@/layout/general/sections";
import { Cta, Faq, Hero } from "./sections";
import HowStart from "./sections/HowStart";

export function Home() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Hero id="hero" />
        <HowStart id="how-start" />
        <Faq id="faq" />
        <Cta id="cta" />
      </main>
      <Footer />
    </>
  );
}
