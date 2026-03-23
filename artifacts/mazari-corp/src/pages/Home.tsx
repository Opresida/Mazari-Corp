import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { TrustedBrands } from "@/components/sections/TrustedBrands";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { VapourStatement } from "@/components/sections/VapourStatement";
import { Consulting } from "@/components/sections/Consulting";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Header />
      <main>
        <Hero />
        <TrustedBrands />
        <About />
        <Services />
        <VapourStatement />
        <Consulting />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
