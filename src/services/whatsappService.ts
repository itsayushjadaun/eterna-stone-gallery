

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

    // Using a WhatsApp API service (you'll need to replace with your actual API endpoint)
    const response = await fetch('https://api.whatsapp.com/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_WHATSAPP_API_TOKEN', // You'll need to add your token
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: whatsappNumber,
        type: 'text',
        text: {
          body: messageText
        }
      })
    });

    if (response.ok) {
      console.log('WhatsApp message sent successfully');
      return true;
    } else {
      console.error('Failed to send WhatsApp message:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
    return false;
  }
};

