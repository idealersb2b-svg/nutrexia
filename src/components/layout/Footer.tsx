export default function Footer() {
  return (
    <footer>
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <img src="/logo.png" alt="Nutrexia logo" />
          <p>The climate-smart breakfast that keeps up with you. Sourced with respect, tested with rigor, blended for performance.</p>
        </div>
        <div className="foot-col">
          <h5>Shop</h5>
          <a href="#shop">Trial Pack</a>
          <a href="#shop">1kg Pouch</a>
          <a href="#shop">Subscribe & Save</a>
        </div>
        <div className="foot-col">
          <h5>Explore</h5>
          <a href="#nutrition">Lab Reports</a>
          <a href="#story">Our Story</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="foot-col">
          <h5>Legal</h5>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Refund Policy</a>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>© 2026 Carbin Naturals. All rights reserved.</span>
        <span>Made with 🌍 in India.</span>
      </div>
    </footer>
  );
}
