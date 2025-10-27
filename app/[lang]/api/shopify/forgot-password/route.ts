import { CUSTOMER_RECOVER_MUTATION } from '@/app/lib/shopify/customer/queries';
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const endpoint = process.env.SHOPIFY_STOREFRONT_API_URL!;
const token = process.env.SHOPIFY_STOREFRONT_API_TOKEN!;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;

  if (!email) return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({
        query: CUSTOMER_RECOVER_MUTATION,
        variables: { email },
      }),
    });

    const result = await response.json();
    const { customerRecover } = result.data;

    if (customerRecover.customerUserErrors.length > 0) {
      return NextResponse.json({ error: customerRecover.customerUserErrors }, { status: 400 })
    }

    return NextResponse.json({ message: 'Password reset email sent.' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send password reset email.', details: error}, { status: 500 })
  }
}