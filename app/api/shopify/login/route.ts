import { CUSTOMER_TOKEN_CREATE_MUTATION } from '@/app/lib/shopify/customer/queries';
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password } = body;
  const API_URL = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_URL

  if (!API_URL) {
    throw new Error('Missing NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_URL');
  }

  try {
    const loginResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN!,
      },
      body: JSON.stringify({
        query: CUSTOMER_TOKEN_CREATE_MUTATION,
        variables: {
          input: { email, password },
        },
      }),
    });

    const loginResult = await loginResponse.json();
    const { customerAccessTokenCreate } = loginResult.data;
    
    if (customerAccessTokenCreate.customerUserErrors.length > 0) {
      NextResponse.json({ errors: customerAccessTokenCreate.customerUserErrors }, { status: 401 });
    }

    const cookieStore = await cookies();

    cookieStore.set('shopify_token', customerAccessTokenCreate.customerAccessToken.accessToken)

    return NextResponse.json({ token: customerAccessTokenCreate.customerAccessToken }, { status: 200 });
  } catch (error) {
    console.error('Login failed', error);
    return NextResponse.json({ error: 'Login failed', details: error }, { status: 500 });
  }
}
