"use client";
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
}