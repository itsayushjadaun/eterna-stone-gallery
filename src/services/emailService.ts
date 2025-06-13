import emailjs from '@emailjs/browser';

// EmailJS configuration - Replace these with your actual values from EmailJS dashboard
// Visit https://dashboard.emailjs.com/admin to get these values:
// 1. SERVICE_ID: Found in Email Services section
// 2. TEMPLATE_ID: Found in Email Templates section  
// 3. PUBLIC_KEY: Found in Account section under API Keys
const SERVICE_ID = 'service_a3x3vzp'; // Replace with your EmailJS service ID
const TEMPLATE_ID = 'template_fbfusf9'; // Replace with your EmailJS template ID
const PUBLIC_KEY = 'TG1uWoPtKntn3uqOD'; // Replace with your EmailJS public key

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
