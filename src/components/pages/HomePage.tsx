import { About } from "../sections/About";
import { Approach } from "../sections/Approach";
import { Blog } from "../sections/Blog";
import { CaseStudies } from "../sections/CaseStudies";
import { CTA } from "../sections/CTA";
import { Delivery } from "../sections/Delivery";
import { Hero } from "../sections/Hero";
import { HowWeWork } from "../sections/HowWeWork";
import { LogoMarquee } from "../sections/LogoMarquee";
import { Services } from "../sections/Services";
import { TechStack } from "../sections/TechStack";
import { Testimonials } from "../sections/Testimonials";

export function HomePage() {
  return (
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
  );
}
