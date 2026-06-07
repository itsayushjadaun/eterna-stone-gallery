import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendWhatsAppMessage } from "@/services/whatsappService";
import { sendEmail } from "@/services/emailService";

interface Stone {
  id: string;
  name: string;
  description: string;
  detailedDescription: string;
  properties: string[];
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
  const [isLoading, setIsLoading] = useState<"email" | "whatsapp" | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: `I am interested in purchasing/getting a quote for ${stone.name}. Please share pricing and availability.`,
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Missing details",
        description: "Please fill in your name, email, and message before sending a request.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const getRequestData = () => ({
    name: formData.name.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim(),
    message: formData.message.trim(),
    type: "quote" as const,
    stoneName: stone.name,
    stoneCategory: stone.category,
  });

  const handleRequestViaWhatsApp = async () => {
    if (!validateForm()) return;

    setIsLoading("whatsapp");

    try {
      const success = await sendWhatsAppMessage(getRequestData());

      if (success) {
        toast({
          title: "WhatsApp opened",
          description: "Your purchase request message is ready to send on WhatsApp.",
        });
      } else {
        throw new Error("Failed to open WhatsApp");
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to open WhatsApp. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  const handleRequestViaEmail = async () => {
    if (!validateForm()) return;

    setIsLoading("email");

    try {
      const success = await sendEmail(getRequestData());

      if (success) {
        toast({
          title: "Request sent",
          description: "Your purchase request has been sent by email. We'll get back to you soon.",
        });
      } else {
        throw new Error("Failed to send email");
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to send email. Please try again or use WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

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
                  {stone.image && stone.image !== "/placeholder.svg" ? (
                    <img
                      src={stone.image}
                      alt={stone.name}
                      className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-64 sm:h-80 lg:h-96 bg-muted rounded-lg flex items-center justify-center p-8">
                      <p className="text-center text-2xl font-playfair font-semibold text-muted-foreground">
                        {stone.name}
                      </p>
                    </div>
                  )}
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

                <div className="border-t border-border pt-6 space-y-4">
                  <h3 className="text-lg lg:text-xl font-semibold text-foreground">Request Purchase / Quote</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="quote-name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="quote-name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        disabled={!!isLoading}
                      />
                    </div>
                    <div>
                      <label htmlFor="quote-email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="quote-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        disabled={!!isLoading}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="quote-phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="quote-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      disabled={!!isLoading}
                    />
                  </div>

                  <div>
                    <label htmlFor="quote-message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="quote-message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={!!isLoading}
                    />
                  </div>

                  <div className="space-y-3">
                    <Button
                      size="lg"
                      className="w-full bg-green-600 text-white hover:bg-green-700 text-sm lg:text-base"
                      onClick={handleRequestViaWhatsApp}
                      disabled={!!isLoading}
                    >
                      {isLoading === "whatsapp" ? "Opening WhatsApp..." : "Send Request via WhatsApp"}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full text-sm lg:text-base"
                      onClick={handleRequestViaEmail}
                      disabled={!!isLoading}
                    >
                      {isLoading === "email" ? "Sending Email..." : "Send Request via Email"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
