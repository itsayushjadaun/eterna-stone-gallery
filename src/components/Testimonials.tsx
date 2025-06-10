
import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "California, USA",
    quote: "The amethyst I purchased from Eterna Stones is absolutely stunning. The quality and energy of the stone exceeded my expectations. Highly recommended!",
    rating: 5
  },
  {
    name: "David Chen",
    location: "Singapore",
    quote: "Amazing collection and excellent customer service. The stones arrived beautifully packaged and exactly as described. Will definitely order again!",
    rating: 5
  },
  {
    name: "Emma Thompson",
    location: "London, UK",
    quote: "I've been collecting crystals for years, and Eterna Stones has some of the finest quality stones I've ever seen. Their expertise really shows.",
    rating: 5
  }
];

export const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-32 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their perfect stones with us.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`text-center transition-all duration-500 ${
                  index === currentIndex 
                    ? 'opacity-100 transform translate-x-0' 
                    : 'opacity-0 transform translate-x-8 absolute inset-0'
                }`}
              >
                <blockquote className="text-2xl md:text-3xl font-playfair text-foreground mb-8 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                
                <div className="text-muted-foreground">
                  <p className="font-semibold text-foreground text-lg">{testimonial.name}</p>
                  <p>{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
