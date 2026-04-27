import Link from 'next/link';
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="nav-logo" style={{ marginBottom: '1rem' }}>
              <div className="nav-logo-icon">
    <Image 
      src="/logo-bg.png"
      alt="Masikio Logo"
      width={40}
      height={40}
      priority
    />
  </div>
            <div className="nav-logo-text">
              <span className="nav-logo-name">Masikio Adventures</span>
              <span className="nav-logo-sub">Maasai Mara · Est. 2012</span>
            </div>
          </div>
          <p>
            Nestled in the heart of the Maasai Mara, we offer authentic safari experiences blending luxury, culture, and wilderness. Your African dream begins here.
          </p>
          <div className="footer-social">
            <a href="#" className="footer-social-btn" aria-label="Facebook">f</a>
            <a href="#" className="footer-social-btn" aria-label="Instagram">ig</a>
            <a href="#" className="footer-social-btn" aria-label="Twitter">tw</a>
            <a href="#" className="footer-social-btn" aria-label="YouTube">yt</a>
          </div>
        </div>

        <div>
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/services">Our Services</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/booking">Book Safari</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Our Safaris</h4>
          <ul className="footer-links">
            <li><Link href="/services">Game Drives</Link></li>
            <li><Link href="/services">Balloon Safari</Link></li>
            <li><Link href="/services">Tented Camps</Link></li>
            <li><Link href="/services">Cultural Visits</Link></li>
            <li><Link href="/services">Walking Safaris</Link></li>
            <li><Link href="/services">Photography Tours</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4 className="footer-heading">Contact Us</h4>
          <p>📍 Masikio Adventures Camp<br />Maasai Mara, Narok County, Kenya</p>
          <p>📞 +254 712 345 678</p>
          <p>📞 +254 733 987 654</p>
          <p>✉️ info@masikioadventures.co.ke</p>
          <p>🕐 Open Daily: 6:00 AM – 8:00 PM EAT</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Masikio Adventures. All rights reserved.</p>
        <p>Crafted with ❤️ for the love of Africa</p>
      </div>
    </footer>
  );
}
