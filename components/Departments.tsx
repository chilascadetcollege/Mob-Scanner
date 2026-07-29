export default function Departments() {
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
}