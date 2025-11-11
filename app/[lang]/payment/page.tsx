import QRrenderer from '@/app/components/qr-renderer';
import { getDictionary } from '../dictionaries';
import Link from 'next/link';
import NotFound from '../not-found';

type Props = {
  searchParams: Promise<{ amount: string }>
  params: Promise<{ lang: string }>
}

export const dynamic = 'force-dynamic'

export default async function Page({ searchParams, params }: Props) {
  const { lang } = await params;
  const resolvedSearchParams = await searchParams;
  const { amount } = resolvedSearchParams;

  if (!amount) return (
    <NotFound />
  )

  return (
    <main className="py-32 container">
      <h1 className="text-xl font-semibold mb-4">Complete Your Payment</h1>
      <p className="text-gray-600 mb-2">Scan the QR code below using your banking app</p>
      <p className="text-sm text-gray-500 mb-4">Amount: <strong>฿{Number(amount).toLocaleString()}</strong></p>

      <QRrenderer amount={"100"}/>

      <p className="mb-4! text-gray-700">After completing your payment, please upload your payment slip so we can verify your order.</p>
      <Link
        href={`/${lang}/upload`}
        className="bg-accent text-white! rounded btn text-center text-sm!"
      >
        Upload Payment Slip
      </Link>

    </main>
  );
}
