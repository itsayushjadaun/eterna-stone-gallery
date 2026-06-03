
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

export const sendWhatsAppMessage = async (data: WhatsAppData): Promise<boolean> => {
  try {
    const whatsappNumber = '919461520121'; // India country code + number
    
    let messageText = '';
    
    if (data.type === 'quote' && data.stoneName) {
      messageText = `*Quote Request from Avan Exports Website*

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
      messageText = `*Contact Request from Avan Exports Website*

*Customer Details:*
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone || 'Not provided'}

*Message:*
${data.message}

*Request Type:* General Contact`;
    }

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(messageText);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    console.log('WhatsApp message opened successfully');
    return true;
  } catch (error) {
    console.error('Failed to open WhatsApp message:', error);
    return false;
  }
};
