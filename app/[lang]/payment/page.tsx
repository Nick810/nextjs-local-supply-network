import QRrenderer from '@/app/components/qr-renderer';
import { getDictionary } from '../dictionaries';

const API_URL = process.env.NODE_ENV === 'development'
                  ? 'http://localhost:3000'
                  : process.env.NEXT_PUBLIC_SITE_URL;

export default async function Page() {
  // const { lang } = await params;
  // const dict = await getDictionary(lang as 'en' | 'th');
  const res = await fetch(`${API_URL}/api/promptpay`, {
    method: 'POST',
    cache: 'no-store'
  })
  const data = await res.json();

  return (
    <main className="py-24 container">
      <h1 className="text-xl font-semibold mb-4">Complete Your Payment</h1>
      <p className="text-gray-600 mb-2">Scan the QR code below using your banking app</p>
      <p className="text-sm text-gray-500 mb-4">Amount: <strong>฿500</strong></p>

      {data.qr ? (
        <QRrenderer data={data.qr} />
      ) : (
        <p className="text-gray-400">Generating QR code...</p>
      )}

    </main>
  );
}
