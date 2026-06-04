import { contactConfig } from "@/config/contact";

export interface WhatsAppData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: "quote" | "contact";
  stoneName?: string;
  stoneCategory?: string;
  stonePrice?: string;
}

export const sendWhatsAppMessage = async (data: WhatsAppData): Promise<boolean> => {
  try {
    let messageText = "";

    if (data.type === "quote" && data.stoneName) {
      messageText = `*Purchase/Quote Request - ${contactConfig.businessName}*

*Stone Details:*
- Name: ${data.stoneName}
- Category: ${data.stoneCategory || "Not specified"}
- Price Range: ${data.stonePrice || "Not specified"}

*Customer Details:*
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone || "Not provided"}

*Message:*
${data.message}

*Request Type:* Quote Request`;
    } else {
      messageText = `*Contact Request - ${contactConfig.businessName}*

*Customer Details:*
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone || "Not provided"}

*Message:*
${data.message}

*Request Type:* General Contact`;
    }

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${contactConfig.whatsapp.number}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    return true;
  } catch (error) {
    console.error("Failed to open WhatsApp message:", error);
    return false;
  }
};
