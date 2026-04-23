import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { CaseStudies } from "../components/sections/CaseStudies";

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
      <Navbar />
      <main className="pt-24">
        <CaseStudies />
      </main>
      <Footer />
    </div>
  );
}
