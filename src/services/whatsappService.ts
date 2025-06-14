
export interface WhatsAppData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: 'quote' | 'contact';
  stoneName?: string;
  stoneCategory?: string;
  stonePrice?: string;
}

export const sendWhatsAppMessage = (data: WhatsAppData): boolean => {
  try {
    const whatsappNumber = '918824405590'; // India country code + number
    
    let messageText = '';
    
    if (data.type === 'quote' && data.stoneName) {
      messageText = `*Quote Request from Luminor Stones Website*

*Stone Details:*
- Name: ${data.stoneName}
- Category: ${data.stoneCategory || 'Not specified'}
- Price Range: ${data.stonePrice || 'Not specified'}

*Customer Details:*
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone || 'Not provided'}

*Message:*
${data.message}

*Request Type:* Quote Request`;
    } else {
      messageText = `*Contact Request from Luminor Stones Website*

*Customer Details:*
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone || 'Not provided'}

*Message:*
${data.message}

*Request Type:* General Contact`;
    }

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    return true;
  } catch (error) {
    console.error('Failed to open WhatsApp:', error);
    return false;
  }
};
