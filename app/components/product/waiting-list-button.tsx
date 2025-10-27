'use client';

import { useState } from "react";
import { toast } from "react-toastify";

type ButtonProps = {
  productTitle: string
  variantTitle: string
}

const API_URL = process.env.NODE_ENV === 'development'
                  ? 'http://localhost:3000'
                  : process.env.NEXT_PUBLIC_SITE_URL;

const WaitlistButton: React.FC<ButtonProps> = ({ productTitle, variantTitle }) => {
  const [email, setEmail] = useState('');
  const [ name, setName ] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/send`, {
        method: 'POST',
        body: JSON.stringify({ 
          type: 'waitlist',
          to: 'support@powerberryharvest.com',
          subject: `Waitlist ALERT! for ${productTitle} by ${email}`,
          data: {
            name: name,
            email: email,
            productTitle: productTitle,
            variantTitle: variantTitle || ''
          }
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      setSubmitted(true);
      toast.success("You've been added to the waitlist! We'll notify you when it's available.");
    } catch (err: unknown) {
        // narrow error to Error
      if (err instanceof Error) {
        setError(err.message)
        toast.error(err.message)
      } else {
        setError('An unexpected error occurred.')
        toast.error("An unexpected error occurred.")
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      {submitted ? (
        <p className="">You&apos;re on the waitlist! We&apos;ll notify you when it&apos;s available.</p>
      ) : (
        <div className="flex flex-col gap-2 max-w-xl">
          <input
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border px-3 py-3 rounded text-sm"
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border px-3 py-3 rounded text-sm"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-3 rounded text-white! transition cursor-pointer ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
            }`}
          >
            {loading ? 'Joining...' : 'Join Waitlist'}
          </button>
          {error && <p className="text-red-600 text-sm mt-2!">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default WaitlistButton;
