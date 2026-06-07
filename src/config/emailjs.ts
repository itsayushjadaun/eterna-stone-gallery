import emailjsConfig from "./emailjs.json";

export interface EmailJsConfig {
  publicKey: string;
  serviceId: string;
  templateId: string;
}

export const emailJsConfig = emailjsConfig as EmailJsConfig;
