import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StoneModal } from "@/components/StoneModal";
import { Button } from "@/components/ui/button";
import { stones } from "@/data/stones";

const getSubcategory = (stone: (typeof stones)[number]) => {
  const category = stone.category;
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

  return subcategory;
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedStone, setSelectedStone] = useState<(typeof stones)[number] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("category")
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

  const categorizedStones = useMemo(() => {
    return stones.reduce((acc, stone) => {
      const category = stone.category;
      const subcategory = getSubcategory(stone);

      if (!acc[category]) {
        acc[category] = {};
      }
      if (!acc[category][subcategory]) {
        acc[category][subcategory] = [];
      }

      acc[category][subcategory].push(stone);
      return acc;
    }, {} as Record<string, Record<string, typeof stones>>);
  }, []);

  const categoryParam = searchParams.get("category");

  useEffect(() => {
    if (categoryParam && categorizedStones[categoryParam]) {
      setSelectedCategory(categoryParam);
      setSelectedSubcategory(null);
    } else if (!categoryParam) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    }
  }, [categoryParam, categorizedStones]);

  const displayedStones = useMemo(() => {
    if (!selectedCategory) return [];

    const stonesInCategory = Object.entries(categorizedStones[selectedCategory]).flatMap(
      ([, stonesInSubcategory]) => stonesInSubcategory
    );

    if (selectedSubcategory) {
      return stonesInCategory.filter((stone) => getSubcategory(stone) === selectedSubcategory);
    }

    return stonesInCategory;
  }, [selectedCategory, selectedSubcategory, categorizedStones]);

  const handleCategorySelect = (category: string) => {
    const nextCategory = category === selectedCategory ? null : category;
    setSelectedCategory(nextCategory);
    setSelectedSubcategory(null);

    if (nextCategory) {
      setSearchParams({ category: nextCategory });
    } else {
      setSearchParams({});
    }
  };

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory === selectedSubcategory ? null : subcategory);
  };

  const renderStoneCard = (stone: (typeof stones)[number]) => (
    <div
      key={stone.id}
      className="group cursor-pointer"
      onClick={() => setSelectedStone(stone)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setSelectedStone(stone);
        }
      }}
      role="button"
      tabIndex={0}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
          <Button size="sm" className="w-full pointer-events-none">
            View Details
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header isScrolled={true} />

      <div className="pt-24 lg:pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-playfair font-bold text-foreground mb-6">
              Premium Stone Collection
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore our comprehensive selection of premium natural stone slabs organized by category and type
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
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
              <p className="text-muted-foreground">
                Choose a category above or use the Products menu to explore our stone collection
              </p>
            </div>
          )}

          {selectedCategory && (
            <>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {Object.keys(categorizedStones[selectedCategory]).map((subcategory) => (
                  <Button
                    key={subcategory}
                    variant={selectedSubcategory === subcategory ? "default" : "outline"}
                    onClick={() => handleSubcategorySelect(subcategory)}
                    className="text-sm px-4 py-2"
                  >
                    {subcategory}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto">
                {displayedStones.map(renderStoneCard)}
              </div>

              {displayedStones.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No stones found in this subcategory.</p>
                </div>
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
