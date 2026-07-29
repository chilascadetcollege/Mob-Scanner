const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}

const files = {
  'Header.tsx': `import Link from 'next/link';

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
}`,

  'Hero.tsx': `export default function Hero() {
  return (
    <header className="hero" id="home">
      <div className="container hero-grid">
        <div>
          <div className="ey">دینی و عصری تعلیم کا بااعتماد ادارہ</div>
          <h1>علم کے ساتھ کردار،<br/>تربیت کے ساتھ مستقبل</h1>
          <p>قرآنِ کریم، تجوید، حفظ، بنیادی دینیات، اخلاقی تربیت اور عصری تعلیم کا متوازن نظام۔</p>
        </div>
        <div className="hero-card">
          <div className="quote">“تم میں سب سے بہتر وہ ہے جو قرآن سیکھے اور سکھائے”</div>
          <div className="mini-grid">
            <div className="mini"><b>قرآنی تعلیم</b>ناظرہ، تجوید اور حفظ</div>
            <div className="mini"><b>کردار سازی</b>ادب، اخلاق اور نظم</div>
            <div className="mini"><b>عصری مضامین</b>مستقبل سے ہم آہنگ</div>
            <div className="mini"><b>محفوظ ماحول</b>اعتماد اور نگرانی</div>
          </div>
        </div>
      </div>
    </header>
  );
}`,

  'About.tsx': `export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="head">
          <span>ہمارا تعارف</span>
          <h2>روایت، تربیت اور جدید تعلیم کا حسین امتزاج</h2>
          <p>طلبہ کی علمی، روحانی اور اخلاقی نشوونما ہماری بنیادی ترجیح ہے۔</p>
        </div>
        <div className="split">
          <div>
            <h2>ایک ایسا ادارہ جہاں تعلیم زندگی بنتی ہے</h2>
            <p>تدریس کا مقصد صرف نصاب مکمل کرنا نہیں بلکہ طالب علم کی شخصیت سنوارنا ہے۔</p>
            <div className="checks">
              <div className="check"><i>✓</i>قرآن کی درست ادائیگی</div>
              <div className="check"><i>✓</i>عمر کے مطابق تدریس</div>
              <div className="check"><i>✓</i>والدین سے مناسب رابطہ</div>
            </div>
          </div>
          <div className="panel">
            <h2>ہماری ترجیح</h2>
            <p>محبت، نظم، احترام اور اعتماد کے ساتھ سیکھنے کا ماحول۔</p>
          </div>
        </div>
      </div>
    </section>
  );
}`,

  'Departments.tsx': `export default function Departments() {
  return (
    <section id="departments" style={{ background: '#f2ece5' }}>
      <div className="container">
        <div className="head">
          <span>شعبہ جات</span>
          <h2>جامع تعلیمی نظام</h2>
        </div>
        <div className="cards">
          <div className="card"><h3>ناظرہ و تجوید</h3><p>صحیح مخارج اور قواعدِ تجوید۔</p></div>
          <div className="card"><h3>حفظ القرآن</h3><p>سبق، سبقی اور منزل کا منظم نظام۔</p></div>
          <div className="card"><h3>بنیادی دینیات</h3><p>عقائد، عبادات، سیرت اور دعائیں۔</p></div>
          <div className="card"><h3>اخلاقی تربیت</h3><p>ادب، احترام اور ذمہ داری۔</p></div>
          <div className="card"><h3>عصری تعلیم</h3><p>دورِ حاضر سے ہم آہنگ مضامین۔</p></div>
          <div className="card"><h3>شخصیت سازی</h3><p>اعتماد، گفتگو اور مثبت عادات۔</p></div>
        </div>
      </div>
    </section>
  );
}`,

  'PrincipalMessage.tsx': `export default function PrincipalMessage({ message }: { message: string }) {
  return (
    <section className="principal" id="principal">
      <div className="container">
        <div className="principal-card">
          <div className="message">
            <span className="msg-badge">پرنسپل کا پیغام</span>
            <div className="msg-lines">
              <p>{message}</p>
            </div>
            <div className="signature-wrap">
              <div className="signature">
                <strong>جناب ساجد محمود صاحب</strong>
                <span>پرنسپل، نبراس ایجوکیشنل سسٹم</span>
              </div>
            </div>
          </div>
          <div className="portrait">
            <img src="/logo.jpeg" alt="نبراس مونوگرام" />
          </div>
        </div>
      </div>
    </section>
  );
}`,

  'Testimonials.tsx': `export default function Testimonials({ testimonials }: { testimonials: any[] }) {
  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <div className="head">
          <span>سابقہ طلباء کی آراء</span>
          <h2>نبراس سے وابستہ یادیں اور تاثرات</h2>
        </div>
        <div className="review-window">
          <div className="review-track" id="reviewTrack">
            <div className="review-group" id="groupA">
              {testimonials.map((t, i) => (
                <article key={i} className="review">
                  <p>{t.testimonial}</p>
                  <strong>{t.student_name}</strong>
                  <span>{t.designation || 'سابق طالب علم'}</span>
                </article>
              ))}
            </div>
            <div className="review-group" id="groupB" aria-hidden="true">
              {testimonials.map((t, i) => (
                <article key={i} className="review">
                  <p>{t.testimonial}</p>
                  <strong>{t.student_name}</strong>
                  <span>{t.designation || 'سابق طالب علم'}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}`,

  'ContactForm.tsx': `"use client";
import { useState } from 'react';

export default function ContactForm({ settings }: { settings: any }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('فارم جمع کرانے میں مسئلہ پیش آیا۔');
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <div className="head">
          <span>رابطہ و معلومات</span>
          <h2>مزید معلومات حاصل کریں</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <h2>{settings?.website_name || 'نبراس ایجوکیشنل سسٹم'}</h2>
            <p>مقام، نصاب اور دیگر معلومات کے لیے فارم مکمل کریں۔</p>
            <p>واٹس ایپ: <b className="phone-number">{settings?.phone || '0300-4849484'}</b></p>
          </div>
          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="field">
                  <label>نام</label>
                  <input name="name" required />
                </div>
                <div className="field">
                  <label>فون</label>
                  <input name="phone" />
                </div>
                <div className="field full">
                  <label>موضوع</label>
                  <select name="subject">
                    <option>تعلیمی معلومات</option>
                    <option>مقام کی معلومات</option>
                    <option>دیگر سوال</option>
                  </select>
                </div>
                <div className="field full">
                  <label>پیغام</label>
                  <textarea name="message" required></textarea>
                </div>
              </div>
              {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
              {success && <p style={{ color: 'green', marginTop: '1rem' }}>آپ کا پیغام کامیابی سے بھیج دیا گیا ہے۔</p>}
              <button className="btn primary" type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
                {loading ? 'بھیج رہا ہے...' : 'معلومات بھیجیں'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}`,

  'FAQ.tsx': `export default function FAQ({ settings }: { settings: any }) {
  return (
    <section id="faq">
      <div className="container">
        <div className="head">
          <span>عمومی سوالات</span>
          <h2>اکثر پوچھے جانے والے سوالات</h2>
        </div>
        <div className="faq">
          <details>
            <summary>کیا داخلے جاری ہیں؟</summary>
            <p>فی الحال داخلے جاری نہیں ہیں۔</p>
          </details>
          <details>
            <summary>معلومات کیسے حاصل ہوں گی؟</summary>
            <p>نیچے موجود فارم یا فلوٹنگ واٹس ایپ استعمال کریں۔</p>
          </details>
          <details>
            <summary>پرنسپل کون ہیں؟</summary>
            <p>جناب ساجد محمود صاحب۔</p>
          </details>
        </div>
      </div>
    </section>
  );
}`,

  'Footer.tsx': `"use client";
import { useEffect, useState } from 'react';

export default function Footer({ settings }: { settings: any }) {
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3>{settings?.website_name || 'نبراس ایجوکیشنل سسٹم'}</h3>
            <p>{settings?.footer_text || 'دینی و عصری تعلیم اور کردار سازی کا ادارہ۔'}</p>
          </div>
          <div>
            <h3>اہم روابط</h3>
            <a href="#about">تعارف</a>
            <a href="#departments">شعبہ جات</a>
          </div>
          <div>
            <h3>ہماری پہچان</h3>
            <span>قرآنی تعلیم</span><br/>
            <span>اخلاقی تربیت</span>
          </div>
        </div>
        <div className="copy">
          © <span id="year">{year}</span> {settings?.website_name || 'نبراس ایجوکیشنل سسٹم'} <span className="powered-by">&nbsp;&nbsp;|&nbsp;&nbsp; Powered by <a href="https://vertexsolve.com" target="_blank" rel="noreferrer">VertexSolve</a></span>
        </div>
      </div>
    </footer>
  );
}`,

  'WhatsAppButton.tsx': `export default function WhatsAppButton({ settings }: { settings: any }) {
  const wa = settings?.whatsapp || '923004849484';
  return (
    <a className="wa" href={\`https://wa.me/\${wa}\`} target="_blank" aria-label="واٹس ایپ" rel="noreferrer">
      <svg viewBox="0 0 32 32">
        <path d="M19.11 17.21c-.26-.13-1.52-.75-1.76-.84-.24-.09-.41-.13-.58.13-.17.26-.67.84-.82 1.01-.15.17-.3.19-.56.06-.26-.13-1.08-.4-2.06-1.27-.76-.68-1.27-1.51-1.42-1.77-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.8-1.92-.21-.5-.43-.43-.58-.44h-.5c-.17 0-.45.06-.69.32-.24.26-.91.89-.91 2.17s.93 2.52 1.06 2.69c.13.17 1.83 2.8 4.44 3.93.62.27 1.1.43 1.48.55.62.2 1.19.17 1.64.1.5-.08 1.52-.62 1.73-1.22.22-.6.22-1.12.15-1.22-.06-.11-.24-.17-.5-.3zM16.03 4.8c-6.16 0-11.17 5.01-11.17 11.17 0 1.97.51 3.9 1.49 5.59L4.77 27.2l5.77-1.51a11.13 11.13 0 0 0 5.49 1.4h.01c6.16 0 11.17-5.01 11.17-11.17S22.19 4.8 16.03 4.8zm0 20.4h-.01a9.24 9.24 0 0 1-4.71-1.29l-.34-.2-3.42.9.91-3.34-.22-.34a9.23 9.23 0 1 1 7.79 4.27z"/>
      </svg>
    </a>
  );
}`,

  'AiAgentWidget.tsx': `"use client";
import Script from 'next/script';

export default function AiAgentWidget({ settings }: { settings: any }) {
  const aiSettings = settings?.ai_agent_settings || {};
  const tenantId = aiSettings.tenant_id || 'tenant_7KVx7XX7RM';
  const agentId = aiSettings.agent_id || 'ag_8f7995f9178e4a37a96d1088c3725392';

  if (!tenantId || !agentId) return null;

  return (
    <Script
      src={\`https://agent.vertexsolve.com/wp-content/plugins/AI%20Agent/assets/js/widget.js?id=\${tenantId}&agent_id=\${agentId}&v=1785269000\`}
      strategy="lazyOnload"
    />
  );
}`
};

for (const [filename, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(componentsDir, filename), content);
}
console.log('Components created successfully.');
