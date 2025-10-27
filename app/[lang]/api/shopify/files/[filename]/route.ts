import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.SHOPIFY_ADMIN_API_URL!

async function queryFileByName(queryString: string) {
  const query = `
    {
      files(first: 10, query: "${queryString}") {
        edges {
          node {
            id
            alt
            ... on MediaImage {
              image {
                url
              }
            }
            ... on GenericFile {
              url
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
  return result.data.files.edges;
}


export async function GET(req: NextRequest, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;

  if (typeof filename !== 'string') {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  }

  const filenames = filename.split(',').map(name => name.trim())
  const queryString = filenames
    .map(name => `filename:${name}`)
    .join(' OR ')
  
  try {
    const files = await queryFileByName(queryString);
    return NextResponse.json({ files }, { status: 200 });
  } catch (error) {
    console.error('Error querying file:', error);
    return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
  }
}
