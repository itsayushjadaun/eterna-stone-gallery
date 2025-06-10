
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
      className="py-20 md:py-32 bg-gradient-to-b from-muted/30 to-background"
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            Why Choose Eterna Stones?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our commitment to quality, authenticity, and customer satisfaction sets us apart 
            in the world of semi-precious stones.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`text-center group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="bg-card rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-playfair font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
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
