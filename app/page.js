import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroCarousel from '../components/HeroCarousel';
import Link from 'next/link';

const featuredServices = [
  { icon: '🚙', title: 'Land Cruiser Game Drives', desc: 'Full-day and half-day drives with expert Mara guides in custom safari vehicles.', price: 'From KES 25,000', image: '/images/services/game-drive.jpeg', cat: 'Safari' },
  { icon: '🎈', title: 'Hot Air Balloon Safari', desc: 'Drift above the Mara plains at sunrise with a champagne bush breakfast.', price: 'From KES 45,000', image: '/images/services/balloon.png', cat: 'Adventure' },
  { icon: '🏕️', title: 'Luxury Tented Camp', desc: 'Sleep under canvas in fully furnished tents with en-suite and solar power.', price: 'From KES 15,000', image: '/images/services/tent-camp.png', cat: 'Accommodation' },
  { icon: '🪘', title: 'Maasai Cultural Visit', desc: 'Authentic village experience with traditional dances, crafts, and storytelling.', price: 'From KES 4,500', image: '/images/services/maasai-culture.png', cat: 'Culture' },
  { icon: '🚶', title: 'Walking Safari', desc: 'Trek through the bush on foot guided by armed Maasai warriors.', price: 'From KES 5,500', image: '/images/services/walking.png', cat: 'Adventure' },
  { icon: '🌅', title: 'Bush Sundowner Dinner', desc: 'Gourmet African cuisine under the stars with lanterns and live music.', price: 'From KES 7,500', image: '/images/services/sundowner.png', cat: 'Dining' },
];

const whyUs = [
  { icon: '🦁', title: 'Expert Guides', desc: 'Our KWS-certified guides have 15+ years tracking wildlife in the Mara ecosystem.' },
  { icon: '🏕️', title: 'Luxury Comfort', desc: 'Premium tents with real beds, hot showers, and gourmet meals in the wilderness.' },
  { icon: '📸', title: 'Best Locations', desc: 'We know every crossing point, watering hole, and den in the Mara.' },
  { icon: '🌍', title: 'Eco-Responsible', desc: 'Low-impact camping with community partnerships supporting Maasai livelihoods.' },
  { icon: '🛡️', title: 'Safety First', desc: 'Fully insured, first-aid trained, satellite-connected on every safari.' },
  { icon: '✈️', title: 'Full Transfers', desc: 'Seamless Nairobi to Mara 4WD transfers and airstrip pickups arranged.' },
];

const testimonials = [
  { name: 'Sarah Mitchell', origin: 'London, UK', stars: '★★★★★', text: 'Masikio exceeded every expectation. Woke up to elephants outside our tent, saw a lion kill at sunrise, and the Maasai dinner was magical. Best trip of our lives.' },
  { name: 'David & Anna Chen', origin: 'Sydney, Australia', stars: '★★★★★', text: 'The balloon safari was absolutely breathtaking. Our guide Emmanuel knew the land like his own backyard — we spotted all Big Five in two days!' },
  { name: 'Amara Osei', origin: 'Accra, Ghana', stars: '★★★★★', text: 'As an African myself, I was amazed how they blend authenticity with luxury. The cultural visit to the Maasai village was deeply moving and educational.' },
];

