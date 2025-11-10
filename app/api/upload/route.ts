import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('receipt');
  
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  // ✅ Validate file type and size
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 415 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 413 });
  }

  // ✅ Upload to Supabase Storage
  const fileExt = file.name.split('.').pop();
  const fileName = `receipt-${Date.now()}.${fileExt}`;
  const { data, error } = await supabase.storage
    .from('receipts')
    .upload(fileName, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error('Supabase upload error:', error.message);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }

  const publicUrl = supabase.storage
    .from('receipts')
    .getPublicUrl(fileName).data.publicUrl;

  // ✅ Optional: Notify via Telegram
  // if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
  //   await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       chat_id: TELEGRAM_CHAT_ID,
  //       text: `📥 New receipt uploaded:\n${publicUrl}`,
  //     }),
  //   });
  // }

  return NextResponse.json({ success: true, url: publicUrl });
}
