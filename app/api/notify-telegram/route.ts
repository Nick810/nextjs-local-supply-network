// import { NextResponse } from 'next/server'

// export async function POST(req: Request) {
//   try {
//     const { url, name } = await req.json()

//     if (!url || !name) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
//     }

//     const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
//     const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

//     if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
//       console.error('Missing Telegram credentials')
//       return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
//     }

//     const formData = new FormData()
//     formData.append('chat_id', TELEGRAM_CHAT_ID)
//     formData.append('document', url)
//     formData.append('caption', name)

//     const telegramRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
//       method: 'POST',
//       body: formData,
//     })

//     const result = await telegramRes.json()

//     if (!telegramRes.ok || !result.ok) {
//       console.error('Telegram error:', result)
//       return NextResponse.json({ error: 'Telegram failed' }, { status: 502 })
//     }

//     return NextResponse.json({ ok: true })
//   } catch (err) {
//     console.error('Notify Telegram error:', err)
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }


// app/api/notify-telegram/route.ts
// import { NextResponse } from 'next/server'

// export async function POST(req: Request) {
//   try {
//     const body = await req.json()
//     const {
//       order_id,
//       order_number,
//       full_name,
//       phone,
//       email,
//       address_line,
//       province,
//       amphoe,
//       district,
//       zipcode,
//       total_amount,
//       items,
//       status = 'pending'
//     } = body

//     if (!order_id || !full_name || !phone || !total_amount || !items) {
//       return NextResponse.json({ error: 'Missing order data' }, { status: 400 })
//     }

//     const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
//     const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

//     if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
//       console.error('Missing Telegram credentials')
//       return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
//     }

//     const itemList = items.map((item: any, i: number) => {
//       const qty = Number(item.quantity) || 1
//       const totalPrice = Number(item.price) * qty
//       const color = item.color ? item.color : ''
//       const size = item.size ? item.size : ''

//       return `${i + 1}. <b>${item.title}</b>\n    └ ${color} ${size} ×${qty} = ฿${totalPrice.toLocaleString()}`
//     }).join('\n')

//     // ตรวจสอบยอดรวม
//     const calculatedTotal = items.reduce((sum: number, item: any) => 
//       sum + (Number(item.price) * (Number(item.quantity) || 1)), 0
//     )

//     const message = `
//     <b>ออเดอร์ใหม่มาแล้ว!</b>
//     <b>Order No:</b> <code>#${order_number}</code> 
//     <b>Order ID:</b> <code>${order_id}</code>
//     <b>สถานะ:</b> <code>${status.toUpperCase()}</code>

//     <b>ลูกค้า:</b>
//     ${full_name}
//     ${phone}
//     ${email ? email : '<i>ไม่มีอีเมล</i>'}

//     <b>ที่อยู่จัดส่ง:</b>
//     ${address_line}
//     ${district} ${amphoe} ${province} ${zipcode}

//     <b>สินค้า:</b>
//     ${itemList}

//     <b>ยอดรวม:</b> ฿${calculatedTotal.toLocaleString()}
//     <a href="https://yourdomain.com/payment?order_id=${order_id}">ชำระเงินที่นี่</a>
//     `.trim()

//     const telegramRes = await fetch(
//       `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           chat_id: TELEGRAM_CHAT_ID,
//           text: message,
//           parse_mode: 'HTML', // เปลี่ยนเป็น HTML
//           disable_web_page_preview: true,
//         }),
//       }
//     )

//     const result = await telegramRes.json()

//     if (!telegramRes.ok || !result.ok) {
//       console.error('Telegram error:', result)
//       return NextResponse.json({ error: 'Failed to send to Telegram', details: result }, { status: 502 })
//     }

//     return NextResponse.json({ success: true, message: 'แจ้งเตือน Telegram สำเร็จ' })
//   } catch (err) {
//     console.error('Notify Telegram error:', err)
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
//   }
// }

// app/api/notify-telegram/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      order_id,
      order_number,
      full_name,
      phone,
      email,
      address_line,
      province,
      amphoe,
      district,
      zipcode,
      total_amount,
      items,
      status = 'pending',
      shipping_method,        // เพิ่ม
      google_maps_link        // เพิ่ม (ถ้ามี)
    } = body

    if (!order_id || !full_name || !phone || !total_amount || !items) {
      return NextResponse.json({ error: 'Missing order data' }, { status: 400 })
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Missing Telegram credentials')
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
    }

    const itemList = items.map((item: any, i: number) => {
      const qty = Number(item.quantity) || 1
      const totalPrice = Number(item.price) * qty
      const color = item.color ? `${item.color} ` : ''
      const size = item.size ? `ไซส์ ${item.size} ` : ''

      return `${i + 1}. <b>${item.title}</b>\n    └ ${color}${size}×${qty} = ฿${totalPrice.toLocaleString()}`
    }).join('\n')

    const calculatedTotal = items.reduce((sum: number, item: any) =>
      sum + (Number(item.price) * (Number(item.quantity) || 1)), 0
    )

    // ส่วนที่อยู่ + ลิงก์หมุด (ปรับตาม shipping_method)
    let addressText = ''
    if (shipping_method === 'express') {
      if (google_maps_link) {
        addressText = `<b>ปักหมุดแล้ว:</b> <a href="${google_maps_link}">เปิดใน Google Maps</a>`
      } else {
        addressText = `<b>ส่งด่วนพิเศษ</b> — รอแอดมินคุยที่อยู่ในแชท`
      }
    } else {
      // ส่งธรรมดา
      const addr = [address_line, district, amphoe, province, zipcode]
        .filter(Boolean)
        .join(' ')
      addressText = addr || '<i>ไม่มีที่อยู่</i>'
    }

    const message = `
<b>ออเดอร์ใหม่มาแล้ว!</b>
<b>Order No:</b> <code>#${order_number}</code>
<b>Order ID:</b> <code>${order_id}</code>
<b>สถานะ:</b> <code>${status.toUpperCase()}</code>
${shipping_method === 'express' ? '<b>ประเภท:</b> <u>ส่งด่วนพิเศษ (Messenger/Grab)</u>' : ''}

<b>ลูกค้า:</b>
${full_name}
${phone}
${email ? email : '<i>ไม่มีอีเมล</i>'}

<b>ที่อยู่จัดส่ง:</b>
${addressText}

<b>สินค้า:</b>
${itemList}

<b>ยอดรวม:</b> ฿${calculatedTotal.toLocaleString()}
<a href="https://yourdomain.com/payment?order_id=${order_id}">ชำระเงินที่นี่</a>
    `.trim()

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      }
    )

    const result = await telegramRes.json()

    if (!telegramRes.ok || !result.ok) {
      console.error('Telegram error:', result)
      return NextResponse.json({ error: 'Failed to send to Telegram', details: result }, { status: 502 })
    }

    return NextResponse.json({ success: true, message: 'แจ้งเตือน Telegram สำเร็จ' })
  } catch (err) {
    console.error('Notify Telegram error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}