export const dynamic = 'force-dynamic';

import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

const hardcoded = [
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
  },
];

export default async function PackagesPage() {
  const { data: adminPackages = [] } = await supabase
    .from('packages')
    .select('*')
    .order('id');

  const all = [
    ...hardcoded,
    ...adminPackages.map(p => ({ ...p, desc: p.description })),
  ];

  return (
    <>
      {/* Hero */}
      <section className="page-hero" style={{ backgroundImage: "url('/destination.jpg')" }}>
        <div className="container">
          <div className="page-hero-content">
            <span className="page-hero-tag">Travel Packages</span>
            <h1 className="page-hero-title">Explore Our Packages</h1>
            <p className="page-hero-desc">
              Hand-picked travel packages at the best prices — everything included, no surprises.
              <span className="arabic">عروض سفر مختارة بعناية بأفضل الأسعار — كل شيء مدرج، بدون مفاجآت.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="dest-full-section">
        <div className="container">
          <div className="section-head">
            <span className="section-tag">All Packages</span>
            <h2 className="section-title">Find Your Perfect Trip</h2>
            <p className="section-desc">Each package is personally curated for the best experience and value.</p>
          </div>
          <div className="packages-grid">
            {all.map((p, i) => (
              <div key={p.id || p.name || i} className="package-card">
                <div className="package-img">
                  {p.img
                    ? <Image src={p.img} alt={p.name} fill style={{ objectFit: 'cover' }} sizes="(max-width:768px) 100vw, 50vw" />
                    : <div style={{ width: '100%', height: '100%', background: '#1a2a4a' }} />}
                  {p.badge && <span className="package-badge">{p.badge}</span>}
                </div>
                <div className="package-body">
                  <div className="package-location">{p.location}</div>
                  <h3 className="package-name">{p.name}</h3>
                  <p className="package-desc">{p.desc}</p>
                  <div className="package-meta">
                    {p.nights && <span className="meta-tag"><span>🌙</span>{p.nights}</span>}
                    {p.hotel  && <span className="meta-tag"><span>🏨</span>{p.hotel}</span>}
                    {p.meals  && <span className="meta-tag"><span>🍽️</span>{p.meals}</span>}
                  </div>
                  <div className="package-footer">
                    <div className="package-price">
                      <div className="price-from">Starting from</div>
                      <div className="price-amount"><sup>$</sup>{p.price}</div>
                      <div className="price-per">per person</div>
                    </div>
                    <Link href="/contact" className="btn btn-primary btn-sm">Book Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-strip">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-text">
              <div className="cta-sub">Ready to travel?</div>
              <h2 className="cta-title">Your dream trip is one call away</h2>
            </div>
            <div className="cta-actions">
              <Link href="/contact" className="btn btn-gold">Book a Trip</Link>
              <a href="tel:+96103859219" className="btn btn-outline">Call Us Now</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
