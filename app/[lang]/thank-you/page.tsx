'use client'

import { CheckCircle2, Package, Truck } from 'lucide-react'

export default function Page() {
  return (
    <main className="py-32">
      <div className="max-w-2xl mx-auto text-center container">
        <CheckCircle2 className="w-32 h-32 text-emerald-600 mx-auto mb-8" />
        <h1 className="text-5xl font-bold mb-4!">ชำระเงินสำเร็จ!</h1>
        <p className="text-2xl text-gray-700 mb-8!">ขอบคุณที่อุดหนุน เราจะจัดส่งสินค้าภายใน 24 ชม.</p>

        <div className="bg-white rounded-3xl shadow-2xl p-10 space-y-6">
          <div className="flex items-center justify-center gap-4 text-xl">
            <Package className="w-10 h-10 text-emerald-600" />
            <span>เตรียมแพ็คสินค้า</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-xl">
            <Truck className="w-10 h-10 text-emerald-600" />
            <span>ส่ง Kerry Express พรุ่งนี้</span>
          </div>

          <a
            href="https://www.google.com"
            className="block mt-10 bg-emerald-600 text-white py-5 rounded-2xl text-xl font-bold"
          >
            ติดตามสถานะพัสดุ
          </a>
        </div>
      </div>
    </main>
  )
}