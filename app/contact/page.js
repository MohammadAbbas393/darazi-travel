import IonIcon from '../../components/IonIcon';

export default function ContactPage() {
  return (
    <div className="contact-page-wrap">
      {/* Hero */}
      <div className="contact-hero">
        <div className="container">
          <h1 className="section-title white" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: 16 }}>Get In Touch</h1>
          <p className="section-desc white" style={{ marginInline: 'auto' }}>
            Have questions about a destination or ready to book? We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="contact-body">
        <div className="container">
          <div className="contact-grid">

            {/* Info panel */}
            <div className="contact-info-panel">
              <h3 className="panel-title">Contact Information</h3>

              <div className="info-row">
                <div className="info-icon-box">📍</div>
                <div>
                  <div className="info-row-title">Address</div>
                  <div className="info-row-val">El Mina street behind gingers,<br />Tripoli, Lebanon 1300</div>
                </div>
              </div>

              <div className="info-row">
                <div className="info-icon-box">📞</div>
                <div>
                  <div className="info-row-title">Phone</div>
                  <div className="info-row-val">
                    <a href="tel:+96103859219">+961 03 859 219</a><br />
                    <a href="tel:+96106221008">+961 06 221 008</a><br />
                    <a href="tel:+96106221009">+961 06 221 009</a>
                  </div>
                </div>
              </div>

              <div className="info-row">
                <div className="info-icon-box">✉️</div>
                <div>
                  <div className="info-row-title">Email</div>
                  <div className="info-row-val">
                    <a href="mailto:fdarazitravel@gmail.com">fdarazitravel@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="info-row">
                <div className="info-icon-box">🕐</div>
                <div>
                  <div className="info-row-title">Working Hours</div>
                  <div className="info-row-val">Monday – Saturday<br />10:00 AM – 5:00 PM</div>
                </div>
              </div>

              <div className="contact-social">
                <p>Follow Us</p>
                <div className="social-row">
                  <a href="#" className="social-btn" aria-label="Facebook"><IonIcon name="logo-facebook" /></a>
                  <a href="#" className="social-btn" aria-label="Instagram"><IonIcon name="logo-instagram" /></a>
                  <a href="#" className="social-btn" aria-label="WhatsApp"><IonIcon name="logo-whatsapp" /></a>
                </div>
              </div>
            </div>

            {/* Form panel */}
            <div className="contact-form-panel">
              <h2 className="form-panel-title">Send Us a Message</h2>
              <p className="form-panel-sub">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

              <form action="https://formspree.io/f/xanogeoq" method="POST">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input className="form-input" type="text" name="firstName" placeholder="Mohammad" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input className="form-input" type="text" name="lastName" placeholder="Abbas" required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="form-input" type="email" name="email" placeholder="you@example.com" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input className="form-input" type="tel" name="phone" placeholder="+961 XX XXX XXX" />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-input form-textarea" name="message" placeholder="Tell us about your dream trip…" required />
                </div>
                <button type="submit" className="btn btn-primary form-submit">Send Message</button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
