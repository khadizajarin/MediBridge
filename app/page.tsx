

import Footer from "./CommonComponents/Footer";
import Navbar from "./CommonComponents/Navbar";
import HeroSection from "./components/Home/HeroSection";


export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar></Navbar>
      <main >
        <HeroSection></HeroSection> 
      </main>
      <Footer></Footer>
    </div>
  );
}
