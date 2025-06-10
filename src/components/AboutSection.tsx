
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
      className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
              Ancient Wisdom,
              <br />
              <span className="text-muted-foreground">Modern Beauty</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              For over two decades, Eterna Stones has been at the forefront of sourcing 
              and curating the world's most exquisite semi-precious stones. Our journey 
              began with a simple passion: to bring the earth's natural artistry into 
              your hands.
            </p>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Each stone in our collection is hand-selected for its unique character, 
              exceptional quality, and inherent beauty. We believe that every crystal 
              carries within it millions of years of natural history, waiting to become 
              part of your story.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-playfair font-bold text-primary mb-2">20+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-playfair font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Unique Stones</div>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80"
                alt="Natural crystal formation"
                className="w-full rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
