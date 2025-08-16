import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();

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

  const handleViewProducts = () => {
    navigate('/products');
  };

  // Hero images from uploaded files
  const heroImages = [
    '/lovable-uploads/833717c0-b52b-4413-a4dd-c1ab4d689f6c.png',
    '/lovable-uploads/81f2ca7c-ab34-4388-b2c9-b59b17259785.png',
    '/lovable-uploads/0e80e01a-3191-482e-a54b-65804ad017c4.png',
    '/lovable-uploads/04afc326-40b6-4230-9b3a-2168c03e41a4.png',
    '/lovable-uploads/94584920-1d68-43d5-aa6d-bbac05c47551.png',
    '/lovable-uploads/6d21d075-5ae2-47f8-9367-2bf584de7186.png',
    '/lovable-uploads/04548a1d-9344-4409-a597-c4d758acf7bf.png'
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        <Carousel
          className="w-full h-full"
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent className="ml-0">
            {heroImages.map((image, index) => (
              <CarouselItem key={index} className="pl-0">
                <div className="relative w-full h-screen">
                  <img
                    src={image}
                    alt={`Premium stone texture ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <div className="flex justify-center mb-6 lg:mb-8">
          <img 
            src="/lovable-uploads/93aa4666-afd3-44ff-b358-bb05a1ee65d3.png" 
            alt="Luminor Stones Logo" 
            className="h-16 sm:h-20 lg:h-24 w-auto filter brightness-0 invert"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold mb-4 lg:mb-6 leading-tight text-white [text-shadow:_2px_2px_4px_rgb(0_0_0_/_0.8)]">
          Premium Stone Slabs
          <br />
          <span className="text-stone-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">& Natural Gemstones</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 lg:mb-8 text-stone-100 font-light max-w-3xl mx-auto leading-relaxed [text-shadow:_1px_1px_2px_rgb(0_0_0_/_0.8)]">
          Discover our extensive collection of agate, quartz, mother of pearl, 
          and premium gemstone slabs for luxury applications
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md sm:max-w-none mx-auto">
          <Button
            onClick={handleViewProducts}
            size="lg"
            className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View Our Collection
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900 px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg font-medium transition-all duration-300 shadow-lg"
            onClick={() => scrollToSection('about')}
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