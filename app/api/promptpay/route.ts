import generatePayload from 'promptpay-qr'
import QRCode from 'qrcode'
import { NextRequest, NextResponse } from 'next/server';

const phoneNum = process.env.PHONE_NUMBER!
if (!phoneNum) throw new Error('PHONE_NUMBER is not defined');

export async function generatePromptPayQR(amount?: number) {
  const payload = generatePayload(phoneNum, { amount });
  const qrImage = await QRCode.toDataURL(payload);
  return qrImage;
}

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();

    if (!amount || isNaN(Number(amount))) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const qr = await generatePromptPayQR(Number(amount));
    return NextResponse.json({ qr }, { status: 200 });
  } catch (err) {
    console.error('QR generation error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
