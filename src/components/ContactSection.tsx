
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const sectionRef = useRef(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for your inquiry. We'll get back to you soon with stone specifications and pricing.",
    });

    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30"
    >
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            Contact Luminor Stones
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your space with premium natural stone? 
            Contact us for custom specifications, pricing, and project consultation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="bg-card rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-playfair font-semibold text-foreground mb-6">
                Request Quote & Information
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Project Details & Requirements *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe your project, stone preferences, dimensions needed, and any specific requirements..."
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Request Quote
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`}>
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-playfair font-semibold text-foreground mb-6">
                  Get in Touch
                </h3>
                <div className="space-y-6">
                  <div className="bg-card rounded-lg p-6 shadow-lg">
                    <h4 className="font-semibold text-foreground mb-3">Business Address</h4>
                    <p className="text-muted-foreground">
                      Luminor Stones Showroom<br />
                      Premium Stone District<br />
                      Stone Valley, SV 12345<br />
                      United States
                    </p>
                  </div>
                  
                  <div className="bg-card rounded-lg p-6 shadow-lg">
                    <h4 className="font-semibold text-foreground mb-3">Contact Details</h4>
                    <div className="space-y-2 text-muted-foreground">
                      <p><strong>Phone:</strong> +1 (555) 123-STONE</p>
                      <p><strong>Email:</strong> info@luminorstones.com</p>
                      <p><strong>WhatsApp:</strong> +1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="bg-card rounded-lg p-6 shadow-lg">
                    <h4 className="font-semibold text-foreground mb-3">Showroom Hours</h4>
                    <div className="text-muted-foreground space-y-1">
                      <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 5:00 PM</p>
                      <p>Sunday: By Appointment Only</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-lg">
                <h4 className="font-semibold text-foreground mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    LinkedIn
                  </a>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
