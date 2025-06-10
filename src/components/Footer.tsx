
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-4">Eterna Stones</h3>
            <p className="text-background/80 mb-4">
              Bringing you the finest collection of semi-precious stones and crystals 
              from around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                Instagram
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                Facebook
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                Pinterest
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Collection
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-background/80 hover:text-background transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stone Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Healing Crystals</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Prosperity Stones</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Love Stones</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Protection Stones</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <p className="text-background/80 mb-4">
              Subscribe to receive updates on new stones and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
              />
              <Button 
                type="submit"
                className="w-full bg-background text-foreground hover:bg-background/90"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-background/80 mb-4 md:mb-0">
            © 2024 Eterna Stones. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-background/80 hover:text-background transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-background/80 hover:text-background transition-colors">
              Terms of Service
            </a>
            <button 
              onClick={scrollToTop}
              className="text-background/80 hover:text-background transition-colors"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
