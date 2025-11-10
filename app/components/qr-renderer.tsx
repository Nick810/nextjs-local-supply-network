'use client'

import Image from "next/image"

type Props = {
  data: string
}

export default function QRrenderer({ data }: Props) {
  return (
    <div>
      {data && <Image src={data} alt="PromptPay QR" width={300} height={300} />}
    </div>
  )
}