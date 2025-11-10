import { NextResponse } from 'next/server';
import { CUSTOMER_QUERY } from '@/app/lib/shopify/customer/queries';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get('shopify_token')?.value;
  const API_URL = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_URL

  if (!API_URL) {
    throw new Error('Missing NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_URL');
  }

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN!,
      },
      body: JSON.stringify({
        query: CUSTOMER_QUERY,
        variables: {
          customerAccessToken: token,
        },
      }),
    });
    const result = await response.json()

    if (result.errors || !result.data?.customer) {
      return NextResponse.json({ error: 'Failed to fetch customer info', details: result.errors }, { status: 500 });
    }

    return NextResponse.json(result.data.customer);
  } catch (err) {
    console.error('Customer fetch error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
