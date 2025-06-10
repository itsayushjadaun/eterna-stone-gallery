
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair font-bold">
            {stone.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <img
              src={stone.image}
              alt={stone.name}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Origin</h4>
                <p className="text-muted-foreground">{stone.origin}</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Price Range</h4>
                <p className="text-lg font-semibold text-primary">{stone.price}</p>
              </div>
            </div>

            {stone.chakra && (
              <div>
                <h4 className="font-semibold text-foreground mb-2">Associated Chakra</h4>
                <Badge variant="outline">{stone.chakra}</Badge>
              </div>
            )}

            {stone.zodiac && stone.zodiac.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-2">Zodiac Signs</h4>
                <div className="flex flex-wrap gap-2">
                  {stone.zodiac.map((sign) => (
                    <Badge key={sign} variant="secondary">{sign}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {stone.detailedDescription}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Properties & Benefits</h3>
              <div className="grid grid-cols-2 gap-2">
                {stone.properties.map((property) => (
                  <Badge key={property} variant="outline" className="justify-center">
                    {property}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Category</h3>
              <Badge variant="default">{stone.category}</Badge>
            </div>

            <div className="space-y-3 pt-4">
              <Button 
                size="lg" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
              >
                Contact for Custom Order
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
