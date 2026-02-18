
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar></Navbar>
      <main >
        <HeroSection></HeroSection>
        <FeaturesSection></FeaturesSection>
       
      </main>
    </div>
  );
}
