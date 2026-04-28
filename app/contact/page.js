'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus('');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
    setSending(false);
  };

  return (
    <>
      <Navbar />

      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: 'url(/images/hero/hero5.jpeg)' }} />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <div className="page-hero-breadcrumb">
            <a href="/">Home</a> <span>›</span> <span>Contact Us</span>
          </div>
          <h1 className="page-hero-title">Get In Touch</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Info */}
            <div>
              <span className="section-tag">We're Here for You</span>
              <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Let's Plan Your Safari</h2>
              <p style={{ color: 'var(--savannah-earth)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                Have questions about our packages? Need a custom itinerary? Want to know the best time to see the wildebeest migration? Our team is ready to help you craft your perfect Kenya adventure.
              </p>
              <div className="contact-info-item">
                <div className="contact-info-icon">📍</div>
                <div>
                  <div className="contact-info-label">Camp Location</div>
                  <div className="contact-info-value">
                    Masikio Adventures Camp<br />
                    Maasai Mara National Reserve<br />
                    Narok County, Kenya
                  </div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">📞</div>
                <div>
                  <div className="contact-info-label">Call / WhatsApp</div>
                  <div className="contact-info-value">
                    +254 712 345 678<br />
                    +254 733 987 654
                  </div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">✉️</div>
                <div>
                  <div className="contact-info-label">Email Us</div>
                  <div className="contact-info-value">
                    info@masikioadventures.co.ke<br />
                    bookings@masikioadventures.co.ke
                  </div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">🕐</div>
                <div>
                  <div className="contact-info-label">Operating Hours</div>
                  <div className="contact-info-value">
                    Daily: 6:00 AM – 8:00 PM EAT<br />
                    Camp check-in: 12:00 PM – 4:00 PM
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div style={{
                marginTop: '2rem',
                height: '220px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                background: 'var(--savannah-sand)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1.5px solid var(--border)',
                fontSize: '3rem',
                flexDirection: 'column',
                gap: '0.5rem',
              }}>
                <span>🗺️</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--savannah-earth)' }}>Maasai Mara, Kenya</span>
                <a
                  href="https://maps.google.com/?q=Masai+Mara+National+Reserve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-dark"
                  style={{ fontSize: '0.8rem', padding: '0.5rem 1.2rem', marginTop: '0.5rem' }}
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="booking-form-wrap">
              <h3 className="form-section-title">✉️ Send Us a Message</h3>

              {status === 'success' && (
                <div className="alert alert-success">
                  ✅ Message sent! We'll respond within 24 hours. Asante sana!
                </div>
              )}
              {status === 'error' && (
                <div className="alert alert-error">
                  ❌ Something went wrong. Please try again or call us directly.
                </div>
              )}

              <div className="form-row">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith" required />
                </div>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@email.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <select name="subject" value={form.subject} onChange={handleChange}>
                  <option value="">Select a topic...</option>
                  <option>Safari Booking Enquiry</option>
                  <option>Package Customization</option>
                  <option>Group Booking (6+ guests)</option>
                  <option>Honeymoon / Special Occasion</option>
                  <option>Photography Safari</option>
                  <option>Transfer & Logistics</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your dream safari — dates, group size, interests, budget..."
                  style={{ minHeight: '160px' }}
                  required
                />
              </div>
              <button
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '1rem' }}
                onClick={handleSubmit}
                disabled={sending}
              >
                {sending ? '⏳ Sending...' : '✉️ Send Message'}
              </button>

              <div style={{
                marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)',
                display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'
              }}>
                <a href="tel:+254712345678" className="btn btn-dark" style={{ fontSize: '0.85rem' }}>
                  📞 Call Us Now
                </a>
                <a href="https://wa.me/254712345678" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
