'use client';
import { useState, useEffect } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const formatKES = (n) => `KES ${Number(n).toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;

export default function AdminPage() {
  const [token, setToken] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [activeTab, setActiveTab] = useState('bookings');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [svcForm, setSvcForm] = useState({ name: '', description: '', price: '', category: 'Safari', image_url: '', duration: '', available: true });
  const [editingSvc, setEditingSvc] = useState(null);
  const [svcMsg, setSvcMsg] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('masikio_admin_token');
    const savedAdmin = localStorage.getItem('masikio_admin');
    if (saved && savedAdmin) { setToken(saved); setAdmin(JSON.parse(savedAdmin)); }
  }, []);

  useEffect(() => {
    if (token) { fetchBookings(); fetchServices(); }
  }, [token]);

  const doLogin = async () => {
    setLoginError(''); setLoginLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(loginForm) });
      const data = await res.json();
      if (data.success) {
        setToken(data.token); setAdmin(data.admin);
        localStorage.setItem('masikio_admin_token', data.token);
        localStorage.setItem('masikio_admin', JSON.stringify(data.admin));
      } else { setLoginError(data.message || 'Invalid credentials'); }
    } catch { setLoginError('Connection failed'); }
    setLoginLoading(false);
  };

  const doLogout = () => {
    setToken(null); setAdmin(null);
    localStorage.removeItem('masikio_admin_token');
    localStorage.removeItem('masikio_admin');
  };

  const authHeaders = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` });

  const fetchBookings = async () => {
    setDataLoading(true);
    const res = await fetch(`${API}/bookings`, { headers: authHeaders() });
    const data = await res.json();
    if (data.success) setBookings(data.bookings);
    setDataLoading(false);
  };

  const fetchServices = async () => {
    const res = await fetch(`${API}/services`);
    const data = await res.json();
    if (data.success) setServices(data.services);
  };

  const updateBookingStatus = async (id, status, payment_status) => {
    await fetch(`${API}/bookings/${id}/status`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify({ status, payment_status }) });
    fetchBookings();
  };

  const saveSvc = async () => {
    setSvcMsg('');
    const url = editingSvc ? `${API}/services/${editingSvc}` : `${API}/services`;
    const method = editingSvc ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: authHeaders(), body: JSON.stringify(svcForm) });
    const data = await res.json();
    if (data.success) {
      setSvcMsg(editingSvc ? 'Service updated!' : 'Service created!');
      setSvcForm({ name: '', description: '', price: '', category: 'Safari', image_url: '', duration: '', available: true });
      setEditingSvc(null); fetchServices();
    }
  };

  const editSvc = (svc) => {
    setEditingSvc(svc.id);
    setSvcForm({ name: svc.name, description: svc.description, price: svc.price, category: svc.category, image_url: svc.image_url || '', duration: svc.duration, available: svc.available });
    setActiveTab('add-service');
  };

  const deleteSvc = async (id) => {
    if (!confirm('Delete this service?')) return;
    await fetch(`${API}/services/${id}`, { method: 'DELETE', headers: authHeaders() });
    fetchServices();
  };

  if (!token) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--savannah-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'var(--font-body)' }}>
        <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '3rem', width: '100%', maxWidth: '420px', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🦁</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--savannah-dark)', letterSpacing: '0.1em' }}>MASIKIO ADMIN</h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--savannah-earth)', marginTop: '0.25rem' }}>Staff Access Portal</p>
          </div>
          {loginError && <div className="alert alert-error">{loginError}</div>}
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={loginForm.email} onChange={e => setLoginForm(p => ({ ...p, email: e.target.value }))} placeholder="admin@masikioadventures.co.ke" onKeyDown={e => e.key === 'Enter' && doLogin()} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={loginForm.password} onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))} placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && doLogin()} />
          </div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', marginTop: '0.5rem', opacity: loginLoading ? 0.7 : 1 }} onClick={doLogin} disabled={loginLoading}>
            {loginLoading ? 'Logging in...' : '🔐 Sign In'}
          </button>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.78rem', color: 'var(--savannah-earth)' }}>
            Default: admin@masikioadventures.co.ke / admin123
          </p>
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <a href="/" style={{ fontSize: '0.82rem', color: 'var(--savannah-gold)', textDecoration: 'none' }}>← Back to Website</a>
          </div>
        </div>
      </div>
    );
  }

  const totalRevenue = bookings.reduce((s, b) => s + parseFloat(b.total_amount || 0), 0);
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-logo">
            <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🦁</div>
            <div>MASIKIO ADMIN</div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem' }}>{admin?.name}</div>
          </div>
          <nav className="admin-nav">
            {[
              { tab: 'bookings', icon: '📋', label: 'Bookings' },
              { tab: 'services', icon: '🗂️', label: 'Services' },
              { tab: 'add-service', icon: '➕', label: 'Add Service' },
            ].map(item => (
              <button key={item.tab} className={`admin-nav-item ${activeTab === item.tab ? 'active' : ''}`} onClick={() => { setActiveTab(item.tab); if (item.tab === 'add-service') { setEditingSvc(null); setSvcForm({ name:'',description:'',price:'',category:'Safari',image_url:'',duration:'',available:true }); setSvcMsg(''); } }}>
                <span>{item.icon}</span> {item.label}
              </button>
            ))}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '1rem 0' }} />
            <a href="/" className="admin-nav-item" style={{ textDecoration: 'none' }}><span>🌍</span> View Website</a>
            <button className="admin-nav-item" onClick={doLogout} style={{ color: 'rgba(255,100,100,0.8)' }}><span>🚪</span> Logout</button>
          </nav>
        </aside>

        <main className="admin-main">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { label: 'Total Bookings', value: bookings.length, icon: '📋', color: 'var(--savannah-gold)' },
              { label: 'Confirmed', value: confirmedCount, icon: '✅', color: 'var(--savannah-green)' },
              { label: 'Pending', value: pendingCount, icon: '⏳', color: 'var(--savannah-amber)' },
              { label: 'Total Revenue', value: formatKES(totalRevenue), icon: '💰', color: 'var(--savannah-sunset)' },
            ].map((s, i) => (
              <div key={i} style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', boxShadow: '0 4px 20px var(--shadow)', borderLeft: `4px solid ${s.color}` }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: '900', color: 'var(--savannah-dark)' }}>{s.value}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--savannah-earth)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {activeTab === 'bookings' && (
            <div>
              <div className="admin-header">
                <h2 className="admin-title">📋 All Bookings</h2>
                <button className="btn btn-dark" onClick={fetchBookings} style={{ padding: '0.5rem 1rem', fontSize: '0.82rem' }}>🔄 Refresh</button>
              </div>
              {dataLoading ? <div className="loading-spinner"><div className="spinner" /></div> : (
                <div style={{ overflowX: 'auto' }}>
                  <table className="admin-table">
                    <thead>
                      <tr><th>Ref</th><th>Guest</th><th>Dates</th><th>Guests</th><th>Total</th><th>Status</th><th>Payment</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                      {bookings.length === 0 && <tr><td colSpan="8" style={{ textAlign: 'center', padding: '3rem', color: 'var(--savannah-earth)' }}>No bookings yet 🦒</td></tr>}
                      {bookings.map(b => (
                        <tr key={b.id}>
                          <td style={{ fontWeight: '700', color: 'var(--savannah-gold)', fontFamily: 'monospace', fontSize: '0.82rem' }}>{b.booking_ref}</td>
                          <td>
                            <div style={{ fontWeight: '600' }}>{b.guest_name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--savannah-earth)' }}>{b.guest_email}</div>
                            {b.guest_phone && <div style={{ fontSize: '0.72rem', color: 'var(--savannah-earth)' }}>📞 {b.guest_phone}</div>}
                          </td>
                          <td>
                            <div style={{ fontSize: '0.82rem' }}>{new Date(b.check_in).toLocaleDateString('en-KE', { day:'numeric', month:'short', year:'numeric' })}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--savannah-earth)' }}>→ {new Date(b.check_out).toLocaleDateString('en-KE', { day:'numeric', month:'short', year:'numeric' })}</div>
                          </td>
                          <td style={{ textAlign: 'center' }}>{b.num_guests}</td>
                          <td style={{ fontWeight: '700' }}>{formatKES(b.total_amount)}</td>
                          <td>
                            <select value={b.status} onChange={e => updateBookingStatus(b.id, e.target.value, b.payment_status)}
                              style={{ border: 'none', background: 'transparent', fontFamily: 'var(--font-body)', fontSize: '0.82rem', cursor: 'pointer', fontWeight: '700', color: b.status === 'confirmed' ? '#065F46' : b.status === 'cancelled' ? '#DC2626' : '#92400E' }}>
                              <option value="pending">⏳ Pending</option>
                              <option value="confirmed">✅ Confirmed</option>
                              <option value="cancelled">❌ Cancelled</option>
                            </select>
                          </td>
                          <td>
                            <select value={b.payment_status} onChange={e => updateBookingStatus(b.id, b.status, e.target.value)}
                              style={{ border: 'none', background: 'transparent', fontFamily: 'var(--font-body)', fontSize: '0.82rem', cursor: 'pointer', fontWeight: '700', color: b.payment_status === 'paid' ? '#065F46' : '#92400E' }}>
                              <option value="unpaid">💸 Unpaid</option>
                              <option value="paid">💰 Paid</option>
                            </select>
                          </td>
                          <td>
                            <button className="icon-btn" title="View" onClick={() => alert(`REF: ${b.booking_ref}\nGuest: ${b.guest_name}\nPhone: ${b.guest_phone || 'N/A'}\nNationality: ${b.nationality || 'N/A'}\nGuests: ${b.num_guests}\nSpecial Requests: ${b.special_requests || 'None'}`)}>👁</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <div className="admin-header">
                <h2 className="admin-title">🗂️ Manage Services</h2>
                <button className="btn btn-primary" style={{ padding: '0.55rem 1.2rem', fontSize: '0.82rem' }} onClick={() => { setActiveTab('add-service'); setEditingSvc(null); setSvcForm({ name:'',description:'',price:'',category:'Safari',image_url:'',duration:'',available:true }); setSvcMsg(''); }}>
                  ➕ Add Service
                </button>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="admin-table">
                  <thead>
                    <tr><th>Image</th><th>Name</th><th>Category</th><th>Price (KES)</th><th>Duration</th><th>Status</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {services.length === 0 && <tr><td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: 'var(--savannah-earth)' }}>No services yet</td></tr>}
                    {services.map(svc => (
                      <tr key={svc.id}>
                        <td>
                          <div style={{ width: '56px', height: '40px', borderRadius: 'var(--radius)', overflow: 'hidden', background: 'var(--savannah-sand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {svc.image_url ? <img src={svc.image_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span>🦁</span>}
                          </div>
                        </td>
                        <td style={{ fontWeight: '600', maxWidth: '200px' }}>{svc.name}</td>
                        <td><span className="badge badge-confirmed">{svc.category}</span></td>
                        <td style={{ fontWeight: '700', color: 'var(--savannah-gold)' }}>{formatKES(svc.price)}</td>
                        <td style={{ fontSize: '0.82rem', color: 'var(--savannah-earth)' }}>{svc.duration}</td>
                        <td><span className={`badge ${svc.available ? 'badge-confirmed' : 'badge-cancelled'}`}>{svc.available ? '✅ Active' : '❌ Hidden'}</span></td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.25rem' }}>
                            <button className="icon-btn" onClick={() => editSvc(svc)} title="Edit">✏️</button>
                            <button className="icon-btn danger" onClick={() => deleteSvc(svc.id)} title="Delete">🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'add-service' && (
            <div>
              <div className="admin-header">
                <h2 className="admin-title">{editingSvc ? '✏️ Edit Service' : '➕ Add New Service'}</h2>
              </div>
              {svcMsg && <div className="alert alert-success">✅ {svcMsg}</div>}
              <div className="booking-form-wrap" style={{ maxWidth: '720px' }}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Service Name *</label>
                    <input value={svcForm.name} onChange={e => setSvcForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Full Day Game Drive" />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select value={svcForm.category} onChange={e => setSvcForm(p => ({ ...p, category: e.target.value }))}>
                      {['Safari','Adventure','Accommodation','Culture','Dining','Transfer','Specialty'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea value={svcForm.description} onChange={e => setSvcForm(p => ({ ...p, description: e.target.value }))} placeholder="Describe the experience..." />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price (KES) *</label>
                    <input type="number" value={svcForm.price} onChange={e => setSvcForm(p => ({ ...p, price: e.target.value }))} placeholder="18500" />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input value={svcForm.duration} onChange={e => setSvcForm(p => ({ ...p, duration: e.target.value }))} placeholder="e.g. Full Day (8hrs)" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Image Path / URL</label>
                  <input value={svcForm.image_url} onChange={e => setSvcForm(p => ({ ...p, image_url: e.target.value }))} placeholder="/images/services/game-drive.jpg" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <input type="checkbox" id="svcAvail" checked={svcForm.available} onChange={e => setSvcForm(p => ({ ...p, available: e.target.checked }))} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                  <label htmlFor="svcAvail" style={{ cursor: 'pointer', fontSize: '0.9rem', color: 'var(--savannah-dark)' }}>Service is available for booking</label>
                </div>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button className="btn btn-primary" onClick={saveSvc}>{editingSvc ? '💾 Update Service' : '➕ Create Service'}</button>
                  {editingSvc && (
                    <button className="btn btn-dark" onClick={() => { setEditingSvc(null); setSvcForm({ name:'',description:'',price:'',category:'Safari',image_url:'',duration:'',available:true }); setActiveTab('services'); }}>
                      Cancel Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
