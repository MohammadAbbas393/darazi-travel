'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import IonIcon from './IonIcon';

export default function Footer({ onOpenChat }) {
  const inputRef = useRef(null);

  function handleAsk(e) {
    e.preventDefault();
    if (onOpenChat) onOpenChat();
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">

            {/* Brand */}
            <div className="footer-brand-col">
              <div className="footer-logo">
                <Image src="/logo.svg" alt="Darazi Travels" width={140} height={48} />
              </div>
              <p className="footer-tagline">
                Start your journey with trusted professionals and tailored travel solutions just for you.
                <span className="arabic">ابدأ رحلتك مع خبراء موثوقين وحلول سفر مصممة خصيصًا لك.</span>
              </p>
              <div className="footer-social">
                <a href="#" aria-label="Facebook"><IonIcon name="logo-facebook" /></a>
                <a href="#" aria-label="Instagram"><IonIcon name="logo-instagram" /></a>
                <a href="#" aria-label="WhatsApp"><IonIcon name="logo-whatsapp" /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer-col-title">Quick Links</h4>
              <div className="footer-links">
                <Link href="/" className="footer-link">Home</Link>
                <Link href="/about" className="footer-link">About Us</Link>
                <Link href="/packages" className="footer-link">Packages</Link>
                <Link href="/gallery" className="footer-link">Gallery</Link>
                <Link href="/contact" className="footer-link">Contact Us</Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="footer-col-title">Contact Us</h4>
              <div className="footer-contact-list">
                <div className="footer-contact-item">
                  <span className="fci-icon"><IonIcon name="call-outline" /></span>
                  <div className="fci-text">
                    <a href="tel:+96103859219">+961 03 859 219</a><br />
                    <a href="tel:+96106221008">+961 06 221 008</a>
                  </div>
                </div>
                <div className="footer-contact-item">
                  <span className="fci-icon"><IonIcon name="mail-outline" /></span>
                  <div className="fci-text">
                    <a href="mailto:fdarazitravel@gmail.com">fdarazitravel@gmail.com</a>
                  </div>
                </div>
                <div className="footer-contact-item">
                  <span className="fci-icon"><IonIcon name="location-outline" /></span>
                  <div className="fci-text">El Mina street behind gingers,<br />Tripoli, Lebanon 1300</div>
                </div>
              </div>
            </div>

            {/* Chatbot CTA */}
            <div>
              <h4 className="footer-col-title">Need Help?</h4>
              <div className="footer-chat-box">
                <p className="chat-box-title">Ask Ziggy AI ✨</p>
                <p className="chat-box-sub">Our AI assistant is available 24/7 to answer your travel questions.</p>
                <form className="chat-box-input" onSubmit={handleAsk}>
                  <input ref={inputRef} type="text" placeholder="Type your question..." />
                  <button type="submit" className="chat-box-btn">Ask</button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="footer-copy">
            &copy; 2025 <a href="#">Darazi Travels</a>. All rights reserved. &nbsp;·&nbsp; Designed &amp; built by <strong>Mohammad Abbas</strong>
          </p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms &amp; Conditions</a>
            <a href="#">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
