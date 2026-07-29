import { prisma } from '../prisma';

export async function getActiveAnnouncements() {
  try {
    const now = new Date();
    const announcements = await prisma.announcement.findMany({
      where: {
        status: 'ACTIVE',
        OR: [
          { starts_at: null, ends_at: null },
          { starts_at: { lte: now }, ends_at: null },
          { starts_at: null, ends_at: { gte: now } },
          { starts_at: { lte: now }, ends_at: { gte: now } }
        ]
      },
      orderBy: [
        { display_order: 'asc' },
        { created_at: 'desc' }
      ]
    });
    if (announcements.length > 0) return announcements;
  } catch (error) {
    console.error('Database connection failed for announcements. Using fallback.');
  }

  // Graceful fallback
  return [
    {
      id: 0,
      title: 'خوش آمدید',
      message: 'نبراس میں خوش آمدید! معیاری تعلیم، پیشہ ورانہ تربیت اور روشن مستقبل کی جانب آپ کا پہلا قدم۔',
      status: 'ACTIVE',
      display_order: 0,
      starts_at: null,
      ends_at: null,
      created_at: new Date(),
      updated_at: new Date()
    }
  ];
}
