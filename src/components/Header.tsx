
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  isScrolled: boolean;
  onCategorySelect?: (category: string) => void;
}

export const Header = ({ isScrolled, onCategorySelect }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleCategoryClick = (category: string) => {
    scrollToSection('collection');
    if (onCategorySelect) {
      // Small delay to ensure the section is in view before filtering
      setTimeout(() => {
        onCategorySelect(category);
      }, 300);
    }
    setIsMenuOpen(false);
  };

  const productCategories = [
    {
      title: "Semi Precious Stone Slabs",
      category: "Gemstone Slabs",
      items: ["Various semi-precious stone options"]
    },
    {
      title: "Agate Stone Slabs",
      category: "Agate Stone Slabs",
      items: ["Blue Agate", "Black Agate", "Crystal Agate", "Green Agate", "Pink Agate", "Purple Agate", "Natural Agate", "Moss Agate", "Agatona"]
    },
    {
      title: "Quartz Stone Slabs",
      category: "Quartz Stone Slabs",
      items: ["Crystal Quartz", "Smokey Quartz", "Pink Quartz", "Amethyst"]
    },
    {
      title: "Mother of Pearl (MOP)",
      category: "Mother of Pearl (MOP)",
      items: ["Golden MOP", "Green Abelone", "White MOP", "Black MOP"]
    },
    {
      title: "Gemstone Slabs",
      category: "Gemstone Slabs",
      items: ["Black Obsidian", "Golden Tiger Eye", "Blue Tiger Eye", "Malachite", "Labradorite", "Sodalite Blue", "Black Petrified Wood", "Brown Petrified Wood", "Golden Pyrite", "Silver Pyrite", "Selenite", "Red Jasper"]
    },
    {
      title: "Other Products",
      category: "Non-Stone Items",
      items: ["Washbasins", "Bath Tubs", "Other Articles"]
    }
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
            <img 
              src="/lovable-uploads/93aa4666-afd3-44ff-b358-bb05a1ee65d3.png" 
              alt="Luminor Stones Logo" 
              className="h-8 lg:h-10 w-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <h1 className="text-lg lg:text-2xl font-playfair font-bold text-foreground hidden sm:block">
              Luminor Stones
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              About Us
            </button>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-foreground hover:text-primary bg-transparent data-[state=open]:bg-accent">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[600px] xl:w-[800px] gap-4 p-6 lg:grid-cols-2">
                      {productCategories.map((category) => (
                        <div key={category.title} className="space-y-2">
                          <button
                            onClick={() => handleCategoryClick(category.category)}
                            className="text-sm font-semibold text-foreground hover:text-primary transition-colors w-full text-left"
                          >
                            {category.title}
                          </button>
                          <div className="space-y-1">
                            {category.items.slice(0, 4).map((item) => (
                              <button
                                key={item}
                                onClick={() => handleCategoryClick(category.category)}
                                className="block text-xs text-muted-foreground hover:text-primary transition-colors w-full text-left py-1"
                              >
                                {item}
                              </button>
                            ))}
                            {category.items.length > 4 && (
                              <button
                                onClick={() => handleCategoryClick(category.category)}
                                className="text-xs text-muted-foreground hover:text-primary transition-colors italic"
                              >
                                +{category.items.length - 4} more...
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Contact Us
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button 
              onClick={() => scrollToSection('collection')}
              className="hidden lg:flex bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-4 py-2"
            >
              View Products
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border">
            <nav className="py-4 space-y-3">
              <button
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-accent transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-accent transition-colors"
              >
                About Us
              </button>
              
              {/* Mobile Product Categories */}
              <div className="px-4">
                <p className="text-sm font-medium text-foreground mb-2">Products</p>
                <div className="space-y-1 ml-4">
                  {productCategories.map((category) => (
                    <button
                      key={category.title}
                      onClick={() => handleCategoryClick(category.category)}
                      className="block w-full text-left text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                    >
                      {category.title}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-accent transition-colors"
              >
                Contact Us
              </button>
              <div className="px-4 pt-2">
                <Button 
                  onClick={() => scrollToSection('collection')}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  View Products
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
