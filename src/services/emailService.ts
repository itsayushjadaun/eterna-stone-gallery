import emailjs from "@emailjs/browser";
import { contactConfig } from "@/config/contact";
import { emailJsConfig } from "@/config/emailjs";

emailjs.init(emailJsConfig.publicKey);

export interface EmailData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: "quote" | "contact";
  stoneName?: string;
  stoneCategory?: string;
}

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

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  const requestType = data.type === "quote" ? "Quote Request" : "Contact Form";
  const fullMessage = buildFullMessage(data);

  // console.log(templateParams.to_email);
  console.log("Recipient:", contactConfig.email);
  console.log("Full Message:", fullMessage);
  console.log("Request Type:", requestType);
  console.log("Reply To:", data.email);
  console.log("Phone:", data);
  

  const templateParams = {
    // to_email: contactConfig.email,
    from_name: data.name,
    from_email: data.email,
    phone: data.phone || "Not provided",
    message: fullMessage,
    request_type: requestType,
    reply_to: data.email,
    stone_name: data.stoneName || "N/A",
    stone_category: data.stoneCategory || "N/A",
  };

  try {
    const response = await emailjs.send(
      emailJsConfig.serviceId,
      emailJsConfig.templateId,
      templateParams
    );

    return response.status === 200;
  } catch (error) {
    console.error("Failed to send email via EmailJS:", error);
    return false;
  }
};
