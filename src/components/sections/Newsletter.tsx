export default function Newsletter() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="news">
          <h3>The Climate-Smart Breakfast Club</h3>
          <p>Get early access to new batches, millet recipes, and exclusive founder updates.</p>
          <div className="news-form">
            <input type="email" placeholder="Enter your email address" />
            <button>Join the club</button>
          </div>
        </div>
      </div>
    </section>
  );
}
