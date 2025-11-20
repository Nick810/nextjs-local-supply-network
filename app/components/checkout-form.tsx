// 'use client'

// import { useState, useEffect, useMemo } from 'react'
// import { useForm, useWatch } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { z } from 'zod'
// import { Check, Package, UserPen, MessageCircle, Send } from 'lucide-react'
// import { useRouter } from 'next/navigation'
// import { useTranslations } from "next-intl"
// import { useCartStore } from '../lib/shopify/cart/cart-store'
// import { toast } from 'sonner'
// import Image from 'next/image'
// import PromptpayLogo from '@/public/promptpay-logo.png'

// type Props = { lang: string; amount: string }

// const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL!

// interface GeoItem {
//   provinceCode: number
//   provinceNameTh: string
//   provinceNameEn: string
//   districtCode: number
//   districtNameTh: string
//   districtNameEn: string
//   subdistrictCode: number
//   subdistrictNameTh: string
//   subdistrictNameEn: string
//   postalCode: string
// }

// export default function CheckoutForm({ lang, amount }: Props) {
//   const t = useTranslations('checkout')
//   const router = useRouter()
//   const isEN = lang === 'en'
//   const items = useCartStore(s => s.items)

//   // ───── เปลี่ยนตรงนี้ได้เลย ─────
//   const LINE_OA_URL = "https://lin.ee/c1Bz3po"
//   const TELEGRAM_GROUP = "https://t.me/yourgroup"
//   // ─────────────────────────────

//   const [shippingMethod, setShippingMethod] = useState<'regular' | 'express'>('regular')
//   const shippingFee = shippingMethod === 'express' ? 0 : 40
//   const finalTotal = Number(amount) + shippingFee

//   // ข้อมูลที่อยู่
//   const [data, setData] = useState<GeoItem[]>([])
//   const [provinces, setProvinces] = useState<GeoItem[]>([])
//   const [districts, setDistricts] = useState<GeoItem[]>([])
//   const [subdistricts, setSubdistricts] = useState<GeoItem[]>([])
//   const [selectedProvCode, setSelectedProvCode] = useState(0)
//   const [selectedDistCode, setSelectedDistCode] = useState(0)

//   const shippingSchema = useMemo(() => z.object({
//     fullName: z.string().min(3, t('shipping_schema.name_1')).regex(/^[\u0E00-\u0E7F\sA-Za-z]+$/, t('shipping_schema.name_2')),
//     phone: z.string().regex(/^0[6-9]\d{8}$/, t('shipping_schema.phone')),
//     email: z.string().email(t('shipping_schema.email')).optional().or(z.literal('')),
//     addressLine: shippingMethod === 'regular' ? z.string().min(10, t('shipping_schema.address')) : z.string().optional(),
//     province: shippingMethod === 'regular' ? z.string().min(1) : z.string().optional(),
//     amphoe: shippingMethod === 'regular' ? z.string().min(1) : z.string().optional(),
//     district: shippingMethod === 'regular' ? z.string().min(1) : z.string().optional(),
//     zipcode: shippingMethod === 'regular' ? z.string().regex(/^\d{5}$/, t('shipping_schema.zipcode')) : z.string().optional(),
//   }), [t, shippingMethod])

//   const { register, handleSubmit, setValue, control, formState: { errors, isSubmitting } } = useForm({
//     resolver: zodResolver(shippingSchema),
//     mode: 'onChange',
//     defaultValues: { district: '', amphoe: '', province: '', zipcode: '' },
//   })

//   const watch = useWatch({ control })

//   useEffect(() => {
//     if (shippingMethod === 'express') return
//     fetch(CDN_URL)
//       .then(r => r.json())
//       .then((raw: GeoItem[]) => {
//         setData(raw)
//         const provMap = new Map<number, GeoItem>()
//         raw.forEach(i => { if (!provMap.has(i.provinceCode)) provMap.set(i.provinceCode, i) })
//         setProvinces(Array.from(provMap.values()))
//       })
//   }, [shippingMethod])

