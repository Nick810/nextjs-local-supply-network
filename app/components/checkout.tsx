'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Check, Package } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from "next-intl"

type Props = {
  lang: string
  amount: string
}

// เปลี่ยนตรงนี้เป็น CDN ของคุณ
const CDN_URL = 'https://cdn.jsdelivr.net/gh/Nick810/thailand-address-cdn@latest/src/geography.json'

const shippingSchema = z.object({
  fullName: z.string().min(3, 'กรุณากรอกชื่อ-นามสกุล').regex(/^[\u0E00-\u0E7F\s]+$/, 'ใช้ได้เฉพาะตัวอักษรไทย'),
  email: z.string().email('รูปแบบอีเมลไม่ถูกต้อง').optional().or(z.literal('')),
  phone: z.string().regex(/^0[6-9]\d{8}$/, 'เบอร์ไม่ถูกต้อง (เช่น 0812345678)'),
  addressLine: z.string().min(10, 'กรอกรายละเอียดที่อยู่ให้ครบ'),
  district: z.string().min(1),
  amphoe: z.string().min(1),
  province: z.string().min(1),
  zipcode: z.string().length(5, 'รหัสไปรษณีย์ 5 หลัก'),
})

type ShippingForm = z.infer<typeof shippingSchema>
interface GeoItem {
  provinceCode: number
  provinceNameTh: string
  provinceNameEn: string
  districtCode: number
  districtNameTh: string
  districtNameEn: string
  subdistrictCode: number
  subdistrictNameTh: string
  subdistrictNameEn: string
  postalCode: string
}

