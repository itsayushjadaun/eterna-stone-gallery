
import emailjs from '@emailjs/browser';

// EmailJS configuration
const SERVICE_ID = 'service_default';
const TEMPLATE_ID = 'template_default';
const PUBLIC_KEY = 'your_public_key';

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

export interface EmailData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type: 'quote' | 'contact';
}

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: 'jadaunayush3@gmail.com',
      from_name: data.name,
      from_email: data.email,
      phone: data.phone || 'Not provided',
      message: data.message,
      request_type: data.type === 'quote' ? 'Quote Request' : 'Contact Form',
      reply_to: data.email,
    };

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return response.status === 200;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};
