'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const slides = [
  {
    image: '/images/services/maasai-culture.png',
    tag: '🦁 Maasai Mara, Kenya',
    title: 'Where the Wild\nThings Roam',
    titleEm: 'Free',
    desc: 'Witness nature\'s greatest spectacle — the Great Migration — from the comfort of our luxury tented camp deep in the Mara.',
  },
  {
    image: '/images/hero/hero4.jpeg',
    tag: '🏕️ Big 5',
    title: 'Meet Big\nFive',
    titleEm: 'Animals',
    desc: 'Meet all the famous Big 5 Animals along Maasai Mara Game Reserve- Lion, Buffalo, Rhino, Elephant and Leopard.',
  },
  {
    image: '/images/hero/hero2.jpeg',
    tag: '🌅 Sunrise Safaris',
    title: 'Chase the Golden\nHour on the',
    titleEm: 'Savannah',
    desc: 'Embark on dawn game drives when the predators are most active and the Mara glows in spectacular amber light.',
  },
  {
    image: '/images/hero/hero3.jpeg',
    tag: '🎈 Adventure Awaits',
    title: 'Drive\nAfrica\'s',
    titleEm: 'Savannah',
    desc: 'Tourists Land Cruiser — an experience that will stay with you for a lifetime.',
  },
  
  {
    image: '/images/hero/hero5.jpeg',
    tag: '🪘 Maasai Culture',
    title: 'Discover the\nSoul of',
    titleEm: 'Kenya',
    desc: 'Immerse yourself in ancient Maasai traditions, vibrant beadwork, rhythmic chants, and a people deeply connected to the land.',
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback((index) => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrent(index);
    setTimeout(() => setTransitioning(false), 1100);
  }, [transitioning]);

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <section className="hero">
      {slides.map((slide, i) => (
        <div key={i} className={`hero-slide ${i === current ? 'active' : ''}`}>
          <img
            src={slide.image}
            alt={`Masikio Adventures - ${slide.tag}`}
            className="hero-slide-bg"
          />
          <div className="hero-slide-overlay" />
        </div>
      ))}

      <div className="hero-content">
        <div className="hero-content-inner">
          <div className="hero-tag fade-up fade-up-delay-1">
            {slides[current].tag}
          </div>
          <h1 className="hero-title fade-up fade-up-delay-2">
            {slides[current].title.split('\n').map((line, i) => (
              <span key={i} style={{ display: 'block' }}>{line}</span>
            ))}
            <em>{slides[current].titleEm}</em>
          </h1>
          <p className="hero-desc fade-up fade-up-delay-3">
            {slides[current].desc}
          </p>
          <div className="hero-actions fade-up fade-up-delay-4">
            <Link href="/booking" className="btn btn-primary">
              Book Your Safari
            </Link>
            <Link href="/services" className="btn btn-outline">
              Explore Services
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>

      {/* Dots */}
      <div className="hero-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Prev/Next */}
      <div className="hero-controls">
        <button className="hero-btn" onClick={prev} aria-label="Previous slide">
          ‹
        </button>
        <button className="hero-btn" onClick={next} aria-label="Next slide">
          ›
        </button>
      </div>
    </section>
  );
}
