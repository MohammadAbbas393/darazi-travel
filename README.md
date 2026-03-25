# Darazi Travels

A full-stack travel agency website built for Darazi Travels, a travel agency based in Tripoli, Lebanon. The site lets customers browse packages, contact the agency, and chat with an AI travel assistant. Admins can manage packages and content directly from the site.

## Features

- **Package browsing** - customers can view travel packages with pricing, hotel details, and meal plans
- **AI chatbot (Ziggy)** - an AI-powered travel assistant that answers questions about packages, gives travel tips, and guides users to book. Powered by Groq (Llama 3.1) and only talks about real packages pulled from the database
- **Contact form** - customers can send inquiries directly from the site
- **Photo gallery** - showcases destinations and past trips
- **Admin panel** - protected dashboard where the agency can add, edit, or remove packages without touching code
- **Supabase backend** - all package data is stored in Supabase and fetched dynamically at runtime

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | CSS (custom, no framework) |
| Database | Supabase (PostgreSQL) |
| AI Chatbot | Groq API (llama-3.1-8b-instant) |
| Language | JavaScript |

## Getting Started

### Prerequisites

- Node.js 18 or higher
- A Supabase project with a `packages` table
- A Groq API key (free at console.groq.com)

### Installation

```bash
# 1. Clone the repo
git clone <repo-url>
cd darazi-travels-next

# 2. Install dependencies
npm install

# 3. Create a .env.local file
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

## Project Structure

```
darazi-travels-next/
├── app/
│   ├── page.js             # Home page (hero, features, packages, CTA)
│   ├── about/              # About the agency
│   ├── packages/           # All packages listing
│   ├── gallery/            # Photo gallery
│   ├── contact/            # Contact form
│   ├── admin/              # Admin dashboard (add/edit packages)
│   └── api/
│       └── chat/
│           └── route.js    # AI chatbot API endpoint
├── components/
│   ├── Chatbot.jsx         # Chat widget (floats on all pages)
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── GalleryCarousel.jsx
├── data/                   # Static fallback data
├── lib/
│   └── supabase.js         # Supabase client setup
└── public/                 # Images and assets
```

## How the Chatbot Works

The chatbot (named Ziggy) is a floating chat widget that appears on every page. When a user sends a message:

1. The frontend sends the message and conversation history to `/api/chat`
2. The API fetches the latest packages from Supabase and builds a system prompt
3. The system prompt tells Ziggy to only discuss real packages and never make up prices or details
4. The message is sent to the Groq API using the `llama-3.1-8b-instant` model
5. The response is returned to the user

If the `GROQ_API_KEY` is not set, the chatbot falls back to a message asking users to call the agency directly.

## Database Setup (Supabase)

The `packages` table should have these columns:

| Column | Type | Notes |
|---|---|---|
| id | int | Auto-increment primary key |
| name | text | Package name |
| location | text | Destination |
| price | numeric | Price per person |
| nights | text | e.g. "3 Nights" |
| hotel | text | Hotel name or rating |
| meals | text | e.g. "All-Inclusive" |
| description | text | Short description |
| badge | text | Optional label like "Most Popular" |
| img | text | Image URL |

## Deployment

The app is designed to deploy on Vercel.

```bash
# Deploy with Vercel CLI
vercel
```

Make sure to add all environment variables in your Vercel project settings.
