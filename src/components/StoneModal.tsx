
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface Stone {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  properties: string[];
  origin: string;
  price: string;
  image: string;
  category: string;
  chakra?: string;
  zodiac?: string[];
}

interface StoneModalProps {
  stone: Stone;
  onClose: () => void;
}

export const StoneModal = ({ stone, onClose }: StoneModalProps) => {
  return (
    <Dialog open={!!stone} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="p-4 sm:p-6 lg:p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl lg:text-3xl font-playfair font-bold text-left">
                {stone.name}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-4 lg:space-y-6">
                <div className="relative">
                  <img
                    src={stone.image}
                    alt={stone.name}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Origin</h4>
                    <p className="text-muted-foreground text-sm lg:text-base">{stone.origin}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Price Range</h4>
                    <p className="text-lg lg:text-xl font-semibold text-primary">{stone.price}</p>
                  </div>
                </div>

                {stone.chakra && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Associated Chakra</h4>
                    <Badge variant="outline" className="text-sm">{stone.chakra}</Badge>
                  </div>
                )}

                {stone.zodiac && stone.zodiac.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Zodiac Signs</h4>
                    <div className="flex flex-wrap gap-2">
                      {stone.zodiac.map((sign) => (
                        <Badge key={sign} variant="secondary" className="text-sm">{sign}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                    {stone.detailedDescription}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-3">Properties & Benefits</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {stone.properties.map((property) => (
                      <Badge key={property} variant="outline" className="justify-center text-xs lg:text-sm py-2">
                        {property}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg lg:text-xl font-semibold text-foreground mb-3">Category</h3>
                  <Badge variant="default" className="text-sm">{stone.category}</Badge>
                </div>

                <div className="space-y-3 pt-4">
                  <Button 
                    size="lg" 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm lg:text-base"
                  >
                    Request Quote
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full text-sm lg:text-base"
                  >
                    Contact for Custom Order
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
