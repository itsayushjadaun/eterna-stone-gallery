
import { useEffect, useRef, useState } from "react";

export const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-16 lg:py-24 xl:py-32 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center max-w-7xl mx-auto">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-playfair font-bold text-foreground mb-4 lg:mb-6 leading-tight">
              Luminor Stones,
              <br />
              <span className="text-muted-foreground text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">Excellence in Natural Stone</span>
            </h2>
            
            <p className="text-base lg:text-lg text-muted-foreground mb-4 lg:mb-6 leading-relaxed">
              Luminor Stones specializes in premium natural stone slabs, featuring an 
              extensive collection of agate, quartz, mother of pearl, and exotic gemstones. 
              Our carefully curated selection meets the highest standards for luxury 
              architectural and decorative applications.
            </p>
            
            <p className="text-base lg:text-lg text-muted-foreground mb-6 lg:mb-8 leading-relaxed">
              From vibrant agate varieties to sophisticated mother of pearl finishes, 
              each slab tells a unique story of natural formation. We serve architects, 
              designers, and homeowners seeking exceptional stone surfaces for their 
              most prestigious projects.
            </p>

            <div className="grid grid-cols-3 gap-4 lg:gap-6">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-playfair font-bold text-primary mb-1 lg:mb-2">100+</div>
                <div className="text-muted-foreground text-xs lg:text-sm">Stone Varieties</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-playfair font-bold text-primary mb-1 lg:mb-2">15+</div>
                <div className="text-muted-foreground text-xs lg:text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-playfair font-bold text-primary mb-1 lg:mb-2">500+</div>
                <div className="text-muted-foreground text-xs lg:text-sm">Projects Completed</div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80"
                alt="Premium natural stone formations"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
