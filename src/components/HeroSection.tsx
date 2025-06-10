
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2048&q=80"
          alt="Mystical mountain landscape with premium stones"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="flex justify-center mb-6 lg:mb-8">
          <img 
            src="/lovable-uploads/93aa4666-afd3-44ff-b358-bb05a1ee65d3.png" 
            alt="Luminor Stones Logo" 
            className="h-16 sm:h-20 lg:h-24 w-auto"
          />
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold mb-4 lg:mb-6 leading-tight">
          Premium Stone Slabs
          <br />
          <span className="text-stone-200 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">& Natural Gemstones</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 lg:mb-8 text-stone-200 font-light max-w-3xl mx-auto leading-relaxed">
          Discover our extensive collection of agate, quartz, mother of pearl, 
          and premium gemstone slabs for luxury applications
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
          <Button
            onClick={scrollToCollection}
            size="lg"
            className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-medium transition-all duration-300 transform hover:scale-105"
          >
            View Our Collection
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900 px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-medium transition-all duration-300"
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          >
            About Luminor Stones
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 lg:w-6 h-8 lg:h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 lg:h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
