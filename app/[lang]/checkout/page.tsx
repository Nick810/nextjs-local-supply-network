// app/[lang]/checkout/shipping/page.tsx
'use client'  // ← THIS IS THE KEY LINE

import { CreateInput, Address } from 'thai-address-autocomplete-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'

// Force client component
const ThaiAddressInput = CreateInput()

// Thai validation schema
const shippingSchema = z.object({
  fullName: z.string().min(3, 'กรุณากรอกชื่อ-นามสกุล').regex(/^[\u0E00-\u0E7F\s]+$/, 'ใช้ได้เฉพาะตัวอักษรไทย'),
  phone: z.string().regex(/^0[6-9]\d{8}$/, 'เบอร์ไม่ถูกต้อง (เช่น 0812345678)'),
  addressLine: z.string().min(10, 'กรอกรายละเอียดที่อยู่ให้ครบ'),
  district: z.string().min(2, 'กรอกตำบล/แขวง'),
  amphoe: z.string().min(2, 'กรอกอำเภอ/เขต'),
  province: z.string().min(2, 'กรอกจังหวัด'),
  zipcode: z.string().length(5, 'รหัสไปรษณีย์ 5 หลัก'),
})

type ShippingForm = z.infer<typeof shippingSchema>

export default function ShippingPage() {
  const [address, setAddress] = useState<Address>({
    district: '',
    amphoe: '',
    province: '',
    zipcode: '',
  })

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema),
    mode: 'onChange',
    defaultValues: {
      district: '',
      amphoe: '',
      province: '',
      zipcode: '',
    },
  })

  const handleAddressSelect = (selected: Address) => {
    setAddress(selected)
    setValue('district', selected.district)
    setValue('amphoe', selected.amphoe)
    setValue('province', selected.province)
    setValue('zipcode', selected.zipcode.toString())
    trigger(['district', 'amphoe', 'province', 'zipcode'])
  }

  const onSubmit = async (data: ShippingForm) => {
    await new Promise(r => setTimeout(r, 1000)) // fake delay
    console.log('ที่อยู่จัดส่ง:', { ...data, ...address })
    alert('บันทึกที่อยู่เรียบร้อย! ไปชำระเงินได้เลย')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">ที่อยู่จัดส่ง</h1>
          <p className="text-lg text-gray-600">กรอกให้ครบถ้วนเพื่อการจัดส่งที่รวดเร็ว</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 md:p-12 space-y-8">
            {/* Name + Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">ชื่อ-นามสกุล (ผู้รับ)</label>
                <input
                  {...register('fullName')}
                  placeholder="สมชาย ใจดี"
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-2">{errors.fullName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">เบอร์โทรศัพท์</label>
                <input
                  {...register('phone')}
                  placeholder="0812345678"
                  maxLength={10}
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-2">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Address Line */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-2">บ้านเลขที่, หมู่, ซอย, ถนน (ละ纬エียด)</label>
              <input
                {...register('addressLine')}
                placeholder="123/45 หมู่ 6 ซอยสุขุมวิท 71 ถนนพระราม 9"
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition"
              />
              {errors.addressLine && <p className="text-red-500 text-xs mt-2">{errors.addressLine.message}</p>}
            </div>

            {/* Thai Address Autocomplete */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">ตำบล/แขวง</label>
                <ThaiAddressInput.District
                  value={address.district}
                  onChange={(v: string) => setValue('district', v)}
                  onSelect={handleAddressSelect}
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
                {errors.district && <p className="text-red-500 text-xs mt-2">{errors.district.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">อำเภอ/เขต</label>
                <ThaiAddressInput.Amphoe
                  value={address.amphoe}
                  onChange={(v: string) => setValue('amphoe', v)}
                  onSelect={handleAddressSelect}
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
                {errors.amphoe && <p className="text-red-500 text-xs mt-2">{errors.amphoe.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">จังหวัด</label>
                <ThaiAddressInput.Province
                  value={address.province}
                  onChange={(v: string) => setValue('province', v)}
                  onSelect={handleAddressSelect}
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
                {errors.province && <p className="text-red-500 text-xs mt-2">{errors.province.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-2">รหัสไปรษณีย์</label>
                <ThaiAddressInput.Zipcode
                  value={address.zipcode}
                  onChange={(v: string) => setValue('zipcode', v)}
                  onSelect={handleAddressSelect}
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                />
                {errors.zipcode && <p className="text-red-500 text-xs mt-2">{errors.zipcode.message}</p>}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t-2 border-gray-100">
              <Link
                href="/cart"
                className="flex-1 text-center py-4 rounded-xl border-2 border-gray-300 font-bold hover:bg-gray-50 transition"
              >
                กลับไปตะกร้า
              </Link>
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className={`flex-1 py-4 rounded-xl font-bold text-white transition shadow-xl ${
                  isValid && !isSubmitting
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? 'กำลังบันทึก...' : 'ไปหน้าชำระเงิน'}
              </button>
            </div>
          </div>

          {/* Trust footer */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-8 py-6 text-center">
            <p className="text-sm font-medium text-gray-700">
              จัดส่งโดย Kerry • Flash • J&T • Thailand Post | รับประกันที่อยู่ถูกต้อง 100%
            </p>
          </div>
        </form>
      </div>
    </main>
  )
}