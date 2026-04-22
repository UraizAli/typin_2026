import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { Services } from "./components/sections/Services";
import { About } from "./components/sections/About";
import { LogoMarquee } from "./components/sections/LogoMarquee";
import { Testimonials } from "./components/sections/Testimonials";
import { CaseStudies } from "./components/sections/CaseStudies";
import { HowWeWork } from "./components/sections/HowWeWork";
import { Approach } from "./components/sections/Approach";
import { TechStack } from "./components/sections/TechStack";
import { Delivery } from "./components/sections/Delivery";
import { Blog } from "./components/sections/Blog";
import { CTA } from "./components/sections/CTA";

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
      <Navbar />
      <main>
        <Hero />
        <LogoMarquee />
        <Services />
        <About />
        <CaseStudies />
        <HowWeWork />
        <Approach />
        <Testimonials />
        <Delivery />
        <TechStack />
        <Blog />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
