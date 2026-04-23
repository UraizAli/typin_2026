import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import AboutUs from "./pages/AboutUs";
import CaseStudies from "./pages/CaseStudies";
import Blog from "./pages/Blog";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import ROICalculator from "./pages/ROICalculator";
import ServiceSelector from "./pages/ServiceSelector";
import Newsletter from "./pages/Newsletter";
import AutomationAudit from "./pages/AutomationAudit";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/roi-calculator" element={<ROICalculator />} />
        <Route path="/service-selector" element={<ServiceSelector />} />
        <Route path="/newsletter" element={<Newsletter />} />
        <Route path="/automation-audit" element={<AutomationAudit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
