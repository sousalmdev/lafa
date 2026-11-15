import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Endless from "@/components/Endless";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <div className="grain" aria-hidden />
      <Header />
      <main>
        <Hero />
        <Endless />
        <Manifesto />
        <Team />
        <Services />
      </main>
      <Contact />
    </>
  );
}

