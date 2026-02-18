
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import StatsSection from "./components/StatsSection";
import DoctorsSection from "./components/DoctorsSection ";
import HowItWorksSection from "./components/HowItWorksSection";
import TestimonialsSection from "./components/TestimonialsSection ";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar></Navbar>
      <main >
        <HeroSection></HeroSection>
        <FeaturesSection></FeaturesSection>
        <StatsSection></StatsSection>
        <DoctorsSection></DoctorsSection>
        <HowItWorksSection></HowItWorksSection>
        <TestimonialsSection></TestimonialsSection>
       
      </main>
    </div>
  );
}
