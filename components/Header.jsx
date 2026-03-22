'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
  { href: '/',         label: 'Home' },
  { href: '/about',    label: 'About' },
  { href: '/packages', label: 'Packages' },
  { href: '/gallery',  label: 'Gallery' },
  { href: '/contact',  label: 'Contact' },
];

export default function Header({ onOpenChat, dark, onToggleDark }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Overlay behind mobile drawer */}
      <div
        className={`drawer-overlay${drawerOpen ? ' open' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Main header */}
      <header className={`site-header${scrolled ? ' scrolled' : ' transparent'}`}>
        <div className="container">
          <div className="header-inner">
            {/* Logo */}
            <Link href="/" className="header-logo">
              <Image src="/logo.svg" alt="Darazi Travels" width={130} height={44} priority />
            </Link>

            {/* Desktop nav */}
            <nav className="header-nav">
              {navLinks.map(l => (
                <Link key={l.href} href={l.href} className="nav-link">{l.label}</Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="header-actions">
              <button className="theme-toggle" onClick={onToggleDark} aria-label="Toggle dark mode">
                {dark ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                )}
              </button>
              {onOpenChat && (
                <button className="chat-trigger-btn" onClick={onOpenChat} aria-label="Open chatbot">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  Ziggy AI
                </button>
              )}
              <Link href="/contact" className="btn btn-primary btn-sm">Book Now</Link>
              <button
                className="mobile-menu-btn"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
              >
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`mobile-drawer${drawerOpen ? ' open' : ''}`}>
        <div className="drawer-header">
          <Image src="/logo-blue.svg" alt="Darazi Travels" width={120} height={40} />
          <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">×</button>
        </div>

        <nav className="drawer-nav">
          {navLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="drawer-link"
              onClick={() => setDrawerOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="drawer-footer">
          <Link href="/contact" className="btn btn-primary" onClick={() => setDrawerOpen(false)}>
            Book Now
          </Link>
        </div>
      </div>
    </>
  );
}
