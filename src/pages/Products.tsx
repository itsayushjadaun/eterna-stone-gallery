import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StoneModal } from "@/components/StoneModal";
import { Button } from "@/components/ui/button";
import { stones } from "@/data/stones";

const Products = () => {
  const [selectedStone, setSelectedStone] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  // Organize stones by category and subcategory
  const categorizedStones = stones.reduce((acc, stone) => {
    const category = stone.category;
    if (!acc[category]) {
      acc[category] = {};
    }
    
    // Create subcategories based on stone name patterns
    let subcategory = "General";
    
    if (category === "Agate Stone Slabs") {
      if (stone.name.includes("Blue")) subcategory = "Blue Agate";
      else if (stone.name.includes("Black")) subcategory = "Black Agate";
      else if (stone.name.includes("Crystal")) subcategory = "Crystal Agate";
      else if (stone.name.includes("Green")) subcategory = "Green Agate";
      else if (stone.name.includes("Pink")) subcategory = "Pink Agate";
      else if (stone.name.includes("Natural")) subcategory = "Natural Agate";
      else if (stone.name.includes("Moss")) subcategory = "Moss Agate";
      else if (stone.name.includes("Agatona")) subcategory = "Agatona";
      else if (stone.name.includes("Brown")) subcategory = "Brown Agate";
      else if (stone.name.includes("Grey")) subcategory = "Grey Agate";
    } else if (category === "Quartz Stone Slabs") {
      if (stone.name.includes("Crystal")) subcategory = "Crystal Quartz";
      else if (stone.name.includes("Smokey")) subcategory = "Smokey Quartz";
      else if (stone.name.includes("Pink")) subcategory = "Pink Quartz";
      else if (stone.name.includes("Amethyst")) subcategory = "Amethyst";
    } else if (category === "Mother of Pearl (MOP)") {
      if (stone.name.includes("Golden")) subcategory = "Golden MOP";
      else if (stone.name.includes("White")) subcategory = "White MOP";
    } else if (category === "Gemstone Slabs") {
      if (stone.name.includes("Obsidian")) subcategory = "Obsidian";
      else if (stone.name.includes("Tiger Eye")) subcategory = "Tiger Eye";
      else if (stone.name.includes("Malachite")) subcategory = "Malachite";
      else if (stone.name.includes("Labradorite")) subcategory = "Labradorite";
      else if (stone.name.includes("Sodalite")) subcategory = "Sodalite";
      else if (stone.name.includes("Petrified")) subcategory = "Petrified Wood";
    }

    if (!acc[category][subcategory]) {
      acc[category][subcategory] = [];
    }
    
    acc[category][subcategory].push(stone);
    return acc;
  }, {} as Record<string, Record<string, typeof stones>>);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setSelectedSubcategory(null);
  };

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory === selectedSubcategory ? null : subcategory);
  };

  const getDisplayedStones = () => {
    if (!selectedCategory) return [];
    if (!selectedSubcategory) return [];
    return categorizedStones[selectedCategory][selectedSubcategory] || [];
  };

  return (
    <div className="min-h-screen bg-background">
      <Header isScrolled={true} />
      
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-foreground mb-6">
              Premium Stone Collection
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore our comprehensive selection of premium natural stone slabs organized by category and type
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => { setSelectedCategory(null); setSelectedSubcategory(null); }}
              className="px-6 py-2"
            >
              All Categories
            </Button>
            {Object.keys(categorizedStones).map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => handleCategorySelect(category)}
                className="px-6 py-2"
              >
                {category}
              </Button>
            ))}
          </div>

          {!selectedCategory && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-playfair font-semibold mb-4">Select a Category</h3>
              <p className="text-muted-foreground">Choose a category above to explore our stone collection</p>
            </div>
          )}

          {selectedCategory && (
            <>
              {/* Subcategories Grid */}
              <div className="mb-12">
                <h2 className="text-2xl font-playfair font-semibold mb-6 text-center">{selectedCategory}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Object.keys(categorizedStones[selectedCategory]).map((subcategory) => {
                    const firstStone = categorizedStones[selectedCategory][subcategory][0];
                    return (
                      <div key={subcategory} className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                        <div className="relative overflow-hidden aspect-square">
                          <img
                            src={firstStone.image}
                            alt={subcategory}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `/placeholder.svg`;
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                            <h3 className="text-2xl font-playfair font-semibold mb-2 text-white">
                              {subcategory}
                            </h3>
                            <p className="text-sm text-gray-200">
                              {categorizedStones[selectedCategory][subcategory].length} products
                            </p>
                          </div>
                        </div>
                        <div className="p-4 max-h-48 overflow-y-auto">
                          <div className="space-y-2">
                            {categorizedStones[selectedCategory][subcategory].map((stone) => (
                              <Button
                                key={stone.id}
                                variant={selectedSubcategory === subcategory && selectedStone?.id === stone.id ? "default" : "ghost"}
                                className="w-full justify-start text-xs py-1 px-2 h-auto"
                                onClick={() => { 
                                  setSelectedSubcategory(subcategory);
                                  setSelectedStone(stone);
                                }}
                              >
                                {stone.name}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Stones Grid */}
              {selectedSubcategory && (
                <>
                  <div className="mb-8">
                    <h3 className="text-3xl font-playfair font-bold mb-2 text-center">
                      {selectedSubcategory}
                    </h3>
                    <p className="text-muted-foreground text-center">
                      {getDisplayedStones().length} products in {selectedSubcategory}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getDisplayedStones().map((stone) => (
                      <div
                        key={stone.id}
                        className="group cursor-pointer"
                        onClick={() => setSelectedStone(stone)}
                      >
                        <div className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                          <div className="relative overflow-hidden aspect-square">
                            <img
                              src={stone.image}
                              alt={stone.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `/placeholder.svg`;
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <p className="text-sm font-medium">Click for details</p>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <h4 className="text-xl font-playfair font-semibold text-foreground mb-3">
                              {stone.name}
                            </h4>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                              {stone.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {stone.properties.slice(0, 3).map((property) => (
                                <span
                                  key={property}
                                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                                >
                                  {property}
                                </span>
                              ))}
                            </div>
                            <Button size="sm" className="w-full">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
      
      {selectedStone && (
        <StoneModal 
          stone={selectedStone} 
          onClose={() => setSelectedStone(null)} 
        />
      )}
    </div>
  );
};

export default Products;