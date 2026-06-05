
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  isScrolled?: boolean;
  onCategorySelect?: (category: string) => void;
}

export const Header = ({ isScrolled = false, onCategorySelect }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
    setIsMenuOpen(false);
  };

  const handleViewProducts = () => {
    navigate('/products');
    setIsMenuOpen(false);
  };

  const productCategories = [
    {
      title: "Agate Stone Slabs",
      category: "Agate Stone Slabs",
      subcategories: [
        "Blue Agate",
        "Black Agate",
        "Crystal Agate",
        "Green Agate",
        "Natural Agate",
        "Moss Agate",
        "Agatona",
        "Grey Agate"
      ]
    },
    {
      title: "Quartz Stone Slabs",
      category: "Quartz Stone Slabs",
      subcategories: [
        "Crystal Quartz",
        "Smoky Quartz",
        "Pink Quartz",
        "Amethyst"
      ]
    },
    {
      title: "Mother of Pearl (MOP)",
      category: "Mother of Pearl (MOP)",
      subcategories: [
        "White MOP"
      ]
    },
    {
      title: "Gemstone Slabs",
      category: "Gemstone Slabs",
      subcategories: [
        "Black Obsidian",
        "Golden Tiger Eye",
        "Malachite",
        "Sodalite",
        "Petrified Wood"
      ]
    },
    {
      title: "Bath Tubs",
      category: "Bath Tubs",
      subcategories: []
    },
    {
      title: "Wash Basins",
      category: "Wash Basins",
      subcategories: []
    },
    {
      title: "Other Articles",
      category: "Other Articles",
      subcategories: []
    }
  ];
  const renderProductCategory = (category: (typeof productCategories)[number]) => (
    <div key={category.title}>
      <button
        onClick={() => handleCategoryClick(category.category)}
        className="text-sm font-semibold text-foreground hover:text-primary transition-colors w-full text-left px-2 py-2 rounded mb-2"
      >
        {category.title}
      </button>
      <div className="ml-2 space-y-1">
        {category.subcategories?.map((subcategory) => (
          <button
            key={subcategory}
            onClick={() => handleCategoryClick(category.category)}
            className="text-xs text-muted-foreground hover:text-primary transition-colors w-full text-left px-2 py-1 rounded"
          >
            • {subcategory}
          </button>
        ))}
      </div>
    </div>
  );

  const getTextColor = () => {
    return 'text-foreground';
  };

  const getHoverColor = () => {
    return 'hover:text-primary';
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
    )}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between py-1 lg:py-1.5">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-2 lg:space-x-3 hover:opacity-80 transition-opacity"
            >
              <img 
                src="/avan-logo.png"
                alt="Avan Exports Logo" 
                className="h-12 lg:h-16 w-auto"
              />
              <h1 className={`text-lg lg:text-2xl font-playfair font-bold hidden sm:block ${getTextColor()}`}>
                Avan Exports
              </h1>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className={`text-sm font-medium transition-colors ${getTextColor()} ${getHoverColor()}`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`text-sm font-medium transition-colors ${getTextColor()} ${getHoverColor()}`}
            >
              About Us
            </button>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`text-sm font-medium bg-transparent h-auto py-1.5 px-3 data-[state=open]:bg-accent data-[state=open]:text-foreground transition-colors ${getTextColor()} ${getHoverColor()}`}>
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="flex w-[700px] gap-6 p-6">
                      <div className="flex-1 flex flex-col gap-3">
                        {productCategories.filter((_, index) => index % 2 === 0).map(renderProductCategory)}
                      </div>
                      <div className="flex-1 flex flex-col gap-3">
                        {productCategories.filter((_, index) => index % 2 === 1).map(renderProductCategory)}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <button
              onClick={() => scrollToSection('contact')}
              className={`text-sm font-medium transition-colors ${getTextColor()} ${getHoverColor()}`}
            >
              Contact Us
            </button>
          </nav>

          <div className="flex items-center space-x-3">
            <Button 
              onClick={handleViewProducts}
              className="hidden lg:flex bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-4 py-1.5 h-auto"
            >
              View Products
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-1.5 transition-colors ${getTextColor()} ${getHoverColor()}`}
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
                <div className="space-y-2 ml-2">
                  {productCategories.map((category) => (
                    <div key={category.title}>
                      <button
                        onClick={() => handleCategoryClick(category.category)}
                        className="block w-full text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-1"
                      >
                        {category.title}
                      </button>
                      <div className="ml-2 space-y-1">
                        {category.subcategories?.map((subcategory) => (
                          <button
                            key={subcategory}
                            onClick={() => handleCategoryClick(category.category)}
                            className="block w-full text-left text-xs text-muted-foreground hover:text-primary transition-colors py-0.5"
                          >
                            • {subcategory}
                          </button>
                        ))}
                      </div>
                    </div>
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
                  onClick={handleViewProducts}
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
