import { prisma } from '../prisma';

export async function getPrincipalMessage() {
  try {
    const message = await prisma.principalMessage.findUnique({
      where: { key: 'main' }
    });
    if (message) return message;
  } catch (error) {
    console.error('Database connection failed for principal message. Using fallback.');
  }

  // Graceful fallback
  return {
    message: 'ہماری کوشش ہے کہ ہر طالب علم قرآن و سنت کی روشنی میں علم، کردار اور اعلیٰ اخلاق کے ساتھ پروان چڑھے۔ ہم تعلیم کو صرف کتابی معلومات نہیں بلکہ شخصیت سازی، عملی تربیت اور ذمہ دار زندگی کا ذریعہ سمجھتے ہیں۔ اساتذہ کی محنت اور والدین کے اعتماد کے ساتھ ہم ہر بچے کی صلاحیت کو نکھارنے کے لیے کوشاں ہیں۔ ہمارا مقصد ایسے باکردار اور باصلاحیت افراد تیار کرنا ہے جو معاشرے کے لیے مفید ثابت ہوں۔'
  };
}
