
import { useEffect, useRef, useState } from "react";

const features = [
  {
    title: "100% Genuine Stones",
    description: "Every stone is authenticated and certified for its authenticity and quality.",
    icon: "✨"
  },
  {
    title: "Handpicked for Quality",
    description: "Our experts personally select each stone for its exceptional beauty and energy.",
    icon: "👁️"
  },
  {
    title: "Worldwide Shipping",
    description: "We deliver our precious stones safely to customers around the globe.",
    icon: "🌍"
  },
  {
    title: "Custom Orders",
    description: "Special requests and custom stone selections available for unique needs.",
    icon: "💎"
  }
];

export const WhyChooseUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-16 lg:py-24 xl:py-32 bg-gradient-to-b from-muted/30 to-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 lg:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-playfair font-bold text-foreground mb-4 lg:mb-6">
            Why Choose Luminor Stones?
          </h2>
          <p className="text-base lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our commitment to quality, authenticity, and customer satisfaction sets us apart 
            in the world of premium stone slabs and gemstones.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`text-center group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-card rounded-lg p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 h-full">
                <div className="text-3xl lg:text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg lg:text-xl font-playfair font-semibold text-foreground mb-3 lg:mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