//   // ───── ฟังก์ชันเดิมของคุณทั้งหมด (ไม่แตะ) ─────
//   const handleProvinceChange = (code: string) => {
//     const codeNum = Number(code)
//     setSelectedProvCode(codeNum); setSelectedDistCode(0); setDistricts([]); setSubdistricts([])
//     setValue('amphoe', ''); setValue('district', ''); setValue('zipcode', '')
//     setValue('province', isEN ? data.find(d => d.provinceCode === codeNum)?.provinceNameEn || '' : data.find(d => d.provinceCode === codeNum)?.provinceNameTh || '')

//     const distMap = new Map<number, GeoItem>()
//     data.forEach(item => { if (item.provinceCode === codeNum && !distMap.has(item.districtCode)) distMap.set(item.districtCode, item) })
//     setDistricts(Array.from(distMap.values()))
//   }

//   const handleDistrictChange = (code: string) => {
//     const codeNum = Number(code)
//     setSelectedDistCode(codeNum); setSubdistricts([])
//     setValue('district', ''); setValue('zipcode', '')
//     setValue('amphoe', isEN ? data.find(d => d.districtCode === codeNum)?.districtNameEn || '' : data.find(d => d.districtCode === codeNum)?.districtNameTh || '')

//     const filtered = data.filter(item => item.districtCode === codeNum)
//     setSubdistricts(filtered)
//   }

//   const handleSubdistrictChange = (code: string) => {
//     const item = subdistricts.find(s => s.subdistrictCode === Number(code))
//     if (item) {
//       setValue('district', isEN ? item.subdistrictNameEn : item.subdistrictNameTh)
//       setValue('zipcode', String(item.postalCode).trim())
//     }
//   }

//   const onSubmit = async (data: any) => {
//     const payload: any = {
//       fullName: data.fullName,
//       phone: data.phone,
//       email: data.email || null,
//       totalAmount: amount,
//       finalTotal: finalTotal.toString(),
//       shippingMethod,
//       shippingFee: shippingFee.toString(),
//       items: items.map(i => ({
//         variantId: i.variantId,
//         title: i.title,
//         price: i.price,
//         image: i.image,
//         quantity: i.quantity,
//         varaintTitle: i.varaintTitle,
//       })),
//     }

//     if (shippingMethod === 'regular') {
//       payload.addressLine = data.addressLine
//       payload.province = watch.province
//       payload.amphoe = watch.amphoe
//       payload.district = data.district
//       payload.zipcode = data.zipcode
//     }
//     console.log(payload)
//     const createRes = await fetch('/api/create-order', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     })

//     const createResult = await createRes.json()

//     if (!createResult.success) {
//       toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่')
//       return
//     }

//     // ถ้าเป็นส่งด่วน → ส่งแจ้ง Telegram
//     if (shippingMethod === 'express') {
//       await fetch('/api/notify-telegram', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           order_id: createResult.order_id,
//           order_number: createResult.order_number || createResult.order_id,
//           full_name: data.fullName,
//           phone: data.phone,
//           email: data.email || null,
//           address_line: "ส่งด่วนพิเศษ (Messenger) — รอแอดมินคุยที่อยู่",
//           province: "-",
//           amphoe: "-",
//           district: "-",
//           zipcode: "-",
//           total_amount: finalTotal,
//           items: payload.items,
//           status: 'pending_messenger'
//         })
//       })

//       // สำคัญ: โชว์กล่องแชทหลังจากสร้างออเดอร์แล้ว
//       setOrderCreated(true)
//       toast.success('ส่งออเดอร์แล้ว! แอดมินกำลังรีบติดต่อค่ะ')
//       return // ยังไม่ไปหน้าชำระเงิน
//     }

//     // ถ้าเป็นส่งธรรมดา → ไปหน้าชำระเงินปกติ
//     toast.success('สั่งซื้อสำเร็จ!')
//     router.push(`/${lang}/payment?order_id=${createResult.order_id}&amount=${finalTotal}`)
//   }

//   return (
//     <div className="max-w-xl w-full mt-8 md:mt-0 mb-16">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">

//         {/* 1. วิธีจัดส่ง – ใช้สไตล์เดิมของคุณ */}
//         <section className='pt-8'>
//           <h2 className="text-2xl font-bold mb-6! flex items-center gap-3">
//             <Package className="w-8 h-8" />
//             {t('shipping_method.title')}
//           </h2>

