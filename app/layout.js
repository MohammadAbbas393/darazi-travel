'use client';

import './globals.css';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';

export default function RootLayout({ children }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [showTop,  setShowTop]  = useState(false);
  const [dark,     setDark]     = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;
    setDark(isDark);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Darazi Travels – Your Journey Starts Here</title>
        <meta name="description" content="Darazi Travels – personalized travel experiences from Tripoli, Lebanon. Packages to Turkey, Egypt, and beyond." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" />
        <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
      </head>
      <body>
        {!isAdmin && <Header onOpenChat={() => setChatOpen(true)} dark={dark} onToggleDark={() => setDark(d => !d)} />}

        {children}

        {!isAdmin && <Footer onOpenChat={() => setChatOpen(true)} />}

        {!isAdmin && (
          <>
            {/* Chatbot */}
            <div className="chatbot-wrap">
              <Chatbot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
              {!chatOpen && (
                <button
                  className="chatbot-bubble"
                  onClick={() => setChatOpen(true)}
                  aria-label="Open Ziggy AI"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <span className="notif-dot" />
                </button>
              )}
            </div>

            {/* Back to top */}
            <button
              className={`go-top${showTop ? ' active' : ''}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Back to top"
            >
              ↑
            </button>
          </>
        )}
      </body>
    </html>
  );
}
