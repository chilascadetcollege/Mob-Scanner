import Link from 'next/link';

export default function Header({ settings }: { settings: any }) {
  return (
    <nav className="nav">
      <div className="container navin">
        <Link className="brand" href="#home">
          <img src={settings?.logo || '/logo.jpeg'} className="logo" alt="نبراس مونوگرام" />
          <span><strong>{settings?.website_name || 'نبراس ایجوکیشنل سسٹم'}</strong></span>
        </Link>
        <div className="links">
          <a href="#about">تعارف</a>
          <a href="#departments">شعبہ جات</a>
          <a href="#principal">پرنسپل کا پیغام</a>
          <a href="#testimonials">تبصرے</a>
          <a href="#faq">سوالات</a>
          <a href="#contact">معلومات حاصل کریں</a>
        </div>
      </div>
    </nav>
  );
}