//           <div className="space-y-4">
//             <label className={`flex items-center justify-between p-6 border-2 rounded-xl cursor-pointer transition-all ${shippingMethod === 'regular' ? 'border-black bg-gray-50' : 'border-gray-300'}`}
//               onClick={() => setShippingMethod('regular')}>
//               <div className="flex items-center gap-4">
//                 <input type="radio" checked={shippingMethod === 'regular'} readOnly className="w-5 h-5" />
//                 <div>
//                   <p className="font-bold text-lg">{t('shipping_method.reg_shipping')}</p>
//                   <p className="text-sm text-gray-600">{t('shipping_method.reg_shipping_time')}</p>
//                 </div>
//               </div>
//               <span className="text-2xl font-bold">฿40</span>
//             </label>

//             <label className={`flex items-center justify-between p-6 border-2 rounded-xl cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-black bg-gray-50' : 'border-gray-300'}`}
//               onClick={() => setShippingMethod('express')}>
//               <div className="flex items-center gap-4">
//                 <input type="radio" checked={shippingMethod === 'express'} readOnly className="w-5 h-5" />
//                 <div>
//                   <p className="font-bold text-lg">{t('shipping_method.exp_shipping')}</p>
//                   <p className="text-sm text-gray-600">{t('shipping_method.exp_shipping_time')}</p>
//                 </div>
//               </div>
//               <span className="text-2xl font-bold text-orange-600">฿0</span>
//             </label>
//           </div>

//           <div className="mt-6 p-4 bg-gray-100 rounded-lg text-right">
//             <p className="text-2xl font-bold">{t('order.total')}: ฿{finalTotal.toLocaleString()}</p>
//           </div>
//         </section>

//         {/* 2. Contact – เดิมเป๊ะ */}
//         {
//         shippingMethod === 'regular' && (
//           <section className='lg:mt-12'>
//             <h2 className="text-2xl font-bold mb-4! flex items-center gap-3">
//               <UserPen className="w-8 h-8" />
//               {t('contact')}
//             </h2>
//             <div className='mb-4'>
//               <input {...register('fullName')} placeholder={t('placeholder.name')} className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition" />
//               {errors.fullName && <p className="text-red-500! text-sm mt-1">{errors.fullName.message}</p>}
//             </div>
//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <input {...register('phone')} placeholder={t('placeholder.phone')} maxLength={10} className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition" />
//                 {errors.phone && <p className="text-red-500! text-sm mt-1">{errors.phone.message}</p>}
//               </div>
//               <div>
//                 <input {...register('email')} type="email" placeholder={t('placeholder.email')} className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition" />
//                 {errors.email && <p className="text-red-500! text-sm mt-1">{errors.email.message}</p>}
//               </div>
//             </div>
//           </section>
//           )
//         }

//         {/* 3. ที่อยู่ – เฉพาะส่งธรรมดา (เดิมทั้งหมด) */}
//         {shippingMethod === 'regular' && (
//           <section>
//             <h2 className="text-2xl font-bold mb-4! flex items-center gap-3">
//               <Package className="w-8 h-8" />
//               {t('address')}
//             </h2>

//             <div className="mb-4">
//               <input {...register('addressLine')} placeholder={t('placeholder.address')} className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition" />
//               {errors.addressLine && <p className="text-red-500! text-sm mt-1">{errors.addressLine.message}</p>}
//             </div>

//             <div className="grid md:grid-cols-2 gap-4">
//               <select onChange={(e) => handleProvinceChange(e.target.value)} className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition">
//                 <option value="">-- {isEN ? 'Province' : 'จังหวัด'} --</option>
//                 {provinces.map(p => (
//                   <option key={p.provinceCode} value={p.provinceCode}>
//                     {isEN ? p.provinceNameEn : p.provinceNameTh}
//                   </option>
//                 ))}
//               </select>

//               <select onChange={(e) => handleDistrictChange(e.target.value)} disabled={!selectedProvCode} className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition">
//                 <option value="">-- {isEN ? 'District' : 'อำเภอ/เขต'} --</option>
//                 {districts.map(d => (
//                   <option key={d.districtCode} value={d.districtCode}>
//                     {isEN ? d.districtNameEn : d.districtNameTh}
//                   </option>
//                 ))}
//               </select>

