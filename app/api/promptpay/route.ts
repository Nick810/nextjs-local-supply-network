import generatePayload from 'promptpay-qr'
import QRCode from 'qrcode'
import { NextResponse } from 'next/server';

const phoneNum = process.env.PHONE_NUMBER!
if (!phoneNum) throw new Error('PHONE_NUMBER is not defined');

export async function generatePromptPayQR(amount?: number) {
  const payload = generatePayload(phoneNum, { amount });
  const qrImage = await QRCode.toDataURL(payload);
  return qrImage;
}

export async function POST() {
  const qr = await generatePromptPayQR(500)
  return NextResponse.json({ qr }, { status: 200 })
}
