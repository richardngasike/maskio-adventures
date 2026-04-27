'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

const categories = ['All', 'Safari', 'Adventure', 'Accommodation', 'Culture', 'Dining', 'Transfer', 'Specialty'];

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`)
      .then(r => r.json())
      .then(data => {
        if (data.success) setServices(data.services);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  const formatPrice = (price) => `KES ${Number(price).toLocaleString('en-KE')}`;

  return (
    <>
      <Navbar />

      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: 'url(/images/services/services.png)' }} />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <div className="page-hero-breadcrumb">
            <a href="/">Home</a> <span>›</span> <span>Services</span>
          </div>
          <h1 className="page-hero-title">Our Safari Services</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="section-tag">What We Offer</span>
            <h2 className="section-title">Every Experience,\nPerfectly Crafted</h2>
            <p className="section-subtitle" style={{ margin: '0.75rem auto 0' }}>
              From heart-pounding encounters with the Big Five to peaceful evenings dining under a blanket of stars — the Mara offers it all, and so do we.
            </p>
          </div>

          {/* Category filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', justifyContent: 'center', marginBottom: '3rem' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '0.55rem 1.3rem',
                  borderRadius: '20px',
                  border: `1.5px solid ${activeCategory === cat ? 'var(--savannah-gold)' : 'var(--border)'}`,
                  background: activeCategory === cat ? 'var(--savannah-gold)' : 'transparent',
                  color: activeCategory === cat ? 'var(--white)' : 'var(--savannah-earth)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                  transition: 'all 0.25s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading-spinner"><div className="spinner" /></div>
          ) : (
            <div className="services-grid">
              {filtered.map(svc => (
                <div className="service-card" key={svc.id}>
                  <div className="service-card-img">
                    <img src={svc.image_url || '/images/services/default.jpg'} alt={svc.name} />
                    <span className="service-card-category">{svc.category}</span>
                  </div>
                  <div className="service-card-body">
                    <h3 className="service-card-title">{svc.name}</h3>
                    <p className="service-card-desc">{svc.description}</p>
                    <div className="service-card-meta">
                      <div>
                        <div className="service-card-price">
                          {formatPrice(svc.price)}
                        </div>
                        <div className="service-card-duration">
                          ⏱ {svc.duration}
                        </div>
                      </div>
                      <Link href="/booking" className="btn btn-dark" style={{ padding: '0.55rem 1.1rem', fontSize: '0.78rem' }}>
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--savannah-earth)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🦒</div>
              <p>No services found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Booking CTA */}
      <section className="cta-section">
        <div className="cta-bg" style={{ backgroundImage: 'url(/images/gallery/gallery5.png)' }} />
        <div className="cta-overlay" />
        <div className="cta-content">
          <span className="section-tag">Ready?</span>
          <h2>Mix & Match Your<br /><em style={{ fontStyle: 'italic', color: 'var(--savannah-amber)' }}>Perfect Safari Package</em></h2>
          <p>Select multiple services in our booking system and we'll calculate your total in Kenya Shillings instantly.</p>
          <div className="cta-actions">
            <Link href="/booking" className="btn btn-primary">Start Your Booking</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
