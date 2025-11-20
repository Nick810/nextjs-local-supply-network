// app/api/create-order/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const body = await request.json()
  const {
    fullName,
    phone,
    email,
    addressLine,
    province,
    amphoe,
    district,
    zipcode,
    totalAmount,
    items,
    googleMapsLink,        // เพิ่มบรรทัดนี้
    shippingMethod         // เพิ่มด้วย (เพื่อใช้ใน Telegram)
  } = body

  // ใช้ที่อยู่จริง หรือ googleMapsLink (เฉพาะส่งด่วน)
  const finalAddressLine = shippingMethod === 'express' 
    ? (googleMapsLink || 'ส่งด่วนพิเศษ — รอคุยที่อยู่') 
    : addressLine

  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      user_id: user?.id || null,
      guest_id: user ? null : undefined,
      full_name: fullName,
      phone,
      email: email || null,
      address_line: finalAddressLine,           // ใช้ที่อยู่ที่คำนวณแล้ว
      province: shippingMethod === 'express' ? null : province,
      amphoe: shippingMethod === 'express' ? null : amphoe,
      district: shippingMethod === 'express' ? null : district,
      zipcode: shippingMethod === 'express' ? null : zipcode,
      total_amount: Number(totalAmount),
      google_maps_link: googleMapsLink || null, // เพิ่มตรงนี้
      shipping_method: shippingMethod,          // บันทึกด้วยเลย (ดีมาก)
      items: items.map((i: any) => ({
        variant_id: i.variantId,
        title: i.title,
        price: Number(i.price),
        quantity: Number(i.quantity) || 1,
        image: i.image,
        size: i.varaintTitle.split('/')[1]?.trim(),
        color: i.varaintTitle.split('/')[0]?.trim() === 'Default Title' ? null : i.varaintTitle.split('/')[0]?.trim()
      }))
    })
    .select('id, order_number')
    .single()

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  // แจ้ง Telegram
  try {
    const notifyRes = await fetch(
      new URL('/api/notify-telegram', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: order.id,
          order_number: String(order.order_number).padStart(3, '0'),
          full_name: fullName,
          phone,
          email: email || null,
          address_line: finalAddressLine,  // ใช้ที่อยู่เดียวกัน
          province: shippingMethod === 'express' ? "-" : province,
          amphoe: shippingMethod === 'express' ? "-" : amphoe,
          district: shippingMethod === 'express' ? "-" : district,
          zipcode: shippingMethod === 'express' ? "-" : zipcode,
          total_amount: totalAmount,
          items: items.map((i: any) => ({
            title: i.title,
            price: i.price,
            quantity: Number(i.quantity) || 1,
            color: i.varaintTitle.split('/')[0]?.trim() === 'Default Title' ? null : i.varaintTitle.split('/')[0]?.trim(),
            size: i.varaintTitle.split('/')[1]?.trim(),
          })),
          status: shippingMethod === 'express' ? 'pending_express' : 'pending'
        })
      }
    )

    if (!notifyRes.ok) {
      const err = await notifyRes.json()
      console.error('Telegram notify failed:', err)
    }
  } catch (err) {
    console.error('Failed to send Telegram notification:', err)
  }

  return NextResponse.json({
    success: true,
    order_id: order.id,
    order_number: order.order_number,
    message: 'สร้างออเดอร์สำเร็จ'
  })
}