export default function CheckoutForm({ lang, amount }: Props) {
  const t = useTranslations('checkout')
  const router = useRouter()
  const isEN = lang === 'en'

  const [data, setData] = useState<GeoItem[]>([])
  const [provinces, setProvinces] = useState<GeoItem[]>([])
  const [districts, setDistricts] = useState<GeoItem[]>([])
  const [subdistricts, setSubdistricts] = useState<GeoItem[]>([])

  const [selectedProvCode, setSelectedProvCode] = useState<number>(0)
  const [selectedDistCode, setSelectedDistCode] = useState<number>(0)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
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

  // โหลดข้อมูลครั้งเดียว
  useEffect(() => {
    fetch(CDN_URL)
      .then(r => r.json())
      .then((raw: GeoItem[]) => {
        setData(raw)

        // ดึงจังหวัดไม่ซ้ำ (ใช้ provinceCode เป็น key)
        const provMap = new Map<number, GeoItem>()
        raw.forEach(item => {
          if (!provMap.has(item.provinceCode)) {
            provMap.set(item.provinceCode, item)
          }
        })
        setProvinces(Array.from(provMap.values()))
      })
      .catch(() => alert('โหลดข้อมูลที่อยู่ล้มเหลว กรุณารีเฟรช'))
  }, [])

  // เมื่อเลือกจังหวัด
  const handleProvinceChange = (code: string) => {
    const codeNum = Number(code)
    setSelectedProvCode(codeNum)
    setSelectedDistCode(0)
    setDistricts([])
    setSubdistricts([])
    setValue('amphoe', '')
    setValue('district', '')
    setValue('zipcode', '')
    setValue('province', isEN ? data.find(d => d.provinceCode === codeNum)?.provinceNameEn || '' 
                              : data.find(d => d.provinceCode === codeNum)?.provinceNameTh || '')

    // ดึงอำเภอในจังหวัดนี้
    const distMap = new Map<number, GeoItem>()
    data.forEach(item => {
      if (item.provinceCode === codeNum && !distMap.has(item.districtCode)) {
        distMap.set(item.districtCode, item)
      }
    })
    setDistricts(Array.from(distMap.values()))
  }

  // เมื่อเลือกอำเภอ
  const handleDistrictChange = (code: string) => {
    const codeNum = Number(code)
    setSelectedDistCode(codeNum)
    setSubdistricts([])
    setValue('district', '')
    setValue('zipcode', '')
    setValue('amphoe', isEN ? data.find(d => d.districtCode === codeNum)?.districtNameEn || ''
                            : data.find(d => d.districtCode === codeNum)?.districtNameTh || '')

    // ดึงตำบลในอำเภอนี้
    const filtered = data.filter(item => item.districtCode === codeNum)
    setSubdistricts(filtered)
  }

  // เมื่อเลือกตำบล
  const handleSubdistrictChange = (code: string) => {
    const item = subdistricts.find(s => s.subdistrictCode === Number(code))
    if (item) {
      setValue('district', isEN ? item.subdistrictNameEn : item.subdistrictNameTh)
      setValue('zipcode', item.postalCode)
    }
  }

  const onSubmit = (data: ShippingForm) => {
    console.log('ที่อยู่:', data)
    alert('บันทึกที่อยู่เรียบร้อย!')
    router.push(`/${lang}/payment?amount=${amount}`)
  }

  return (
    <div className="max-w-xl w-full container mt-8 md:mt-0">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold mb-4!">{t('contact')}</h2>
          <div className='mb-4'>
            <input {...register('fullName')} placeholder={t('placeholder.name')} className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition" />
            {errors.fullName && <p className="text-red-500! text-sm mt-1">{errors.fullName.message}</p>}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <input {...register('phone')} placeholder={t('placeholder.phone')} maxLength={10} className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition" />
              {errors.phone && <p className="text-red-500! text-sm mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <input
                {...register('email')}
                type="email"
                placeholder={t('placeholder.email')}
                className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition"
              />
              {errors.email && <p className="text-red-500! text-sm mt-1">{errors.email.message}</p>}
            </div>
          </div>
        </section>

        {/* Shipping Address */}
        <section>
          <h2 className="text-2xl font-bold mb-4! flex items-center gap-3">
            <Package className="w-8 h-8" />
            {t('address')}
          </h2>

          <div className="mb-4">
            <input {...register('addressLine')} placeholder={t('placeholder.address')} className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition" />
            {errors.addressLine && <p className="text-red-500! text-sm mt-1">{errors.addressLine.message}</p>}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* จังหวัด */}
            <select
              onChange={(e) => handleProvinceChange(e.target.value)}
              className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition"
            >
              <option value="">-- {isEN ? 'Province' : 'จังหวัด'} --</option>
              {provinces.map(p => (
                <option key={p.provinceCode} value={p.provinceCode}>
                  {isEN ? p.provinceNameEn : p.provinceNameTh}
                </option>
              ))}
            </select>

            {/* อำเภอ */}
            <select
              onChange={(e) => handleDistrictChange(e.target.value)}
              disabled={!selectedProvCode}
              className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition"
            >
              <option value="">-- {isEN ? 'District' : 'อำเภอ/เขต'} --</option>
              {districts.map(d => (
                <option key={d.districtCode} value={d.districtCode}>
                  {isEN ? d.districtNameEn : d.districtNameTh}
                </option>
              ))}
            </select>

            {/* ตำบล */}
            <select
              onChange={(e) => handleSubdistrictChange(e.target.value)}
              disabled={!selectedDistCode}
              className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition"
            >
              <option value="">-- {isEN ? 'Sub-district' : 'ตำบล/แขวง'} --</option>
              {subdistricts.map(s => (
                <option key={s.subdistrictCode} value={s.subdistrictCode}>
                  {isEN ? s.subdistrictNameEn : s.subdistrictNameTh}
                </option>
              ))}
            </select>

            {/* รหัสไปรษณีย์ */}
            <input
              {...register('zipcode')}
              readOnly
              placeholder={isEN ? 'Postal Code' : 'รหัสไปรษณีย์'}
              className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md bg-gray-50"
            />
          </div>
          {errors.zipcode && <p className="text-red-500! text-sm mt-4">{errors.zipcode.message}</p>}
        </section>

        {/* Payment */}
        <section>
          <h2 className="text-3xl font-bold mb-4!">
            {t('payment_method.title')}
          </h2>
          <div className="bg-gray-200 text-white p-8 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-white p-3 rounded-full text-black">
                  QR
                </div>
                <div>
                  <p className="font-bold">{t('payment_method.method')}</p>
                  <p className="text-sm opacity-90">{t('payment_method.description')}</p>
                </div>
              </div>
              <Check className="w-10 h-10" />
            </div>
          </div>
        </section>

        <button
          type="submit"
          disabled={isSubmitting || !selectedProvCode || !selectedDistCode}
          className="btn bg-accent"
        >
          {isSubmitting ? 'กำลังบันทึก...' : 'ชำระเงิน'}
        </button>
      </form>
    </div>
  )
}