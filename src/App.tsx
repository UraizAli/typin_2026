import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { HomePage } from "./components/pages/HomePage";

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFBFC] text-[#1F2937]">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}
