import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'نبراس ایجوکیشنل سسٹم | Nibras Hadith College',
  description: 'نبراس ایجوکیشنل سسٹم — دینی و عصری تعلیم کا معیاری ادارہ',
  themeColor: '#5b4a3d',
  openGraph: {
    title: 'نبراس ایجوکیشنل سسٹم | Nibras Hadith College',
    description: 'نبراس ایجوکیشنل سسٹم — دینی و عصری تعلیم کا معیاری ادارہ',
    url: 'https://nibras-educational-system.vercel.app',
    siteName: 'Nibras Educational System',
    locale: 'ur_PK',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ur" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@500;600;700&family=Noto+Sans+Arabic:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
