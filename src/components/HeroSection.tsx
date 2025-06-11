import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to image if video fails to load
            const videoElement = e.target as HTMLVideoElement;
            const fallbackImg = document.createElement('img');
            fallbackImg.src = "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=2048&q=80";
            fallbackImg.alt = "Light stone texture background";
            fallbackImg.className = "w-full h-full object-cover opacity-90";
            videoElement.parentNode?.replaceChild(fallbackImg, videoElement);
          }}
        >
          <source src="/lovable-uploads/5607650-uhd_3840_2160_24fps (1).mp4" type="video/mp4" />
          {/* Fallback image for browsers that don't support video */}
          <img
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=2048&q=80"
            alt="Light stone texture background"
            className="w-full h-full object-cover opacity-90"
          />
        </video>
        <div className="absolute inset-0 bg-white/40 dark:bg-black/60"></div>
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="flex justify-center mb-6 lg:mb-8">
          {theme === 'dark' ? (
            <img 
              src="/lovable-uploads/93aa4666-afd3-44ff-b358-bb05a1ee65d3.png" 
              alt="Luminor Stones Logo" 
              className="h-16 sm:h-20 lg:h-24 w-auto filter invert"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          ) : (
            <img 
              src="/lovable-uploads/93aa4666-afd3-44ff-b358-bb05a1ee65d3.png" 
              alt="Luminor Stones Logo" 
              className="h-16 sm:h-20 lg:h-24 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          )}
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold mb-4 lg:mb-6 leading-tight text-gray-900 dark:text-white [text-shadow:_2px_2px_4px_rgb(255_255_255_/_0.8)] dark:[text-shadow:_2px_2px_4px_rgb(0_0_0_/_0.8)]">
          Premium Stone Slabs
          <br />
          <span className="text-gray-700 dark:text-stone-200 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">& Natural Gemstones</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 lg:mb-8 text-gray-800 dark:text-stone-200 font-light max-w-3xl mx-auto leading-relaxed [text-shadow:_1px_1px_2px_rgb(255_255_255_/_0.9)] dark:[text-shadow:_1px_1px_2px_rgb(0_0_0_/_0.9)]">
          Discover our extensive collection of agate, quartz, mother of pearl, 
          and premium gemstone slabs for luxury applications
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
          <Button
            onClick={() => scrollToSection('collection')}
            size="lg"
            className="w-full sm:w-auto bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View Our Collection
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-medium transition-all duration-300 shadow-lg"
            onClick={() => scrollToSection('about')}
          >
            About Luminor Stones
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 lg:w-6 h-8 lg:h-10 border-2 border-gray-900 dark:border-white rounded-full flex justify-center">
          <div className="w-1 h-2 lg:h-3 bg-gray-900 dark:bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
