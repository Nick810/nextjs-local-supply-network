'use client'

import Image from "next/image"
import { useEffect, useState } from "react"

// type Props = {
//   data: string
// } 

export default function QRrenderer() {
  const [qr, setQr] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/promptpay', { method: 'POST' })
      .then(res => res.json())
      .then(data => setQr(data.qr))
  }, [])

  if (!qr) return <p className="text-gray-400">Generating QR code...</p>

  return (
    <div>
      <Image src={qr} alt="PromptPay QR" width={300} height={300} />
    </div>
  )
}