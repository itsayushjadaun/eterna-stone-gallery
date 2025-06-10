
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { stones } from "@/data/stones";

interface StoneCollectionProps {
  onStoneSelect: (stone: any) => void;
}

export const StoneCollection = ({ onStoneSelect }: StoneCollectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [filter, setFilter] = useState("All");
  const sectionRef = useRef(null);

  const categories = ["All", "Healing Crystals", "Prosperity Stones", "Mystical Stones", "Love Stones", "Protection Stones", "Master Healers"];

  const filteredStones = filter === "All" ? stones : stones.filter(stone => stone.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="collection" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            Our Stone Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover the perfect stone for your journey. Each piece has been carefully 
            selected for its beauty, energy, and transformative properties.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Stone Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStones.map((stone, index) => (
            <div
              key={stone.id}
              className={`group cursor-pointer transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => onStoneSelect(stone)}
            >
              <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={stone.image}
                    alt={stone.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium">Click to explore</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-playfair font-semibold text-foreground mb-2">
                    {stone.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {stone.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-primary">
                      {stone.price}
                    </span>
                    <Button 
                      size="sm" 
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
