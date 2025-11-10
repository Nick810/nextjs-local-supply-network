import { NextResponse } from 'next/server';

type Product = {
  vendor: string;
  tags: string[];
};

type Edge = {
  node: Product;
};

const API_URL = process.env.SHOPIFY_ADMIN_API_URL!

async function queryTagsAndVendors() {
  const query = `
    {
      products(first: 250) {
        edges {
          node {
            vendor
            tags
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

export async function GET() {
  try {
    const edges: Edge[] = await queryTagsAndVendors();
    const products = edges.map(edge => edge.node);
    const growTypeSet = new Set(['indoor', 'sungrown']);

    const vendors = [...new Set(products.map(p => p.vendor))];
    const tags = [
      ...new Set(
        products
          .flatMap(p => p.tags)
          .filter(tag => !growTypeSet.has(tag.toLowerCase()))
      ),
    ];

    const growTypes = [
      ...new Set(
        products
          .flatMap(p => p.tags)
          .filter(tag => growTypeSet.has(tag.toLowerCase()))
      ),
    ];
    
    return NextResponse.json({ vendors, tags, growTypes }, { status: 200 });
  } catch (error) {
    console.error('Error querying file:', error);
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
  }
}