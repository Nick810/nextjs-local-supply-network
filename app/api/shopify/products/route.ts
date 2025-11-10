import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.SHOPIFY_ADMIN_API_URL!

async function queryFilter(queryString: string) {
  const query = `
    {
      products(first: 10, query: "${queryString}") {
        edges {
          node {
            id
            title
            handle
            tags
            vendor
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_API_TOKEN!,
    },
    body: JSON.stringify({ query }),
  });
  const result = await response.json();
  
  return result.data.products.edges;
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const vendor = searchParams.get('vendor'); 
  const strain = searchParams.get('strain'); 
  const priceMin = searchParams.get('price_min');
  const priceMax = searchParams.get('price_max');
  const parts: string[] = [];

  if (vendor) parts.push(`vendor:${vendor}`);
  if (strain) parts.push(`tag:${strain}`);
  if (priceMin) parts.push(`variants.price:>${priceMin}`);
  if (priceMax) parts.push(`variants.price:<${priceMax}`);

  const queryString = parts.join(' '); // Final string

  try {
    const filteredProducts = await queryFilter(queryString);
    return NextResponse.json({ filteredProducts }, { status: 200 });
  } catch (error) {
    console.error('Error filtering products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}