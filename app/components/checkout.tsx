'use client'

import { CreateInput, Address } from 'thai-address-autocomplete-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { Check, Package } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  lang: string
  amount: string
}

type ShippingForm = z.infer<typeof shippingSchema>

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

export default function CheckoutForm({ lang, amount }: Props) {
  const [address, setAddress] = useState<Address>({
    district: '',
    amphoe: '',
    province: '',
    zipcode: '',
  })

  const router = useRouter();

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

  const handleSelect = (selected: Address) => {
    setAddress(selected)
    setValue('district', selected.district)
    setValue('amphoe', selected.amphoe)
    setValue('province', selected.province)
    setValue('zipcode', selected.zipcode.toString())
    trigger(['district', 'amphoe', 'province', 'zipcode'])
  }

  const handleAddressSelect = (selected: Address) => {
    setAddress(selected)
    setValue('district', selected.district)
    setValue('amphoe', selected.amphoe)
    setValue('province', selected.province)
    setValue('zipcode', selected.zipcode.toString())
    trigger(['district', 'amphoe', 'province', 'zipcode'])
  }

  const onSubmit = async (data: ShippingForm) => {
    console.log('ที่อยู่จัดส่ง:', { ...data, ...address })
    alert('บันทึกที่อยู่เรียบร้อย! ไปชำระเงินได้เลย')
    router.push(`/${lang}/payment?amount=${amount}`)
  }

  return (
    <>
      {/* Progress Bar - Molly Style */}

      <div className="max-w-xl! w-full container mt-8 md:mt-0">
        <div className="mx-auto">
          <div className="grid">
            {/* LEFT: Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                {/* Contact */}
                <section>
                  <h2 className="text-2xl font-bold mb-4!">Contact</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input {...register('fullName')} placeholder="ชื่อ-นามสกุล" className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition" />
                    <input {...register('phone')} placeholder="เบอร์โทร" maxLength={10} className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition" />
                    {/* <input {...register('email')} placeholder="อีเมลล์" className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition" /> */}
                  </div>
                </section>

                {/* Shipping Address */}
                <section>
                  <h2 className="text-2xl font-bold mb-4! flex items-center gap-3">
                    <Package className="w-8 h-8" />
                    Shipping Address
                  </h2>
                  <input {...register('addressLine')} placeholder="บ้านเลขที่, หมู่, ซอย, ถนน" className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition mb-4" />

                  <div className="grid md:grid-cols-2 gap-4">
                    <ThaiAddressInput.District
                      value={address.district}
                      onChange={(v: string) => setValue('district', v)}
                      onSelect={handleSelect}
                      autoCompleteProps={{ placeholder: "ตำบล/แขวง", style: { height: '51.59px' } }}
                      className="w-full px-0 py-4 text-xl border-gray-900 focus:border-black outline-none transition"
                    />
                    <ThaiAddressInput.Amphoe
                      value={address.amphoe}
                      onChange={(v: string) => setValue('amphoe', v)}
                      onSelect={handleSelect}
                      autoCompleteProps={{ placeholder: "อำเภอ/เขต", style: { height: '51.59px' } }}
                      className="w-full px-0 py-4 text-xl border-gray-900 focus:border-black outline-none transition"
                    />
                    <ThaiAddressInput.Province
                      value={address.province}
                      onChange={(v: string) => setValue('province', v)}
                      onSelect={handleSelect}
                      autoCompleteProps={{ placeholder: "จังหวัด", style: { height: '51.59px' } }}
                      className="w-full px-0 py-4 text-xl border-gray-900 focus:border-black outline-none transition"
                    />
                    <ThaiAddressInput.Zipcode
                      value={address.zipcode}
                      onChange={(v: string) => setValue('zipcode', v)}
                      onSelect={handleSelect}
                      autoCompleteProps={{ placeholder: "รหัสไปรษณีย์", style: { height: '51.59px' } }}
                      className="w-full px-0 py-4 text-xl border-gray-900 focus:border-black outline-none transition"
                    />
                  </div>
                </section>

                {/* Payment - PromptPay Only */}
                <section>
                  <h2 className="text-3xl font-bold mb-4! flex items-center gap-3">
                    {/* <QrCode className="w-8 h-8" /> */}
                    Payment Method
                  </h2>
                  <div className="bg-gray-200 text-white p-8 rounded-none">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-white p-3">
                          {/* <QrCode className="w-10 h-10 text-black" /> */}
                        </div>
                        <div>
                          <p className="text-2xl font-bold">PromptPay QR</p>
                          <p className="text-sm opacity-90">สแกนจ่ายผ่านแอปธนาคาร</p>
                        </div>
                      </div>
                      <Check className="w-10 h-10" />
                    </div>
                  </div>
                </section>

                {/* Submit */}
                <div className="">
                  <button
                    type="submit"
                    // disabled={!isValid || isSubmitting}
                    className="btn bg-accent"
                  >
                    {isSubmitting ? 'กำลังสร้างออเดอร์...' : 'ชำระเงิน'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}