'use client'

import { useState, FormEvent } from 'react'
import { toast } from 'react-toastify'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const API_URL = process.env.NODE_ENV === 'development'
                  ? 'http://localhost:3000'
                  : process.env.NEXT_PUBLIC_SITE_URL;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')
    
    try {
      const res = await fetch(`${API_URL}/api/send`, {
        method: 'POST',
        body: JSON.stringify({
          type: 'contact',
          to: 'support@powerberryharvest.com',
          subject: form.subject,
          data: {
            name: form.name,
            email: form.email,
            message: form.message,
          },
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const { error } = await res.json()
        toast.error("There's an error sending email. Please try again later.")
        throw new Error(error || 'Something went wrong')
      }

      setStatus('success')
      toast.success("Email sent successfully. Thank you for contacting us. We'll get back to you as soon as possible.")
      setForm({ name: '', email: '', message: '', subject: '' })
    } catch (err: unknown) {
      setStatus('error')

       // narrow error to Error
      if (err instanceof Error) {
        setErrorMsg(err.message)
        toast.error(err.message)
      } else {
        setErrorMsg('An unexpected error occurred.')
        toast.error("An unexpected error occurred.")
      }
    }
  }

  return (
    <div className='m-auto max-w-2xl'>
      <form onSubmit={handleSubmit} className="space-y-4 text-[#333]">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-3"
          />
        </div>

        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-3"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block font-medium mb-1">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="subject"
            required
            value={form.subject}
            onChange={handleChange}
            className="w-full border rounded px-3 py-3"
          />
        </div>

        <div>
          <label htmlFor="message" className="block font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={form.message}
            onChange={handleChange}
            className="w-full border rounded px-3 py-3"
          />
        </div>

        {status === 'error' && (
          <p className="text-red-600! mb-4!">{errorMsg || 'Submission failed.'}</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn btn-main-color text-md!"
        >
          {status === 'submitting' ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
