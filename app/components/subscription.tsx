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
    <div className="pt-16 pb-8">
      <h2 className="text-2xl mb-4! text-black!">15% off on your first order?</h2>
      <p className="mb-6!">subscribe below to get instant discounts, exclusive deals and news</p>
      <form onSubmit={handleSubmit} className="w-full relative">
        <input
          suppressHydrationWarning
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email here. you@example.com"
          required
          className="w-full p-5 pr-32 border border-[#949494] rounded mb-2"
        />
        <button type="submit" className="w-x border border-black text-black! p-2 rounded absolute right-0 top-1/2 -translate-y-[22px] mr-6 cursor-pointer">
          Subscribe
        </button>
        {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
    </form>
    </div>
  )
}
export default Subscribe