// app/api/create-order/route.ts
import { createClient } from '@/lib/supabase/server' // หรือ path ที่คุณใช้
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()

  // ดึง user (ถ้ามี) — ถ้าไม่มีก็เป็น null
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
    items
  } = body

  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      user_id: user?.id || null,                    // ถ้าไม่มี user → null
      guest_id: user ? null : undefined,            // ถ้าไม่มี user → สร้าง guest_id อัตโนมัติ
      full_name: fullName,
      phone,
      email: email || null,
      address_line: addressLine,
      province,
      amphoe,
      district,
      zipcode,
      total_amount: Number(totalAmount),
      items: items.map((i: any) => ({
        variant_id: i.variantId,
        title: i.title,
        price: Number(i.price),
        quantity: 1,
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
          address_line: addressLine,
          province,
          amphoe,
          district,
          zipcode,
          total_amount: totalAmount,
          items: items.map((i: any) => ({
            title: i.title,
            price: i.price,
            color: i.varaintTitle.split('/')[0]?.trim() === 'Default Title' ? null : i.varaintTitle.split('/')[0]?.trim(),
            size: i.varaintTitle.split('/')[1]?.trim(),
          })),
          status: 'pending'
        })
      }
    )

    const notifyResult = await notifyRes.json()
    if (!notifyRes.ok) {
      console.error('Telegram notify failed:', notifyResult)
    } else {
      console.log('Telegram notified!', notifyResult)
    }
  } catch (err) {
    console.error('Failed to send Telegram notification:', err)
  }

  return NextResponse.json({
    success: true,
    order_id: order.id,
    message: 'สร้างออเดอร์และแจ้งแอดมินแล้ว'
  })
}