import fs from 'fs';
import path from 'path';
import GalleryCarousel from '../../components/GalleryCarousel';

function readJSON(name) {
  try { return JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', `${name}.json`), 'utf8')); }
  catch { return []; }
}

export default function GalleryPage() {
  const adminGallery = readJSON('gallery');

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: "url('/galleryback.jpg')" }}>
        <div className="container">
          <div className="page-hero-content">
            <span className="page-hero-tag">Visual Journey</span>
            <h1 className="page-hero-title">Gallery</h1>
            <p className="page-hero-desc">
              A glimpse into the stunning destinations and unforgettable experiences offered by Darazi Travels.
            </p>
          </div>
        </div>
      </section>

      <GalleryCarousel extraImages={adminGallery} />
    </>
  );
}
