import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="relative overflow-hidden px-20 py-20 text-center bg-violet-50">
      <span className="inline-block px-3 py-1.5 rounded-full bg-white text-sm font-medium text-violet-600">
        📬 Stay in the Loop
      </span>
      <h2 className="mt-5 text-3xl font-bold text-zinc-900 max-w-2xl mx-auto">
        Get the latest job alerts delivered to you
      </h2>
      <p className="mt-3 text-zinc-600 max-w-xl mx-auto">
        Subscribe to our weekly newsletter and never miss a great opportunity.
        Career tips, new openings, and market insights — straight to your inbox.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex justify-center gap-3 max-w-xl mx-auto">
        <div className="flex-1 flex items-center gap-2 rounded-xl bg-white border border-zinc-200 px-4">
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 py-4 text-sm outline-none bg-transparent"
          />
        </div>
        <button type="submit" className="px-6 py-4 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700">
          Subscribe
        </button>
      </form>

      <div className="mt-5 flex items-center justify-center gap-6 text-sm text-zinc-500">
        <span className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Join 25,000+ subscribers
        </span>
        <span className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          No spam, unsubscribe anytime
        </span>
      </div>
    </section>
  );
}