// import { Resend } from 'resend';
// import { NextRequest, NextResponse } from 'next/server';
// import { WelcomeEmail } from '@/app/components/emails/welcome-email';
// import { ContactEmail } from '@/app/components/emails/contact-email';
// import { ReactElement } from 'react';
// import { WaitlistEmail } from '@/app/components/emails/waitlist';

import { NextResponse } from "next/server";

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  return NextResponse.json({})
  // const body = await req.json();
  // const { type, to, subject: subjectTitle, data } = body;

  // let emailComponent: ReactElement;
  // let subject: string;
  
  // switch (type) {
  //   case 'welcome':
  //     emailComponent = WelcomeEmail({ firstName: data.firstName });
  //     subject = 'Welcome to Powerberry!'; 
  //     break;
  //   case 'contact':
  //     emailComponent = ContactEmail({ name: data.name, email: data.email, message: data.message });
  //     subject = `POWERBERRY CUSTOMER CONTACT FORM SUBMISSION: ${subjectTitle}`;
  //     break;
  //   case 'waitlist':
  //     emailComponent = WaitlistEmail({ name: data.name, email: data.email, productTitle: data.productTitle, varaintTitle: data.varaintTitle });
  //     subject = `Waitlist Alert for ${data.productTitle}`;
  //     break;
  //   default:
  //     return NextResponse.json({ error: 'Invalid email type' }, { status: 400 });
  // }

  // try {
  //   const { data: result, error } = await resend.emails.send({
  //     from: 'Powerberryharvest <no-reply@powerberryharvest.com>',
  //     to,
  //     subject,
  //     react: emailComponent,
  //   });


  //   if (error) {
  //     console.log(error.message)
  //     return NextResponse.json({ error: error.message }, { status: 400 })
  //   };
  //   return NextResponse.json({ result }, { status: 200 });
  // } catch (err) {
  //   return NextResponse.json({ error: err }, { status: 500 });
  // }
}
