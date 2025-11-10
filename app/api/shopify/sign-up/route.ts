import { CUSTOMER_TOKEN_CREATE_MUTATION, SIGNUP_MUTATION } from '@/app/lib/shopify/customer/queries';
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';
import { CustomerCreateResponse, CustomerInput } from '@/app/lib/shopify/customer/types';

export async function POST(
  req: NextRequest,
) {
  const body = await req.json()
  const { email, password, firstName, lastName, phone, acceptsMarketing = true }: CustomerInput = body;
  const API_URL = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_URL;

  if (!API_URL) {
    throw new Error('Missing NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_URL');
  }

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' });
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN!,
      },
      body: JSON.stringify({
        query: SIGNUP_MUTATION,
        variables: {
          input: {
            email,
            password,
            firstName: firstName || '',
            lastName: lastName || '',
            phone: phone || '',
            acceptsMarketing: acceptsMarketing || false,
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: CustomerCreateResponse = await response.json();

    const errors = result.data.customerCreate.customerUserErrors;

    if (errors.length > 0) {
      console.warn('Customer creation errors:', errors);
    }

    if (result.data.customerCreate.customerUserErrors.length > 0) {
      return NextResponse.json({
        error: errors,
        errors: result.data.customerCreate.customerUserErrors,
      }
      ,{ status: 400 }
      );
    }

    if (!result.data.customerCreate.customer) {
      return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 } );
    }

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
      return NextResponse.json({ errors: customerAccessTokenCreate.customerUserErrors }, { status: 401 });
    }

    const cookieStore = await cookies();
    
    cookieStore.set('shopify_token', customerAccessTokenCreate.customerAccessToken.accessToken)

    return NextResponse.json({
      customer: result.data.customerCreate,
      accessToken: customerAccessTokenCreate.customerAccessToken,
    }, {status : 200});
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}
