import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Tracks from "@/components/Tracks";
import Schedule from "@/components/Schedule";
import Prizes from "@/components/Prizes";
import Sponsors from "@/components/Sponsors";
import FAQ from "@/components/FAQ";
import Register from "@/components/Register";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ParticleBackground />
      <div className="relative z-10 noise-overlay">
        <Header />
        <main>
          <Hero />
          <About />
          <Tracks />
          <Schedule />
          <Prizes />
          <Sponsors />
          <FAQ />
          <Register />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
