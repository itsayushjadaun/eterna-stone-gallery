
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-background/90 backdrop-blur-md border-b border-border shadow-sm" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-playfair font-bold text-foreground">
              Eterna Stones
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
              About
            </button>
            <button
              onClick={() => scrollToSection('collection')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Collection
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
          </nav>

          <Button 
            onClick={() => scrollToSection('collection')}
            className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Shop Now
          </Button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground"
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
          <nav className="md:hidden mt-4 pb-4 space-y-4">
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
              About
            </button>
            <button
              onClick={() => scrollToSection('collection')}
              className="block w-full text-left text-foreground hover:text-primary transition-colors"
            >
              Collection
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-foreground hover:text-primary transition-colors"
            >
              Contact
            </button>
            <Button 
              onClick={() => scrollToSection('collection')}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Shop Now
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};
