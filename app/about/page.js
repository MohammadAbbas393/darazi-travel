const values = [
  { icon: '🧭', title: 'Expert Guidance',      desc: 'Over a decade of travel expertise tailored to every traveler\'s unique needs and budget.' },
  { icon: '❤️', title: 'Personalized Care',    desc: 'We treat every client like family — your comfort, safety, and joy are our top priorities.' },
  { icon: '🌐', title: 'Global Network',        desc: 'Strong partnerships worldwide ensure the best hotels, tours, and seamless experiences.' },
  { icon: '🛡️', title: 'Trusted & Reliable',   desc: 'Hundreds of satisfied travelers trust us to handle even the most complex itineraries.' },
];

const facts = [
  { num: '500+', label: 'Happy Travelers' },
  { num: '20+',  label: 'Destinations' },
  { num: '10+',  label: 'Years Experience' },
  { num: '24/7', label: 'Customer Support' },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="page-hero" style={{ backgroundImage: "url('/Aboutback.webp')" }}>
        <div className="container">
          <div className="page-hero-content">
            <span className="page-hero-tag">Our Story</span>
            <h1 className="page-hero-title">About Darazi Travels</h1>
            <p className="page-hero-desc">
              A dedicated travel agency rooted in Tripoli, Lebanon — helping dreamers explore the world.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="container">
          <div className="section-head">
            <span className="section-tag">What We Stand For</span>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-desc">Everything we do is guided by our commitment to exceptional, personalized travel.</p>
          </div>
          <div className="values-grid">
            {values.map(v => (
              <div key={v.title} className="value-card">
                <span className="value-icon">{v.icon}</span>
                <h3 className="value-title">{v.title}</h3>
                <p className="value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story + Stats */}
      <section className="about-story">
        <div className="container">
          <div className="story-inner">
            <div className="story-text">
              <span className="section-tag">Who We Are</span>
              <h2 className="section-title white" style={{ color: 'white' }}>Passionate About Travel Since Day One</h2>
              <p className="story-para">
                We are a dedicated travel agency based in Tripoli, Lebanon. At Darazi Travels, our mission is to help you discover the world with personalized travel plans, guided experiences, and unforgettable adventures.
                <span className="arabic">نحن وكالة سفر مقرها في طرابلس، لبنان. هدفنا في دارزي للسفر هو مساعدتك على استكشاف العالم من خلال خطط سفر مخصصة.</span>
              </p>
              <p className="story-para">
                What sets us apart is our deeply personal approach. We go beyond booking flights and hotels — we craft complete journeys that reflect your individual tastes, pace, and dreams. From the vibrant streets of Istanbul to the golden sands of Sharm El Sheikh, every trip we design is a story worth telling.
              </p>
            </div>
            <div className="story-facts">
              {facts.map(f => (
                <div key={f.label} className="fact-box">
                  <div className="fact-num">{f.num}</div>
                  <div className="fact-label">{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
