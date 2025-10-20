import { shopifyClient } from "../client";
import { CUSTOMER_QUERY, CUSTOMER_RECOVER_MUTATION, SIGNUP_MUTATION } from "./queries";
import { RecoverResponse, RecoverResult, SignUpProps, SignUpResponse } from "./types";

export async function signUp(
  customer: {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    acceptsMarketing: boolean
  }
): Promise<SignUpProps> {
  const response = await shopifyClient.request<SignUpResponse>(SIGNUP_MUTATION, {
    variables: { input: customer }
  })

  const customerCreate = response.data?.customerCreate;
  if (!customerCreate || customerCreate.customerUserErrors.length) {
    throw new Error(customerCreate?.customerUserErrors.map(e => e.message).join(', ') || 'Unknown error');
  }

  return {
    customer: customerCreate.customer
  }
}

export async function recover(email: string): Promise<RecoverResult> {
  const response = await shopifyClient.request<RecoverResponse>(CUSTOMER_RECOVER_MUTATION, {
    variables: { email }
  })

  const errors = response.data?.customerRecover?.customerUserErrors;
  
  if (errors && errors.length > 0) {
    return {
      success: false,
      email,
      errors
    };
  }

  return {
    success: true,
    email
  };
}

export async function getCustomerInfo(token: string) {
  try {
    const response = await fetch('https://powerberry.myshopify.com/api/2024-01/graphql.json', {
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

    const result = await response.json();

    if (result.errors || !result.data?.customer) {
      throw new Error('Failed to fetch customer info');
    }

    return result.data.customer;
  } catch (err) {
    console.error('Customer fetch error:', err);
    throw err;
  }
}