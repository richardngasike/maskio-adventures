'use client';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const formatKES = (amount) => `KES ${Number(amount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;

export default function BookingPage() {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState({}); // { id: quantity }
  const [form, setForm] = useState({
    guest_name: '', guest_email: '', guest_phone: '',
    nationality: '', check_in: '', check_out: '',
    num_guests: 1, special_requests: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/services`)
      .then(r => r.json())
      .then(data => { if (data.success) setServices(data.services); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const toggleService = (svc) => {
    setSelectedServices(prev => {
      const updated = { ...prev };
      if (updated[svc.id]) {
        delete updated[svc.id];
      } else {
        updated[svc.id] = { quantity: 1, price: parseFloat(svc.price), name: svc.name };
      }
      return updated;
    });
  };

  const changeQty = (id, delta) => {
    setSelectedServices(prev => {
      const updated = { ...prev };
      if (!updated[id]) return updated;
      const newQty = updated[id].quantity + delta;
      if (newQty <= 0) { delete updated[id]; return updated; }
      updated[id] = { ...updated[id], quantity: newQty };
      return updated;
    });
  };

  const totalAmount = Object.values(selectedServices).reduce(
    (sum, s) => sum + s.price * s.quantity, 0
  );

  const nights = form.check_in && form.check_out
    ? Math.max(0, Math.ceil((new Date(form.check_out) - new Date(form.check_in)) / 86400000))
    : 0;

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setError('');
    if (!form.guest_name || !form.guest_email || !form.check_in || !form.check_out) {
      setError('Please fill in all required fields (Name, Email, Check-in, Check-out).');
      return;
    }
    if (Object.keys(selectedServices).length === 0) {
      setError('Please select at least one service.');
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        services: Object.entries(selectedServices).map(([id, s]) => ({
          service_id: parseInt(id),
          quantity: s.quantity
        }))
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(data.booking);
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setSubmitting(false);
  };

  // Group services by category
  const grouped = services.reduce((acc, svc) => {
    if (!acc[svc.category]) acc[svc.category] = [];
    acc[svc.category].push(svc);
    return acc;
  }, {});

  return (
    <>
      <Navbar />

      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: 'url(/images/gallery/jeep.png)' }} />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <div className="page-hero-breadcrumb">
            <a href="/">Home</a> <span>›</span> <span>Book Your Safari</span>
          </div>
          <h1 className="page-hero-title">Book Your Safari</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {success ? (
            /* Success modal */
            <div className="modal-overlay">
              <div className="modal-box">
                <div className="modal-icon">🦁</div>
                <h2 className="modal-title">Safari Booked!</h2>
                <p style={{ color: 'var(--savannah-earth)', marginBottom: '0.5rem' }}>Your booking reference is:</p>
                <div className="modal-ref">{success.booking_ref}</div>
                <div className="modal-text">
                  <strong>Please save this reference number.</strong><br />
                  A confirmation will be sent to <strong>{success.guest_email}</strong>.<br />
                  Our team will contact you within 24 hours to confirm your safari arrangements.
                </div>
                <div style={{ background: 'var(--savannah-cream)', borderRadius: 'var(--radius)', padding: '1rem', marginBottom: '1.5rem', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--savannah-earth)', fontSize: '0.85rem' }}>Guest</span>
                    <strong>{success.guest_name}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--savannah-earth)', fontSize: '0.85rem' }}>Check-in</span>
                    <strong>{success.check_in}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--savannah-earth)', fontSize: '0.85rem' }}>Total</span>
                    <strong style={{ color: 'var(--savannah-gold)' }}>{formatKES(success.total_amount)}</strong>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button className="btn btn-primary" onClick={() => { setSuccess(null); setSelectedServices({}); setForm({ guest_name:'',guest_email:'',guest_phone:'',nationality:'',check_in:'',check_out:'',num_guests:1,special_requests:'' }); }}>
                    New Booking
                  </button>
                  <a href="/" className="btn btn-dark">Back to Home</a>
                </div>
              </div>
            </div>
          ) : (
            <div className="booking-layout">
              {/* FORM */}
              <div>
                {error && (
                  <div className="alert alert-error">⚠️ {error}</div>
                )}

                {/* Guest Details */}
                <div className="booking-form-wrap" style={{ marginBottom: '1.75rem' }}>
                  <h3 className="form-section-title">👤 Guest Information</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input name="guest_name" value={form.guest_name} onChange={handleChange} placeholder="Jane Smith" />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input name="guest_email" type="email" value={form.guest_email} onChange={handleChange} placeholder="jane@email.com" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone / WhatsApp</label>
                      <input name="guest_phone" value={form.guest_phone} onChange={handleChange} placeholder="+254 700 000 000" />
                    </div>
                    <div className="form-group">
                      <label>Nationality</label>
                      <input name="nationality" value={form.nationality} onChange={handleChange} placeholder="e.g. British" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Check-in Date *</label>
                      <input name="check_in" type="date" value={form.check_in} onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="form-group">
                      <label>Check-out Date *</label>
                      <input name="check_out" type="date" value={form.check_out} onChange={handleChange} min={form.check_in || new Date().toISOString().split('T')[0]} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Number of Guests</label>
                      <select name="num_guests" value={form.num_guests} onChange={handleChange}>
                        {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} Guest{n>1?'s':''}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Special Requests</label>
                    <textarea name="special_requests" value={form.special_requests} onChange={handleChange} placeholder="Dietary requirements, celebration, accessibility needs, etc." />
                  </div>
                </div>

                {/* Services Selection */}
                <div className="booking-form-wrap">
                  <h3 className="form-section-title">🦁 Select Your Experiences</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--savannah-earth)', marginBottom: '1.5rem' }}>
                    Choose one or more services. Prices are per person per session in Kenya Shillings.
                  </p>

                  {loading ? (
                    <div className="loading-spinner"><div className="spinner" /></div>
                  ) : (
                    Object.entries(grouped).map(([cat, svcs]) => (
                      <div key={cat} style={{ marginBottom: '1.75rem' }}>
                        <div style={{
                          fontSize: '0.72rem', fontWeight: '700', letterSpacing: '0.2em',
                          textTransform: 'uppercase', color: 'var(--savannah-gold)',
                          marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
                        }}>
                          <span style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                          {cat}
                          <span style={{ flex: 3, height: '1px', background: 'var(--border)' }} />
                        </div>
                        <div className="services-selector">
                          {svcs.map(svc => {
                            const isSelected = !!selectedServices[svc.id];
                            return (
                              <div key={svc.id}>
                                <div
                                  className={`service-select-item ${isSelected ? 'selected' : ''}`}
                                  onClick={() => toggleService(svc)}
                                >
                                  <div className="service-select-checkbox">
                                    {isSelected && '✓'}
                                  </div>
                                  <div className="service-select-info">
                                    <div className="service-select-name">{svc.name}</div>
                                    <div className="service-select-category">⏱ {svc.duration}</div>
                                  </div>
                                  <div className="service-select-price">{formatKES(svc.price)}</div>
                                </div>
                                {isSelected && (
                                  <div style={{ padding: '0.5rem 1rem', background: 'var(--savannah-cream)', borderLeft: '2px solid var(--savannah-gold)', marginTop: '-1px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '0.82rem', color: 'var(--savannah-earth)' }}>Quantity:</span>
                                    <div className="quantity-control">
                                      <button className="qty-btn" onClick={(e) => { e.stopPropagation(); changeQty(svc.id, -1); }}>−</button>
                                      <span className="qty-display">{selectedServices[svc.id]?.quantity}</span>
                                      <button className="qty-btn" onClick={(e) => { e.stopPropagation(); changeQty(svc.id, 1); }}>+</button>
                                    </div>
                                    <span style={{ fontSize: '0.82rem', color: 'var(--savannah-gold)', fontWeight: '700', marginLeft: 'auto' }}>
                                      = {formatKES(selectedServices[svc.id]?.price * selectedServices[svc.id]?.quantity)}
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* ORDER SUMMARY */}
              <div className="order-summary">
                <h3 className="summary-title">🧾 Booking Summary</h3>

                {/* Dates */}
                {(form.check_in || form.check_out) && (
                  <>
                    <div className="summary-dates">
                      {form.check_in && (
                        <div className="summary-date-row">
                          <span className="summary-date-label">Check-in</span>
                          <span className="summary-date-val">{new Date(form.check_in).toLocaleDateString('en-KE', { day:'numeric',month:'short',year:'numeric' })}</span>
                        </div>
                      )}
                      {form.check_out && (
                        <div className="summary-date-row">
                          <span className="summary-date-label">Check-out</span>
                          <span className="summary-date-val">{new Date(form.check_out).toLocaleDateString('en-KE', { day:'numeric',month:'short',year:'numeric' })}</span>
                        </div>
                      )}
                      {nights > 0 && (
                        <div className="summary-date-row">
                          <span className="summary-date-label">Duration</span>
                          <span className="summary-date-val">{nights} night{nights !== 1 ? 's' : ''}</span>
                        </div>
                      )}
                      {form.num_guests > 1 && (
                        <div className="summary-date-row">
                          <span className="summary-date-label">Guests</span>
                          <span className="summary-date-val">{form.num_guests}</span>
                        </div>
                      )}
                    </div>
                    <div className="summary-divider" />
                  </>
                )}

                {/* Items */}
                {Object.keys(selectedServices).length === 0 ? (
                  <div className="empty-summary">
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌿</div>
                    <p style={{ fontSize: '0.85rem' }}>No services selected yet.<br />Choose your experiences to see the total.</p>
                  </div>
                ) : (
                  <div className="summary-items">
                    {Object.entries(selectedServices).map(([id, s]) => (
                      <div className="summary-item" key={id}>
                        <div className="summary-item-name">
                          {s.name}
                          {s.quantity > 1 && <span style={{ color: 'var(--savannah-amber)', marginLeft: '0.25rem' }}>×{s.quantity}</span>}
                        </div>
                        <div className="summary-item-price">{formatKES(s.price * s.quantity)}</div>
                      </div>
                    ))}
                  </div>
                )}

                {Object.keys(selectedServices).length > 0 && (
                  <>
                    <div className="summary-divider" />
                    <div className="summary-total">
                      <span className="summary-total-label">Total Amount</span>
                      <span className="summary-total-amount">{formatKES(totalAmount)}</span>
                    </div>
                    <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.75rem', textAlign: 'center' }}>
                      * Prices in Kenya Shillings (KES). Payment on arrival.
                    </p>
                  </>
                )}

                <div style={{ marginTop: '2rem' }}>
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '1rem', opacity: submitting ? 0.7 : 1 }}
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting ? '⏳ Processing...' : '🦁 Confirm Booking'}
                  </button>
                </div>

                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.7' }}>
                  ✅ Free cancellation up to 7 days before check-in<br />
                  ✅ No credit card required to book<br />
                  ✅ Confirmation within 24 hours<br />
                  ✅ Pay on arrival (Cash/M-Pesa)
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
