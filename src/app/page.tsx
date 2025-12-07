import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Gallery } from "@/components/Gallery";
import { Bedrooms } from "@/components/Bedrooms";
import { Location } from "@/components/Location";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <About />
      <Gallery />
      <Bedrooms />
      <Location />
      <Contact />
      <Footer />
    </main>
  );
}

