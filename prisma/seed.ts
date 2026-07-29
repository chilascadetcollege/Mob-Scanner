const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Admin User
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || 'Super Admin';

  if (adminEmail && adminPassword) {
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await prisma.admin.create({
        data: {
          name: adminName,
          email: adminEmail,
          password_hash: hashedPassword,
          role: 'SUPER_ADMIN',
        },
      });
      console.log('Admin user created.');
    }
  } else {
    console.log('Skipping Admin creation: ADMIN_EMAIL or ADMIN_PASSWORD not set.');
  }

  // Settings
  await prisma.setting.upsert({
    where: { key: 'main' },
    update: {},
    create: {
      key: 'main',
      website_name: 'نبراس ایجوکیشنل سسٹم',
      phone: '0300-4849484',
      whatsapp: '923004849484',
      footer_text: 'دینی و عصری تعلیم اور کردار سازی کا ادارہ۔',
      ai_agent_settings: {
        tenant_id: 'tenant_7KVx7XX7RM',
        agent_id: 'ag_8f7995f9178e4a37a96d1088c3725392',
        widget_position: 'bottom-right'
      }
    },
  });
  console.log('Settings seeded.');

  // Announcement
  const existingAnnouncement = await prisma.announcement.findFirst();
  if (!existingAnnouncement) {
    await prisma.announcement.create({
      data: {
        title: 'خوش آمدید',
        message: 'نبراس میں خوش آمدید! معیاری تعلیم، پیشہ ورانہ تربیت اور روشن مستقبل کی جانب آپ کا پہلا قدم۔',
        status: 'ACTIVE',
      },
    });
    console.log('Announcement seeded.');
  }

  // Principal Message
  await prisma.principalMessage.upsert({
    where: { key: 'main' },
    update: {},
    create: {
      key: 'main',
      message: 'ہماری کوشش ہے کہ ہر طالب علم قرآن و سنت کی روشنی میں علم، کردار اور اعلیٰ اخلاق کے ساتھ پروان چڑھے۔ ہم تعلیم کو صرف کتابی معلومات نہیں بلکہ شخصیت سازی، عملی تربیت اور ذمہ دار زندگی کا ذریعہ سمجھتے ہیں۔ اساتذہ کی محنت اور والدین کے اعتماد کے ساتھ ہم ہر بچے کی صلاحیت کو نکھارنے کے لیے کوشاں ہیں۔ ہمارا مقصد ایسے باکردار اور باصلاحیت افراد تیار کرنا ہے جو معاشرے کے لیے مفید ثابت ہوں۔',
    },
  });
  console.log('Principal Message seeded.');

  // Testimonials
  const testimonials = [
    { name: 'حافظ اسمعیل', text: 'نبراس نے ہمیں قرآن کے ساتھ نظم، ذمہ داری اور عملی زندگی کا شعور بھی دیا۔' },
    { name: 'حافظ عرفان', text: 'اساتذہ کی شفقت اور مسلسل رہنمائی نے ہمارے اعتماد کو مضبوط کیا۔' },
    { name: 'وقار اسحاق', text: 'ادارے کا ماحول تعلیم کے ساتھ کردار سازی پر بھی توجہ دیتا ہے۔' },
    { name: 'احسان الٰہی ظہیر', text: 'دینی تربیت آج بھی میری زندگی کے فیصلوں میں رہنمائی کرتی ہے۔' },
    { name: 'حافظ اسد اللہ', text: 'حفظ، تجوید اور اخلاقی تربیت کا منظم انداز نمایاں خوبی ہے۔' },
    { name: 'حافظ ندیم', text: 'اساتذہ نے ہر طالب علم کی صلاحیت کو سمجھ کر توجہ دی۔' },
    { name: 'ضیااللہ', text: 'نبراس نے ہمیں علم کے ساتھ ادب، احترام اور خدمت سکھائی۔' },
    { name: 'محمد اقبال', text: 'مضبوط تعلیمی بنیاد نے آگے بڑھنے میں بہت مدد دی۔' },
    { name: 'حمزہ مقصود', text: 'منظم ماحول اور تربیتی نظام شخصیت کو نکھارتا ہے۔' },
    { name: 'عبدالسلام', text: 'نبراس سے وابستگی علمی اور روحانی طور پر قیمتی تجربہ رہی۔' }
  ];

  const existingTestimonialsCount = await prisma.testimonial.count();
  if (existingTestimonialsCount === 0) {
    for (let i = 0; i < testimonials.length; i++) {
      await prisma.testimonial.create({
        data: {
          student_name: testimonials[i].name,
          designation: 'سابق طالب علم',
          testimonial: testimonials[i].text,
          approved: true,
          display_order: i,
        },
      });
    }
    console.log('Testimonials seeded.');
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
