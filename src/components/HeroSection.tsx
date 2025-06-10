
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToCollection = () => {
    const element = document.getElementById('collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2048&q=80"
          alt="Mystical mountain landscape with premium stones"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center text-white max-w-4xl mx-auto px-4 transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/93aa4666-afd3-44ff-b358-bb05a1ee65d3.png" 
            alt="Luminor Stones Logo" 
            className="h-20 w-auto"
          />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 leading-tight">
          Premium Stone Slabs
          <br />
          <span className="text-stone-200">& Natural Gemstones</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-stone-200 font-light max-w-2xl mx-auto">
          Discover our extensive collection of agate, quartz, mother of pearl, 
          and premium gemstone slabs for luxury applications
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={scrollToCollection}
            size="lg"
            className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            View Our Collection
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg font-medium transition-all duration-300"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            About Luminor Stones
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
