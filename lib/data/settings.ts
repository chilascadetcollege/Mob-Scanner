import { prisma } from '../prisma';

export async function getSettings() {
  try {
    const settings = await prisma.setting.findUnique({
      where: { key: 'main' }
    });
    if (settings) return settings;
  } catch (error) {
    console.error('Database connection failed for settings. Using fallback.');
  }

  // Graceful fallback if database is unavailable or setting not found
  return {
    website_name: 'نبراس ایجوکیشنل سسٹم',
    logo: '/logo.jpeg',
    phone: '0300-4849484',
    whatsapp: '923004849484',
    email: null,
    address: null,
    footer_text: 'دینی و عصری تعلیم اور کردار سازی کا ادارہ۔',
    facebook: null,
    youtube: null,
    ai_agent_settings: {
      tenant_id: 'tenant_7KVx7XX7RM',
      agent_id: 'ag_8f7995f9178e4a37a96d1088c3725392',
      widget_position: 'bottom-right'
    }
  };
}
