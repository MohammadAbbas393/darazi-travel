export const dynamic = 'force-dynamic';

import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

/* ─── Data ─────────────────────────────────────────────── */
const features = [
  { icon: '🌍', title: 'Expert Local Knowledge', desc: 'Our team knows every destination inside out — hidden gems, best seasons, must-dos, and more.' },
  { icon: '💰', title: 'Best Price Guarantee',   desc: 'We match or beat any comparable offer. Transparent pricing with zero hidden fees, ever.' },
  { icon: '🤝', title: 'Personalized Service',   desc: 'Every trip is tailored to you. We listen, plan, and deliver experiences that feel truly yours.' },
  { icon: '📞', title: '24/7 Support',            desc: 'Whether you\'re booking or mid-trip, our team is always just one call away for you.' },
];

const packages = [
  {
    badge: 'Most Popular',
    img: '/destination.jpg',
    location: '🇹🇷 Turkey',
    name: 'Adha Package',
    desc: 'Experience the magic of Turkey with 4 days and 3 nights in a stunning 4-star hotel. Flights and transfers included.',
    nights: '3 Nights',
    hotel: '4-Star Hotel',
    meals: 'Breakfast Incl.',
    price: '550',
    href: '/contact',
  },
  {
    badge: 'Great Value',
    img: '/hero-banner.jpg',
    location: '🇪🇬 Egypt',
    name: 'Sharm El Sheikh',
    desc: 'An all-inclusive escape to the stunning Red Sea coast. 4 days, 3 nights of sun, sea, and relaxation.',
    nights: '3 Nights',
    hotel: '5-Star Resort',
    meals: 'All-Inclusive',
    price: '450',
    href: '/contact',
  },
];


/* ─── Page ─────────────────────────────────────────────── */
export default async function HomePage() {
  const { data: adminPackages = [] } = await supabase
    .from('packages')
    .select('*')
    .order('id', { ascending: false })
    .limit(2);

  const allPackages = [
    ...packages,
    ...adminPackages.map(p => ({ ...p, desc: p.description, href: '/contact' })),
  ];

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero" style={{ backgroundImage: "url('/background.jpg')" }} id="home">
        <div className="hero-overlay" />
        <div className="container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <span />
              Darazi Travels — Tripoli, Lebanon
            </div>
            <h1 className="hero-title">
              Journey to<br />
              <span className="highlight">Explore the World</span>
            </h1>
            <p className="hero-subtitle">
              Discover breathtaking destinations, curated packages, and unforgettable experiences crafted just for you.
              <span className="arabic">اكتشف وجهات ساحرة، وعروض سفر مخصصة، وتجارب لا تُنسى مع دارزي للسفر.</span>
            </p>
            <div className="hero-actions">
              <Link href="/packages" className="btn btn-gold">Explore Packages</Link>
              <Link href="/contact" className="btn btn-outline">Book Now</Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">500<span>+</span></div>
                <div className="stat-label">Happy Travelers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">20<span>+</span></div>
                <div className="stat-label">Destinations</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">10<span>+</span></div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          Scroll
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="features-section">
        <div className="container">
          <div className="section-head">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">Travel with Confidence</h2>
            <p className="section-desc">We handle every detail so you can focus on making memories that last a lifetime.</p>
          </div>
          <div className="features-grid">
            {features.map(f => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section className="packages-section">
        <div className="container">
          <div className="section-head">
            <span className="section-tag">Travel Packages</span>
            <h2 className="section-title">Curated Packages Just for You</h2>
            <p className="section-desc">Hand-picked experiences at prices that won't break the bank. Everything included.</p>
          </div>
          <div className="packages-grid">
            {allPackages.map(p => (
              <div key={p.name} className="package-card">
                <div className="package-img">
                  {p.img && <Image src={p.img} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="(max-width:768px) 100vw, 50vw" />}
                  <span className="package-badge">{p.badge}</span>
                </div>
                <div className="package-body">
                  <div className="package-location">{p.location}</div>
                  <h3 className="package-name">{p.name}</h3>
                  <p className="package-desc">{p.desc}</p>
                  <div className="package-meta">
                    <span className="meta-tag"><span>🌙</span>{p.nights}</span>
                    <span className="meta-tag"><span>🏨</span>{p.hotel}</span>
                    <span className="meta-tag"><span>🍽️</span>{p.meals}</span>
                  </div>
                  <div className="package-footer">
                    <div className="package-price">
                      <div className="price-from">Starting from</div>
                      <div className="price-amount"><sup>$</sup>{p.price}</div>
                      <div className="price-per">per person</div>
                    </div>
                    <Link href={p.href} className="btn btn-primary btn-sm">Book Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-strip">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-text">
              <div className="cta-sub">Ready to travel?</div>
              <h2 className="cta-title">Your dream trip is one call away</h2>
            </div>
            <div className="cta-actions">
              <Link href="/contact" className="btn btn-gold">Get in Touch</Link>
              <a href="tel:+96103859219" className="btn btn-outline">+961 03 859 219</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
