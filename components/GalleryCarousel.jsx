'use client';

import { useState } from 'react';
import Image from 'next/image';

const images = [
  { src: '/gal1.jpg', alt: 'Travel destination 1' },
  { src: '/gal2.jpg', alt: 'Travel destination 2' },
  { src: '/gal3.jpg', alt: 'Travel destination 3' },
  { src: '/gal4.jpg', alt: 'Travel destination 4' },
  { src: '/gal5.jpg', alt: 'Travel destination 5' },
];

function cardClass(offset, total) {
  if (offset === 0)          return 'center';
  if (offset === 1)          return 'right-1';
  if (offset === 2)          return 'right-2';
  if (offset === total - 1)  return 'left-1';
  if (offset === total - 2)  return 'left-2';
  return 'hidden';
}

export default function GalleryCarousel({ extraImages = [] }) {
  const all = [...images, ...extraImages.map(g => ({ src: g.url, alt: g.alt || 'Gallery photo' }))];
  const [current, setCurrent] = useState(0);
  const total = all.length;
  const go = (n) => setCurrent((n + total) % total);

  return (
    <section className="gallery-bg">
      <div className="container">
        <div className="section-head" style={{ marginBottom: 48 }}>
          <span className="section-tag" style={{ color: 'rgba(255,255,255,0.5)' }}>Our Gallery</span>
          <h2 className="section-title" style={{ color: 'white' }}>Moments Worth Remembering</h2>
        </div>
      </div>

      <div className="carousel-wrap">
        <button className="carousel-btn left" onClick={() => go(current - 1)} aria-label="Previous">&#8249;</button>

        <div className="carousel-track">
          {all.map((img, i) => {
            const offset = (i - current + total) % total;
            return (
              <div key={i} className={`gallery-card ${cardClass(offset, total)}`}>
                <Image src={img.src} alt={img.alt} fill style={{ objectFit: 'cover' }} sizes="290px" />
              </div>
            );
          })}
        </div>

        <button className="carousel-btn right" onClick={() => go(current + 1)} aria-label="Next">&#8250;</button>
      </div>

      <div className="gallery-dots">
        {all.map((_, i) => (
          <button
            key={i}
            className={`gallery-dot${i === current ? ' active' : ''}`}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
