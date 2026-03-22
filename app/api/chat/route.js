import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

async function buildSystem() {
  const { data: packages = [] } = await supabase.from('packages').select('*').order('id');


  const packageList = packages.length > 0
    ? packages.map((p, i) => {
        const parts = [`${i + 1}. ${p.name}${p.location ? ` (${p.location})` : ''}`];
        if (p.price)  parts.push(`$${p.price}/person`);
        if (p.nights) parts.push(p.nights);
        if (p.hotel)  parts.push(p.hotel);
        if (p.meals)  parts.push(p.meals);
        if (p.desc || p.description) parts.push(p.desc || p.description);
        return parts.join(' — ');
      }).join('\n')
    : 'No packages currently listed. Direct users to visit the Packages page or call us.';

  return `You are Ziggy, the friendly AI travel assistant for Darazi Travels, based in Tripoli, Lebanon.

About Darazi Travels:
- Phone: +961 03 859 219
- Email: fdarazitravel@gmail.com
- Working hours: Monday–Saturday, 10am–5pm Lebanon time
- Website packages page: /packages

Available packages right now:
${packageList}

Rules you must follow:
- ONLY discuss packages and prices from the list above — never invent or guess any package, price, or detail not listed
- If asked about a package or price not in the list, say "Please check our Packages page or call us at +961 03 859 219 for the latest offers"
- For booking, always direct to +961 03 859 219 or the Contact page
- You can answer general travel questions (visa tips, packing, destinations) as a knowledgeable assistant
- Keep answers concise — 2-4 sentences max unless more detail is requested`;
}

export async function POST(req) {
  try {
    const { message, history = [] } = await req.json();
    if (!message?.trim()) return NextResponse.json({ answer: 'Please send a message.' });

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        answer: "The AI assistant isn't configured yet. Please call us at +961 03 859 219 — we'd love to help!",
      });
    }

    // Convert history from Gemini format to OpenAI format
    const messages = [
      { role: 'system', content: await buildSystem() },
      ...history.map(h => ({
        role: h.role === 'model' ? 'assistant' : 'user',
        content: h.parts?.[0]?.text ?? '',
      })),
      { role: 'user', content: message },
    ];

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages,
        max_tokens: 400,
        temperature: 0.75,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Groq error:', err);
      throw new Error('Groq API error');
    }

    const data = await res.json();
    const answer = data.choices?.[0]?.message?.content?.trim()
      || "I'm not sure how to answer that. Please call us at +961 03 859 219.";

    return NextResponse.json({ answer });
  } catch (e) {
    console.error('Chat route error:', e);
    return NextResponse.json({
      answer: "Sorry, I'm having a moment. Please try again or call us at +961 03 859 219.",
    });
  }
}