const galleryNums = [1, 2, 3, 4, 5, 6, 7, 8];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroCarousel />
      {/* Info Strip */}
      <div className="info-strip">
        <div className="info-strip-item">📍 Maasai Mara National Reserve, Kenya</div>
        <div className="info-strip-item">📞 +254 712 345 678</div>
        <div className="info-strip-item">✉️ info@masikioadventures.co.ke</div>
        <div className="info-strip-item">🕐 Open Daily · 6AM – 8PM</div>
      </div>
      {/* About Preview */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-images">
              <div className="about-img-main">
                <img src="/images/gallery/jeep.png" alt="Safari at Masikio Adventures" />
              </div>
              <div className="about-img-secondary">
                <img src="/images/about/about-hero.jpeg" alt="Tourists" />
              </div>
              <div className="about-badge">
                <span className="about-badge-num">12+</span>
                <span className="about-badge-text">Years in the Mara</span>
              </div>
            </div>

            <div>
              <span className="section-tag">Our Story</span>
              <h2 className="section-title">Born from the<br />Heart of Africa</h2>
              <p className="section-subtitle">
                Masikio Adventures was founded in 2012 by Peter — a Kenyan naturalist who grew up walking the Mara. Today, we welcome hundreds of guests from across the world to discover Kenya's most iconic wilderness.
              </p>
              <p style={{ marginTop: '1rem', color: 'var(--savannah-earth)', fontSize: '0.95rem', lineHeight: '1.8' }}>
                We operate with deep respect for the land, the wildlife, and the Maasai community who call this place home. Our camps are solar-powered, our partnerships are local, and our guides are among the finest in East Africa.
              </p>

              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-num">2,400+</span>
                  <span className="stat-label">Guests Hosted</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">98%</span>
                  <span className="stat-label">Satisfaction Rate</span>
                </div>
                <div className="stat-item">
                  <span className="stat-num">47+</span>
                  <span className="stat-label">Countries Served</span>
                </div>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/about" className="btn btn-primary">Our Full Story</Link>
                <Link href="/contact" className="btn btn-dark">Get In Touch</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">What We Offer</span>
            <h2 className="section-title">Safari Experiences<br />Crafted for You</h2>
            <p className="section-subtitle" style={{ margin: '0.75rem auto 0' }}>
              From thrilling game drives to cultural immersion and luxurious bush dining — every moment at Masikio is designed to connect you with the real Africa.
            </p>
          </div>
          <div className="services-grid">
            {featuredServices.map((svc, i) => (
              <div className="service-card" key={i}>
                <div className="service-card-img">
                  <img src={svc.image} alt={svc.title} />
                  <span className="service-card-category">{svc.cat}</span>
                </div>
                <div className="service-card-body">
                  <h3 className="service-card-title">{svc.icon} {svc.title}</h3>
                  <p className="service-card-desc">{svc.desc}</p>
                  <div className="service-card-meta">
                    <span className="service-card-price">{svc.price}</span>
                    <Link href="/booking" className="btn btn-dark" style={{ padding: '0.5rem 1.2rem', fontSize: '0.78rem' }}>
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/services" className="btn btn-primary">View All Services</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section dark-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-tag">Why Masikio</span>
            <h2 className="section-title light">The Masikio Difference</h2>
          </div>
          <div className="features-grid">
            {whyUs.map((f, i) => (
              <div className="feature-card" key={i}>
                <span className="feature-icon">{f.icon}</span>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="section-tag">Photo Gallery</span>
              <h2 className="section-title">Life in the Mara</h2>
            </div>
            <Link href="/gallery" className="btn btn-dark">View Full Gallery</Link>
          </div>
          <div className="gallery-grid">
            {galleryNums.map(n => (
              <div className="gallery-item" key={n}>
                <img src={`/images/gallery/gallery${n}.jpg`} alt={`Gallery photo ${n}`} />
                <div className="gallery-item-overlay">
                  <span>🔍</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag">Guest Reviews</span>
            <h2 className="section-title">Stories from the Mara</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-stars">{t.stars}</div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.name[0]}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-origin">{t.origin}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-bg" style={{ backgroundImage: 'url(/images/services/services.png)' }} />
        <div className="cta-overlay" />
        <div className="cta-content">
          <span className="section-tag">Ready to Go Wild?</span>
          <h2>Your African Safari<br /><em style={{ fontStyle: 'italic', color: 'var(--savannah-amber)' }}>Begins Today</em></h2>
          <p>Let our team craft the perfect itinerary for your dream Mara experience. No two safaris are the same.</p>
          <div className="cta-actions">
            <Link href="/booking" className="btn btn-primary">Book Your Safari</Link>
            <Link href="/contact" className="btn btn-outline">Talk to an Expert</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