//               <select onChange={(e) => handleSubdistrictChange(e.target.value)} disabled={!selectedDistCode} className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition">
//                 <option value="">-- {isEN ? 'Sub-district' : 'ตำบล/แขวง'} --</option>
//                 {subdistricts.map(s => (
//                   <option key={s.subdistrictCode} value={s.subdistrictCode}>
//                     {isEN ? s.subdistrictNameEn : s.subdistrictNameTh}
//                   </option>
//                 ))}
//               </select>

//               <input {...register('zipcode')} readOnly placeholder={isEN ? 'Postal Code' : 'รหัสไปรษณีย์'} className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md bg-gray-50" />
//             </div>
//             {errors.zipcode && <p className="text-red-500! text-sm mt-4">{errors.zipcode.message}</p>}
//           </section>
//         )}

//         {/* 4. แชทแอดมิน – เฉพาะส่งด่วน */}
//         {shippingMethod === 'express' && (
//           <section className="p-8 rounded-2xl text-center border-2 border-gray-200">
//             <h2 className="text-2xl font-bold mb-6!">{t('shipping_method.exp_delivery_title')}</h2>
//             <div className="flex flex-col gap-4 max-w-sm mx-auto">
//               <a href={LINE_OA_URL} target="_blank" rel="noopener noreferrer"
//                 className="flex items-center justify-center gap-3 bg-green-500 text-white! py-5 rounded-xl text-xl font-bold! hover:bg-green-600 transition">
//                 <MessageCircle className="w-8 h-8" /> {t('button.line')}
//               </a>
//               <a href={TELEGRAM_GROUP} target="_blank" rel="noopener noreferrer"
//                 className="flex items-center justify-center gap-3 bg-[#27A1F2] text-white! py-5 rounded-xl text-xl font-bold! hover:bg-blue-600 transition">
//                 <Send className="w-8 h-8" /> {t('button.tele')}
//               </a>
//             </div>
//           </section>
//         )}

//         {/* 5. Payment – เดิมเป๊ะ */}
//         {shippingMethod === 'regular' && (
//         <section>
//           <h2 className="text-3xl font-bold mb-4!">
//             {t('payment_method.title')}
//           </h2>
//           <div className="bg-[#243f92] text-white p-8 rounded-md border-2 border-blue-500 max-w-lg">
//             <div className="flex items-center gap-8">
//               <Check className="w-8 h-8" />
//               <div className="flex items-center gap-4 g">
//                 <div className="bg-white p-3 rounded-full text-black">QR</div>
//                 <div>
//                   <p className="font-bold text-white!">{t('payment_method.method')}</p>
//                   <p className="text-sm opacity-90 text-white!">{t('payment_method.description')}</p>
//                 </div>
//                 <div className='relative aspect-video w-full max-w-20'>
//                   <Image src={PromptpayLogo} alt="" fill />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         )}

//         <button
//           type="submit"
//           disabled={isSubmitting || (shippingMethod === 'regular' && (!selectedProvCode || !selectedDistCode))}
//           className="btn bg-accent max-w-lg py-4!"
//         >
//           {isSubmitting ? t('button.submitting') : t('button.submit')}
//         </button>
//       </form>
//     </div>
//   )
// }


'use client'

import { useState, useEffect, useMemo } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Check, Package, UserPen, MessageCircle, Send, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from "next-intl"
import { useCartStore } from '../lib/shopify/cart/cart-store'
import { toast } from 'sonner'
import Image from 'next/image'
import PromptpayLogo from '@/public/promptpay-logo.png'

type Props = { lang: string; amount: string }

