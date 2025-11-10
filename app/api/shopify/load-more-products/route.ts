import { NextRequest, NextResponse } from 'next/server';
import { getCollectionByHandle } from '@/app/lib/shopify/api';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get('handle');
  const after = searchParams.get('cursor');
  const first = parseInt(searchParams.get('first') || '10');

  if (!handle) return NextResponse.json({ error: 'Missing handle' }, { status: 400 });

  const { collection } = await getCollectionByHandle(handle, first, after);

  return NextResponse.json({
    products: collection?.products.nodes,
    endCursor: collection?.products.pageInfo?.endCursor,
    hasNextPage: collection?.products.pageInfo?.hasNextPage,
  });
}
