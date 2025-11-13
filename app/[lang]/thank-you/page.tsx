import { CheckCircle2, Package, Truck, Motorbike } from 'lucide-react'
import { t } from '@/app/lib/utils';
import { getDictionary } from '../dictionaries';

type Props = {
  params: Promise<{ lang: string }>
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'th');
  console.log(dict)

  return (
    <main className="py-32 absolute top-0 w-screen h-screen right-0 z-2000 bg-white">
      <div className="max-w-2xl mx-auto text-center container">
        <CheckCircle2 className="w-16 h-16 text-[#28a745] mx-auto mb-8" />
        <h1 className="text-3xl font-bold mb-4!">{t(dict, 'thank_you.title')}</h1>
        <p className="text-md text-gray-700 mb-8!">{t(dict, 'thank_you.paragraph')}</p>

        <div className="bg-white rounded-3xl shadow-2xl p-10 space-y-6">
          <div className="flex items-center justify-center gap-4 text-md">
            <Package className="w-8 h-8 text-[#28a745]" />
            <span>{t(dict, 'thank_you.list_1')}</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-md">
            <Truck className="w-8 h-8 text-[#28a745]" />
            <span>{t(dict, 'thank_you.list_2')}</span>
          </div>
          <div className="flex items-center justify-center gap-4 text-md">
            <Motorbike className="w-8 h-8 text-[#28a745]" />
            <span>{t(dict, 'thank_you.list_3')}</span>
          </div>

          <a
            href="https://www.facebook.com/lsn.thailand"
            className="btn block mt-10 bg-[#28a745] text-white! py-5 rounded-2xl text-md font-bold"
          >
            {t(dict, 'thank_you.button')}
          </a>
        </div>
      </div>
    </main>
  )
}