const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL!

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
  const items = useCartStore(s => s.items)

  // ───── เปลี่ยนตรงนี้ได้เลย ─────
  const LINE_OA_URL = "https://lin.ee/c1Bz3po"
  const TELEGRAM_GROUP = "https://t.me/yourgroup"
  // ─────────────────────────────

  const [shippingMethod, setShippingMethod] = useState<'regular' | 'express'>('regular')
  const shippingFee = shippingMethod === 'express' ? 0 : 40
  const finalTotal = Number(amount) + shippingFee
  const [orderCreated, setOrderCreated] = useState(false) // เพิ่ม state นี้

  // ข้อมูลที่อยู่
  const [data, setData] = useState<GeoItem[]>([])
  const [provinces, setProvinces] = useState<GeoItem[]>([])
  const [districts, setDistricts] = useState<GeoItem[]>([])
  const [subdistricts, setSubdistricts] = useState<GeoItem[]>([])
  const [selectedProvCode, setSelectedProvCode] = useState(0)
  const [selectedDistCode, setSelectedDistCode] = useState(0)

  const shippingSchema = useMemo(() => z.object({
    fullName: z.string().min(3, t('shipping_schema.name_1')).regex(/^[\u0E00-\u0E7F\sA-Za-z]+$/, t('shipping_schema.name_2')),
    phone: z.string().regex(/^0[6-9]\d{8}$/, t('shipping_schema.phone')),
    email: z.string().email(t('shipping_schema.email')).optional().or(z.literal('')),
    addressLine: shippingMethod === 'regular' ? z.string().min(10, t('shipping_schema.address')) : z.string().optional(),
    province: shippingMethod === 'regular' ? z.string().min(1) : z.string().optional(),
    amphoe: shippingMethod === 'regular' ? z.string().min(1) : z.string().optional(),
    district: shippingMethod === 'regular' ? z.string().min(1) : z.string().optional(),
    googleMapsLink: shippingMethod === 'express' ? z.string().url().optional().or(z.literal('')) : z.string().optional(), // เพิ่มตรงนี้
    zipcode: shippingMethod === 'regular' ? z.string().regex(/^\d{5}$/, t('shipping_schema.zipcode')) : z.string().optional(),
  }), [t, shippingMethod])

  const { register, handleSubmit, setValue, control, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(shippingSchema),
    mode: 'onChange',
    defaultValues: { district: '', amphoe: '', province: '', zipcode: '' },
  })

  const watch = useWatch({ control })

  useEffect(() => {
    if (shippingMethod === 'express') return
    fetch(CDN_URL)
      .then(r => r.json())
      .then((raw: GeoItem[]) => {
        setData(raw)
        const provMap = new Map<number, GeoItem>()
        raw.forEach(i => { if (!provMap.has(i.provinceCode)) provMap.set(i.provinceCode, i) })
        setProvinces(Array.from(provMap.values()))
      })
  }, [shippingMethod])

  // ───── ฟังก์ชันเดิมของคุณทั้งหมด (ไม่แตะ) ─────
  const handleProvinceChange = (code: string) => {
    const codeNum = Number(code)
    setSelectedProvCode(codeNum); setSelectedDistCode(0); setDistricts([]); setSubdistricts([])
    setValue('amphoe', ''); setValue('district', ''); setValue('zipcode', '')
    setValue('province', isEN ? data.find(d => d.provinceCode === codeNum)?.provinceNameEn || '' : data.find(d => d.provinceCode === codeNum)?.provinceNameTh || '')

    const distMap = new Map<number, GeoItem>()
    data.forEach(item => { if (item.provinceCode === codeNum && !distMap.has(item.districtCode)) distMap.set(item.districtCode, item) })
    setDistricts(Array.from(distMap.values()))
  }

  const handleDistrictChange = (code: string) => {
    const codeNum = Number(code)
    setSelectedDistCode(codeNum); setSubdistricts([])
    setValue('district', ''); setValue('zipcode', '')
    setValue('amphoe', isEN ? data.find(d => d.districtCode === codeNum)?.districtNameEn || '' : data.find(d => d.districtCode === codeNum)?.districtNameTh || '')

    const filtered = data.filter(item => item.districtCode === codeNum)
    setSubdistricts(filtered)
  }

  const handleSubdistrictChange = (code: string) => {
    const item = subdistricts.find(s => s.subdistrictCode === Number(code))
    if (item) {
      setValue('district', isEN ? item.subdistrictNameEn : item.subdistrictNameTh)
      setValue('zipcode', String(item.postalCode).trim())
    }
  }

  const onSubmit = async (data: any) => {
    const payload: any = {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email || null,
      totalAmount: amount,
      finalTotal: finalTotal.toString(),
      shippingMethod,
      shippingFee: shippingFee.toString(),
      googleMapsLink: data.googleMapsLink || null,
      items: items.map(i => ({
        variantId: i.variantId,
        title: i.title,
        price: i.price,
        image: i.image,
        quantity: i.quantity,
        varaintTitle: i.varaintTitle,
      })),
    }

    if (shippingMethod === 'regular') {
      payload.addressLine = data.addressLine
      payload.province = watch.province
      payload.amphoe = watch.amphoe
      payload.district = data.district
      payload.zipcode = data.zipcode
    }
    
    const createRes = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const createResult = await createRes.json()

    if (!createResult.success) {
      toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่')
      return
    }

    // ถ้าเป็นส่งด่วน → ส่งแจ้ง Telegram
    if (shippingMethod === 'express') {
      await fetch('/api/notify-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: createResult.order_id,
          order_number: createResult.order_number || createResult.order_id,
          full_name: data.fullName,
          phone: data.phone,
          email: data.email || null,
          address_line: data.googleMapsLink 
            ? `ปักหมุดแล้ว: ${data.googleMapsLink}` 
            : "ส่งด่วนพิเศษ — รอคุยที่อยู่",
          province: "-",
          amphoe: "-",
          district: "-",
          zipcode: "-",
          total_amount: finalTotal,
          items: payload.items,
          status: 'pending_express'
        })
      })
    }

    // ถ้าเป็นส่งธรรมดา → ไปหน้าชำระเงินปกติ
    toast.success('สั่งซื้อสำเร็จ!')
    router.push(`/${lang}/payment?order_id=${createResult.order_id}&amount=${finalTotal}`)
  }

  return (
    <div className="max-w-xl w-full mt-8 md:mt-0 mb-16">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">

        {/* 1. วิธีจัดส่ง – ใช้สไตล์เดิมของคุณ */}
        <section className='pt-8'>
          <h2 className="text-2xl font-bold mb-6! flex items-center gap-3">
            <Package className="w-8 h-8" />
            {t('shipping_method.title')}
          </h2>

          <div className="space-y-4">
            <label className={`flex items-center justify-between p-6 border-2 rounded-xl cursor-pointer transition-all ${shippingMethod === 'regular' ? 'border-black bg-gray-50' : 'border-gray-300'}`}
              onClick={() => setShippingMethod('regular')}>
              <div className="flex items-center gap-4">
                <input type="radio" checked={shippingMethod === 'regular'} readOnly className="w-5 h-5" />
                <div>
                  <p className="font-bold text-md">{t('shipping_method.reg_shipping')}</p>
                  <p className="text-sm text-gray-600">{t('shipping_method.reg_shipping_time')}</p>
                </div>
              </div>
              <span className="text-lg font-bold">฿40</span>
            </label>

            <label className={`flex items-center justify-between p-6 border-2 rounded-xl cursor-pointer transition-all ${shippingMethod === 'express' ? 'border-black bg-gray-50' : 'border-gray-300'}`}
              onClick={() => setShippingMethod('express')}>
              <div className="flex items-center gap-4">
                <input type="radio" checked={shippingMethod === 'express'} readOnly className="w-5 h-5" />
                <div>
                  <p className="font-bold text-md">{t('shipping_method.exp_shipping')}</p>
                  <p className="text-sm text-gray-600">{t('shipping_method.exp_shipping_time')}</p>
                </div>
              </div>
              <span className="text-lg font-bold text-orange-600">฿0</span>
            </label>
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg text-right">
            <p className="text-lg font-bold">{t('order.total')}: ฿{finalTotal.toLocaleString()}</p>
          </div>
        </section>

        {/* 2. Contact – เดิมเป๊ะ */}
        {
        
          <section className='lg:mt-12'>
            <h2 className="text-2xl font-bold mb-4! flex items-center gap-3">
              <UserPen className="w-8 h-8" />
              {t('contact')}
            </h2>
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
                <input {...register('email')} type="email" placeholder={t('placeholder.email')} className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition" />
                {errors.email && <p className="text-red-500! text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>
          </section>
          
        }

        {/* 3. ที่อยู่ – เฉพาะส่งธรรมดา (เดิมทั้งหมด) */}
        
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
              <select onChange={(e) => handleProvinceChange(e.target.value)} className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition">
                <option value="">-- {isEN ? 'Province' : 'จังหวัด'} --</option>
                {provinces.map(p => (
                  <option key={p.provinceCode} value={p.provinceCode}>
                    {isEN ? p.provinceNameEn : p.provinceNameTh}
                  </option>
                ))}
              </select>

              <select onChange={(e) => handleDistrictChange(e.target.value)} disabled={!selectedProvCode} className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition">
                <option value="">-- {isEN ? 'District' : 'อำเภอ/เขต'} --</option>
                {districts.map(d => (
                  <option key={d.districtCode} value={d.districtCode}>
                    {isEN ? d.districtNameEn : d.districtNameTh}
                  </option>
                ))}
              </select>

              <select onChange={(e) => handleSubdistrictChange(e.target.value)} disabled={!selectedDistCode} className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition">
                <option value="">-- {isEN ? 'Sub-district' : 'ตำบล/แขวง'} --</option>
                {subdistricts.map(s => (
                  <option key={s.subdistrictCode} value={s.subdistrictCode}>
                    {isEN ? s.subdistrictNameEn : s.subdistrictNameTh}
                  </option>
                ))}
              </select>

              <input {...register('zipcode')} readOnly placeholder={isEN ? 'Postal Code' : 'รหัสไปรษณีย์'} className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md bg-gray-50" />
            </div>
            {errors.zipcode && <p className="text-red-500! text-sm mt-4">{errors.zipcode.message}</p>}
          </section>
        

        {shippingMethod === 'express' && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4! flex items-center gap-3">
              <MapPin className="w-8 h-8" />
              {t('google_map.title')}
            </h2>
            <div className="mb-4">
              <input
                {...register('googleMapsLink')}
                placeholder={t('google_map.placeholder')}
                className="w-full px-3 py-4 text-xl border border-gray-300 rounded-md focus:border-black outline-none transition"
              />
            </div>
            <p className="text-sm text-gray-600">
              {t('google_map.helper')}
            </p>
          </section>
        )}

        {/* 4. แชทแอดมิน – เฉพาะส่งด่วน */}
        {shippingMethod === 'express' && orderCreated && (
          <section className="bg-linear-to-br from-orange-50 to-pink-50 p-10 rounded-3xl text-center border-4 border-orange-300 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold mb-6 text-orange-800">
              {t('shipping_method.exp_delivery_title') || 'ส่งออเดอร์สำเร็จแล้ว!'}
            </h2>
            <p className="text-lg mb-8 text-gray-700">
              แอดมินได้รับออเดอร์แล้วค่ะ กำลังรีบติดต่อภายใน 2 นาที
            </p>
            <div className="flex flex-col gap-5 max-w-md mx-auto">
              <a href={LINE_OA_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-4 bg-green-500 text-white py-6 rounded-2xl text-2xl font-bold hover:bg-green-600 transition shadow-lg">
                <MessageCircle className="w-10 h-10" />
                {t('button.line') || 'แชท LINE ทันที'}
              </a>
              <a href={TELEGRAM_GROUP} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-4 bg-[#27A1F2] text-white py-6 rounded-2xl text-2xl font-bold hover:bg-blue-600 transition shadow-lg">
                <Send className="w-10 h-10" />
                {t('button.tele') || 'เข้ากลุ่ม Telegram'}
              </a>
            </div>
            <p className="text-sm text-gray-600 mt-6">
              หรือรอแอดมินทักก่อนก็ได้นะคะ
            </p>
          </section>
        )}

        {/* 5. Payment – เดิมเป๊ะ */}
        {shippingMethod === 'regular' && (
        <section>
          <h2 className="text-3xl font-bold mb-4!">
            {t('payment_method.title')}
          </h2>
          <div className="bg-[#243f92] text-white p-8 rounded-md border-2 border-blue-500 max-w-lg">
            <div className="flex items-center gap-8">
              <Check className="w-8 h-8" />
              <div className="flex items-center gap-4 g">
                <div className="bg-white p-3 rounded-full text-black">QR</div>
                <div>
                  <p className="font-bold text-white!">{t('payment_method.method')}</p>
                  <p className="text-sm opacity-90 text-white!">{t('payment_method.description')}</p>
                </div>
                <div className='relative aspect-video w-full max-w-20'>
                  <Image src={PromptpayLogo} alt="" fill />
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        <button
          type="submit"
          disabled={isSubmitting || (shippingMethod === 'regular' && (!selectedProvCode || !selectedDistCode))}
          className="btn bg-accent max-w-lg py-4!"
        >
          {isSubmitting ? t('button.submitting') : t('button.submit')}
        </button>
      </form>
    </div>
  )
}