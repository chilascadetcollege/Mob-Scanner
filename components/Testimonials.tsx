export default function Testimonials({ testimonials }: { testimonials: any[] }) {
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
}