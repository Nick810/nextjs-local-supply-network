'use client'

import { useState } from "react";

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setStatus('Thanks for subscribing!');
      setEmail('');
    } else {
      setStatus('Something went wrong. Try again.');
    }
  };

  return (
    <div className="py-16">
      <h2 className="uppercase text-2xl mb-6! text-white!">15% Off on your first order</h2>
      
      <form onSubmit={handleSubmit} className="w-full p-4 bg-white shadow rounded">
      <input
        suppressHydrationWarning
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button type="submit" className="w-full bg-black text-white! p-2 rounded">
        Subscribe
      </button>
      {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
    </form>
    </div>
  )
}
export default Subscribe