import contactData from "./contact.json";

export interface ContactConfig {
  businessName: string;
  email: string;
  whatsapp: {
    number: string;
    display: string;
  };
  phone: {
    number: string;
    display: string;
  };
  address: {
    line1: string;
    city: string;
    country: string;
  };
}

export const contactConfig = contactData as ContactConfig;
