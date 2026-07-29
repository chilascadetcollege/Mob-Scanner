import { prisma } from '../prisma';

export async function getApprovedTestimonials() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { approved: true },
      orderBy: [
        { display_order: 'asc' },
        { created_at: 'desc' }
      ]
    });
    if (testimonials.length > 0) return testimonials;
  } catch (error) {
    console.error('Database connection failed for testimonials. Using fallback.');
  }

  // Graceful fallback
  return [
    { name: 'حافظ اسمعیل', text: 'نبراس نے ہمیں قرآن کے ساتھ نظم، ذمہ داری اور عملی زندگی کا شعور بھی دیا۔', role: 'سابق طالب علم' },
    { name: 'حافظ عرفان', text: 'اساتذہ کی شفقت اور مسلسل رہنمائی نے ہمارے اعتماد کو مضبوط کیا۔', role: 'سابق طالب علم' },
    { name: 'وقار اسحاق', text: 'ادارے کا ماحول تعلیم کے ساتھ کردار سازی پر بھی توجہ دیتا ہے۔', role: 'سابق طالب علم' },
    { name: 'احسان الٰہی ظہیر', text: 'دینی تربیت آج بھی میری زندگی کے فیصلوں میں رہنمائی کرتی ہے۔', role: 'سابق طالب علم' },
    { name: 'حافظ اسد اللہ', text: 'حفظ، تجوید اور اخلاقی تربیت کا منظم انداز نمایاں خوبی ہے۔', role: 'سابق طالب علم' },
    { name: 'حافظ ندیم', text: 'اساتذہ نے ہر طالب علم کی صلاحیت کو سمجھ کر توجہ دی۔', role: 'سابق طالب علم' },
    { name: 'ضیااللہ', text: 'نبراس نے ہمیں علم کے ساتھ ادب، احترام اور خدمت سکھائی۔', role: 'سابق طالب علم' },
    { name: 'محمد اقبال', text: 'مضبوط تعلیمی بنیاد نے آگے بڑھنے میں بہت مدد دی۔', role: 'سابق طالب علم' },
    { name: 'حمزہ مقصود', text: 'منظم ماحول اور تربیتی نظام شخصیت کو نکھارتا ہے۔', role: 'سابق طالب علم' },
    { name: 'عبدالسلام', text: 'نبراس سے وابستگی علمی اور روحانی طور پر قیمتی تجربہ رہی۔', role: 'سابق طالب علم' }
  ].map((t, index) => ({
    id: index,
    student_name: t.name,
    designation: t.role,
    testimonial: t.text,
    photo: null,
    approved: true,
    display_order: index,
    created_at: new Date(),
    updated_at: new Date()
  }));
}
