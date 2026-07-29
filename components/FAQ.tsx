export default function FAQ({ settings }: { settings: any }) {
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
}