export default function PrincipalMessage({ message }: { message: string }) {
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
}