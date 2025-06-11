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

  const categories = [
    "All", 
    "Agate Stone Slabs", 
    "Quartz Stone Slabs", 
    "Mother of Pearl (MOP)", 
    "Gemstone Slabs",
    "Non-Stone Items"
  ];

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
      className="py-8 sm:py-12 lg:py-24 xl:py-32 bg-background"
    >
      <div className="container mx-auto px-2 sm:px-4 lg:px-8">
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-playfair font-bold text-foreground mb-3 sm:mb-4 lg:mb-6">
            Premium Stone Collection
          </h2>
          <p className="text-sm sm:text-base lg:text-xl text-muted-foreground max-w-2xl sm:max-w-4xl mx-auto mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
            Explore our comprehensive selection of premium natural stone slabs, 
            from vibrant agate varieties to sophisticated mother of pearl finishes. 
            Each piece is carefully selected for exceptional quality and beauty.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8 max-w-4xl mx-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                className="text-xs sm:text-sm px-2 sm:px-3 py-2 whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Stone Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 max-w-7xl mx-auto">
          {filteredStones.map((stone, index) => (
            <div
              key={stone.id}
              className={`group cursor-pointer transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => onStoneSelect(stone)}
            >
              <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 group-hover:scale-105">
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={stone.image}
                    alt={stone.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = `/placeholder.svg`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-2 left-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs sm:text-sm font-medium">Click for details</p>
                    <p className="text-[10px] sm:text-xs text-gray-200 truncate">{stone.category}</p>
                  </div>
                </div>
                
                <div className="p-2 sm:p-3 lg:p-4">
                  <h3 className="text-xs sm:text-base lg:text-lg font-playfair font-semibold text-foreground mb-1 sm:mb-2 line-clamp-1">
                    {stone.name}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2 leading-relaxed">
                    {stone.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm font-semibold text-primary">
                      {stone.price}
                    </span>
                    <Button 
                      size="sm" 
                      className="bg-primary text-primary-foreground hover:bg-primary/90 text-[10px] sm:text-xs px-2 sm:px-3 py-1"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStones.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No stones found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};
