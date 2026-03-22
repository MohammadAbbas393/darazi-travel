'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

const AGENT_API = 'https://formspree.io/f/xanogeoq';

export default function Chatbot({ isOpen, onClose }) {
  const [messages,  setMessages]  = useState([]);
  const [input,     setInput]     = useState('');
  const [typing,    setTyping]    = useState(false);
  const bottomRef   = useRef(null);
  const inputRef    = useRef(null);
  const historyRef  = useRef([]); // Gemini conversation history
  const initialized = useRef(false);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, typing]);
  useEffect(() => { if (isOpen) inputRef.current?.focus(); }, [isOpen]);

  const addBot = useCallback((text) => {
    setMessages(prev => [...prev, { role: 'bot', text }]);
  }, []);

  useEffect(() => {
    if (!isOpen || initialized.current) return;
    initialized.current = true;
    addBot("👋 Hi! I'm Ziggy, Darazi Travels' AI assistant.\n\nAsk me anything — packages, destinations, prices, travel tips — I'm here to help!");
  }, [isOpen, addBot]);

  async function sendToAgent() {
    try {
      const r = await fetch(AGENT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: '🔔 User requested an agent.', email: 'mohamadabboudy309@gmail.com' }),
      });
      addBot(r.ok
        ? '✅ An agent has been notified and will reach out to you soon!'
        : '❌ Could not notify the agent. Please call us at +961 03 859 219.');
    } catch {
      addBot('❌ Could not notify the agent. Please call +961 03 859 219.');
    }
  }

  async function send() {
    const text = input.trim();
    if (!text || typing) return;

    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setTyping(true);

    // Check for agent request keywords
    if (/agent|human|person|call me|speak to|talk to/i.test(text)) {
      setTyping(false);
      addBot('Connecting you to an agent now...');
      sendToAgent();
      return;
    }

    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: historyRef.current }),
      });

      const data = await r.json();
      const answer = data.answer ?? 'Sorry, no response received.';

      // Update conversation history for context
      historyRef.current = [
        ...historyRef.current,
        { role: 'user',  parts: [{ text }] },
        { role: 'model', parts: [{ text: answer }] },
      ].slice(-10);

      setTyping(false);
      addBot(answer);
    } catch {
      setTyping(false);
      addBot('❌ Connection error. Please try again or call us at +961 03 859 219.');
    }
  }

  if (!isOpen) return null;

  return (
    <div className="chatbot-panel">
      <div className="chatbot-head">
        <div className="bot-avatar">✈️</div>
        <div className="bot-info">
          <div className="bot-name">Ziggy – Darazi AI</div>
          <div className="bot-status">AI Travel Assistant</div>
        </div>
        <button className="chatbot-head-close" onClick={onClose} aria-label="Close chat">×</button>
      </div>

      <div className="chatbot-messages">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`} style={{ whiteSpace: 'pre-wrap' }}>{m.text}</div>
        ))}
        {typing && (
          <div className="msg bot typing-indicator">
            <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chatbot-quick">
        {['Our packages', 'Prices', 'Book a trip', 'Working hours'].map(q => (
          <button key={q} className="quick-btn" onClick={() => { setInput(q); inputRef.current?.focus(); }}>
            {q}
          </button>
        ))}
      </div>

      <div className="chatbot-input-row">
        <input
          ref={inputRef}
          className="chatbot-input"
          type="text"
          placeholder="Ask me anything…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
        />
        <button className="chatbot-send" onClick={send} disabled={typing} aria-label="Send">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
