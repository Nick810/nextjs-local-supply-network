'use client'

import { useState } from "react";
import { useTranslations } from 'next-intl';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const t = useTranslations('footer');

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
    <div className="pb-8 relative z-10 w-full md:w-[40%] md:order-2 md:pt-0">
      <h2 className="text-2xl mb-4! text-black!">{ t('subscription_box.title') }</h2>
      <p className="mb-6!">{ t('subscription_box.paragraph') }</p>
      <form onSubmit={handleSubmit} className="w-full relative">
        <input
          suppressHydrationWarning
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('subscription_box.placeholder')}
          required
          className="w-full p-5 pr-32 border border-[#949494] rounded mb-2"
        />
        <button type="submit" className="w-x border border-black text-black! p-2 rounded absolute right-0 top-1/2 -translate-y-[22px] mr-6 cursor-pointer">
          {t('subscription_box.btnText')}
        </button>
        {status && <p className="mt-2 text-sm text-gray-600">{status}</p>}
    </form>
    </div>
  )
}
export default Subscribe