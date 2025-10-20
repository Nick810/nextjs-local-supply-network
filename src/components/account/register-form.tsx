'use client'

import { useRouter } from "next/navigation";
import { useState } from "react"

const RegisterForm = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const API_URL = process.env.NODE_ENV === 'development'
                  ? 'http://localhost:3000'
                  : process.env.NEXT_PUBLIC_SITE_URL;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch(`${API_URL}/api/shopify/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          phone
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || result.error || 'Signup failed')
      }

      setSuccess('Account created and logged in successfully!')

      router.push('/account');
      
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error:', err.message)
        setError(err.message)
      } else {
        console.error('Unexpected error:', err)
        setError('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-3 focus:outline-none focus:ring-black focus:border-black"
          required
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-3 focus:outline-none focus:ring-black focus:border-black"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-3 focus:outline-none focus:ring-black focus:border-black"
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone
        </label>
        <input
          type="phone"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-3 focus:outline-none focus:ring-black focus:border-black"
          placeholder="Pease enter phone number with country code (e.g., +6691-456-7890)"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-3 focus:outline-none focus:ring-black focus:border-black"
          required
        />
      </div>

      {error && <p className="text-red-600! text-sm mb-4!">{error}</p>}
      {success && <p className="text-green-600! text-sm mb-4!">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-main-color w-full rounded hover:bg-black hover:text-white transition text-sm!"
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  )
}
export default RegisterForm