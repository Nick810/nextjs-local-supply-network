// import { NextRequest, NextResponse } from 'next/server';
// // import { Resend } from 'resend';

// // const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: NextRequest) {
//   // const { email } = await req.json()
  
//   try {
//     // const html = `
//     //   <div style="font-family: sans-serif; padding: 20px;">
//     //     <h2>New Subscriber Alert</h2>
//     //     <p>You have a new subscriber:</p>
//     //     <p><strong>Email:</strong> ${email}</p>
//     //   </div>
//     // `;

//     // const data = await resend.emails.send({
//     //   from: 'Local Supply Network <noreply@local-supply-network.com>',
//     //   to: 'c6k.n1ck@gmail.com',
//     //   subject: 'New Subscriber Alert',
//     //   html,
//     // })

//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error('Resend error:', error)
//     return NextResponse.json({ success: false, error }, { status: 500 })
//   }
// }

import { NextResponse } from 'next/server';

export async function GET() {
  // You can return an empty JSON object or a simple success message
  return NextResponse.json({}); 
}