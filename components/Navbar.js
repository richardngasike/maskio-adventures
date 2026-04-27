'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href) => pathname === href;

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
       <Link href="/" className="nav-logo">
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
    <span className="nav-logo-name">Maasai Mara</span>
    <span className="nav-logo-sub">Maskio Adventures</span>
  </div>
</Link>

        <ul className="nav-links">
          {links.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={isActive(link.href) ? 'active' : ''}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/booking" className="nav-book-btn">
              Book Now
            </Link>
          </li>
        </ul>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button
          style={{ position: 'absolute', top: '1.5rem', right: '2rem', background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' }}
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>
        {links.map(link => (
          <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link href="/booking" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
          Book Now
        </Link>
      </div>
    </>
  );
}
