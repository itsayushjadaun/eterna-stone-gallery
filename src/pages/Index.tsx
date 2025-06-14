
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { StoneCollection } from "@/components/StoneCollection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { StoneModal } from "@/components/StoneModal";

const Index = () => {
  const [selectedStone, setSelectedStone] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isScrolled={isScrolled} onCategorySelect={handleCategorySelect} />
      <HeroSection />
      <AboutSection />
      <StoneCollection 
        onStoneSelect={setSelectedStone} 
        initialCategory={selectedCategory}
        onFilterChange={setSelectedCategory}
      />
      <WhyChooseUs />
      <Testimonials />
      <ContactSection />
      <Footer />
      
      {selectedStone && (
        <StoneModal 
          stone={selectedStone} 
          onClose={() => setSelectedStone(null)} 
        />
      )}
    </div>
  );
};

export default Index;
