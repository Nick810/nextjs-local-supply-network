import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { url, name } = await req.json()

    if (!url || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Missing Telegram credentials')
      return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
    }

    const formData = new FormData()
    formData.append('chat_id', TELEGRAM_CHAT_ID)
    formData.append('document', url)
    formData.append('caption', name)

    const telegramRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
      method: 'POST',
      body: formData,
    })

    const result = await telegramRes.json()

    if (!telegramRes.ok || !result.ok) {
      console.error('Telegram error:', result)
      return NextResponse.json({ error: 'Telegram failed' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Notify Telegram error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
