'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

const ResetForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const API_URL = process.env.NODE_ENV === 'development'
                  ? 'http://localhost:3000'
                  : process.env.NEXT_PUBLIC_SITE_URL;
  const handleRecover = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${API_URL}/api/shopify/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || result.error || 'Reset failed');
      }

      setSuccess(result.message || 'Reset link sent successfully!');
      router.push('/account/login');
    } catch (err: unknown) {
          if (err instanceof Error) {
        console.error('Error:', err.message)
        setError(err.message)
      } else {
        console.error('Unexpected error:', err)
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <form className="space-y-4" onSubmit={handleRecover}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-3 focus:outline-none focus:ring-black focus:border-black"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {error && <p className="text-red-600! text-sm mb-4!">{error}</p>}
      {success && <p className="text-green-600! text-sm mb-4!">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-main-color w-full rounded hover:bg-black hover:text-white transition text-sm!"
      >
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>
    </form>
  )
}
export default ResetForm