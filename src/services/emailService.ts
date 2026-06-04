import emailjs from "@emailjs/browser";
import { contactConfig } from "@/config/contact";

const SERVICE_ID = "service_a3x3vzp";
const TEMPLATE_ID = "template_fbfusf9";
const PUBLIC_KEY = "TG1uWoPtKntn3uqOD";

emailjs.init(PUBLIC_KEY);

export interface EmailData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: "quote" | "contact";
  stoneName?: string;
  stoneCategory?: string;
}

export type EmailSendResult = {
  success: boolean;
  method?: "emailjs" | "mailto";
};

const buildFullMessage = (data: EmailData) => {
  if (data.type === "quote" && data.stoneName) {
    return `Purchase/Quote Request

Stone: ${data.stoneName}
Category: ${data.stoneCategory || "Not specified"}

Customer Message:
${data.message}`;
  }

  return data.message;
};

const openMailtoFallback = (data: EmailData): boolean => {
  try {
    const requestType = data.type === "quote" ? "Quote Request" : "Contact Form";
    const fullMessage = buildFullMessage(data);

    const subject = encodeURIComponent(`${requestType} - ${contactConfig.businessName}`);
    const body = encodeURIComponent(
      `Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || "Not provided"}
Request Type: ${requestType}

${fullMessage}`
    );

    window.location.href = `mailto:${contactConfig.email}?subject=${subject}&body=${body}`;
    return true;
  } catch (error) {
    console.error("Failed to open mailto fallback:", error);
    return false;
  }
};

export const sendEmail = async (data: EmailData): Promise<EmailSendResult> => {
  const requestType = data.type === "quote" ? "Quote Request" : "Contact Form";
  const fullMessage = buildFullMessage(data);

  try {
    const templateParams = {
      to_email: contactConfig.email,
      from_name: data.name,
      from_email: data.email,
      phone: data.phone || "Not provided",
      message: fullMessage,
      request_type: requestType,
      reply_to: data.email,
      stone_name: data.stoneName || "N/A",
      stone_category: data.stoneCategory || "N/A",
    };

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);

    if (response.status === 200) {
      return { success: true, method: "emailjs" };
    }
  } catch (error) {
    console.error("EmailJS failed, using mailto fallback:", error);
  }

  const mailtoOpened = openMailtoFallback(data);
  return {
    success: mailtoOpened,
    method: mailtoOpened ? "mailto" : undefined,
  };
};
