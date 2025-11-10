import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { to, subject, html } = await req.json()
  
  try {
    const data = await resend.emails.send({
      from: 'Choles-X <noreply@cholesx.com>',
      to,
      subject,
      html,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}