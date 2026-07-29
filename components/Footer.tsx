"use client";
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
}