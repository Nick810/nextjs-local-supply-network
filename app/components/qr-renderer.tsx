'use client'

import Image from "next/image"
import { useEffect, useState } from "react"

export default function QRrenderer({ amount }: { amount: string } ) {
  const [qr, setQr] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/promptpay', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    })
      .then(res => res.json())
      .then(data => setQr(data.qr))
      .catch(err => console.error('QR fetch error:', err));
  }, [amount])

  if (!qr) return <p className="text-gray-400">Generating QR code...</p>

  return (
    <div>
      <Image src={qr} alt="PromptPay QR" width={300} height={300} />
    </div>
  )
}