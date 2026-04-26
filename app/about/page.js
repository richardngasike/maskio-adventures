import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'About Us — Masikio Adventures',
  description: 'Learn about Masikio Adventures — our story, team, and mission.',
};

const team = [
  { name: 'Peter', role: 'Founder & Head Guide', emoji: '🦁', bio: 'Born in Narok, Elias grew up among the Maasai and has guided in the Mara for over 20 years. He knows every acacia tree and watering hole.' },
  { name: 'Grace Wanjiku', role: 'Camp Manager', emoji: '🌺', bio: 'Grace ensures every guest has a flawless stay — from the thread-count of linens to the temperature of your bush breakfast tea.' },
  { name: 'Samuel Saitoti', role: 'Maasai Cultural Expert', emoji: '🪘', bio: 'A Maasai warrior-turned-guide, Samuel bridges worlds — sharing his heritage with warmth, depth, and infectious pride.' },
  { name: 'Jane Auma', role: 'Head Chef', emoji: '🍽️', bio: 'Trained in Nairobi and London, Jane blends Kenyan flavors with international technique to create unforgettable bush dining.' },
];

const values = [
  { icon: '🌿', title: 'Conservation', desc: 'We contribute 5% of every booking to Mara wildlife conservation and anti-poaching initiatives.' },
  { icon: '🤝', title: 'Community', desc: 'Over 80% of our team are from local Maasai communities — tourism that directly uplifts its people.' },
  { icon: '☀️', title: 'Sustainability', desc: 'Solar-powered camps, zero single-use plastics, and responsible waste management in all our operations.' },
  { icon: '🎓', title: 'Education', desc: 'We partner with Kenyan schools for wildlife education tours and sponsor Maasai children\'s scholarships.' },
];

const stats = [
  { num: '2,400+', label: 'Guests Served' },
  { num: '47+', label: 'Countries' },
  { num: '12 yrs', label: 'Experience' },
  { num: '42', label: 'Team Members' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <div className="page-hero">
        <div className="page-hero-bg" style={{ backgroundImage: 'url(/images/about/about-hero.jpeg)' }} />
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <div className="page-hero-breadcrumb">
            <a href="/">Home</a> <span>›</span> <span>About Us</span>
          </div>
          <h1 className="page-hero-title">Our Story</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div>
              <span className="section-tag">Who We Are</span>
              <h2 className="section-title">Born from Passion,<br />Built on Respect</h2>
              <p className="section-subtitle">
                Masikio Adventures was founded in 2012 with a single tent, one Land Cruiser, and an unshakeable belief that every person deserves to witness the raw, unfiltered magic of the Maasai Mara.
              </p>
              <p style={{ margin: '1.25rem 0', color: 'var(--savannah-earth)', fontSize: '0.95rem', lineHeight: '1.9' }}>
                The word <em style={{ fontStyle: 'italic', color: 'var(--savannah-gold)' }}>"masikio"</em> means "ears" in Swahili — a reminder to listen deeply to the land, to the animals, to the people, and to each other.
              </p>
              <p style={{ color: 'var(--savannah-earth)', fontSize: '0.95rem', lineHeight: '1.9' }}>
                Today we host over 400 guests annually from 47+ countries, operate three tented camps, and are proud to employ 42 staff — 85% from the local Maasai community.
              </p>
              <div style={{ marginTop: '2rem' }}>
                <Link href="/booking" className="btn btn-primary">Book With Us</Link>
              </div>
            </div>

            <div className="about-images">
              <div className="about-img-main">
                <img src="/images/about/about-story.jpg" alt="Safari at Masikio Adventures" />
              </div>
              <div className="about-img-secondary">
                <img src="/images/about/about-maasai.jpg" alt="Maasai community" />
              </div>
              <div className="about-badge">
                <span className="about-badge-num">12+</span>
                <span className="about-badge-text">Years in the Mara</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag">Our Values</span>
            <h2 className="section-title light">What We Stand For</h2>
          </div>
          <div className="features-grid">
            {values.map((v, i) => (
              <div className="feature-card" key={i}>
                <span className="feature-icon">{v.icon}</span>
                <h3 className="feature-title">{v.title}</h3>
                <p className="feature-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-tag">Meet the Team</span>
            <h2 className="section-title">The Hearts Behind the Mara</h2>
          </div>
          <div className="services-grid">
            {team.map((member, i) => (
              <div key={i} className="service-card">
                <div style={{
                  height: '220px',
                  background: 'linear-gradient(135deg, var(--savannah-sand) 0%, var(--savannah-cream) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '5rem',
                }}>
                  <span>{member.emoji}</span>
                </div>
                <div className="service-card-body">
                  <h3 className="service-card-title">{member.name}</h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--savannah-gold)', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                    {member.role}
                  </div>
                  <p className="service-card-desc">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--savannah-gold)', padding: '4rem 2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', textAlign: 'center' }}>
            {stats.map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: '900', color: 'var(--white)' }}>{s.num}</div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '0.25rem' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
