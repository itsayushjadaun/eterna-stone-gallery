
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

interface HeaderProps {
  isScrolled: boolean;
}

export const Header = ({ isScrolled }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const productCategories = [
    {
      title: "Semi Precious Stone Slabs",
      items: ["Various semi-precious stone options"]
    },
    {
      title: "Agate Stone Slabs",
      items: ["Blue Agate", "Black Agate", "Crystal Agate", "Green Agate", "Pink Agate", "Purple Agate", "Natural Agate", "Moss Agate", "Agatona"]
    },
    {
      title: "Quartz Stone Slabs",
      items: ["Crystal Quartz", "Smokey Quartz", "Pink Quartz", "Amethyst"]
    },
    {
      title: "Mother of Pearl (MOP)",
      items: ["Golden MOP", "Green Abelone", "White MOP", "Black MOP"]
    },
    {
      title: "Gemstone Slabs",
      items: ["Black Obsidian", "Golden Tiger Eye", "Blue Tiger Eye", "Malachite", "Labradorite", "Sodalite Blue", "Black Petrified Wood", "Brown Petrified Wood", "Golden Pyrite", "Silver Pyrite", "Selenite", "Red Jasper"]
    },
    {
      title: "Other Products",
      items: ["Washbasins", "Bath Tubs", "Other Articles"]
    }
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/93aa4666-afd3-44ff-b358-bb05a1ee65d3.png" 
              alt="Luminor Stones Logo" 
              className="h-10 w-auto"
            />
            <h1 className="text-2xl font-playfair font-bold text-foreground">
              Luminor Stones
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-foreground hover:text-primary transition-colors"
            >
              About Us
            </button>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[800px] gap-3 p-6 md:w-[500px] lg:w-[800px] lg:grid-cols-2">
                      {productCategories.map((category) => (
                        <div key={category.title} className="space-y-2">
                          <h4 className="text-sm font-medium text-foreground">{category.title}</h4>
                          <div className="space-y-1">
                            {category.items.slice(0, 4).map((item) => (
                              <button
                                key={item}
                                onClick={() => scrollToSection('collection')}
                                className="block text-xs text-muted-foreground hover:text-primary transition-colors w-full text-left"
                              >
                                {item}
                              </button>
                            ))}
                            {category.items.length > 4 && (
                              <span className="text-xs text-muted-foreground">
                                +{category.items.length - 4} more...
                              </span>
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
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact Us
            </button>
          </nav>

          <Button 
            onClick={() => scrollToSection('collection')}
            className="hidden lg:flex bg-primary text-primary-foreground hover:bg-primary/90"
          >
            View Products
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-foreground"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={cn(
                "bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm",
                isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
              )}></span>
              <span className={cn(
                "bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5",
                isMenuOpen ? "opacity-0" : "opacity-100"
              )}></span>
              <span className={cn(
                "bg-current block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm",
                isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
              )}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 space-y-4">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left text-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-foreground hover:text-primary transition-colors"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection('collection')}
              className="block w-full text-left text-foreground hover:text-primary transition-colors"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-foreground hover:text-primary transition-colors"
            >
              Contact Us
            </button>
            <Button 
              onClick={() => scrollToSection('collection')}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              View Products
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};
