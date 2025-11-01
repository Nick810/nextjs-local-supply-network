import { t } from "@/app/lib/utils";
import { getDictionary } from "../dictionaries";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'th');

  return (
    <main className="py-32 container">
      <div className="flex flex-col gap-8 items-center text-center">
        <h1>{t(dict, 'about.title')}</h1>
        <p>{t(dict, 'about.mission')}</p>
        <p>{t(dict, 'about.history')}</p>
        <p>{t(dict, 'about.corporateShift')}</p>
        <p>{t(dict, 'about.costVsQuality')}</p>
        <p>{t(dict, 'about.techRejection')}</p>
        <p>{t(dict, 'about.growerDedication')}</p>
        <p>{t(dict, 'about.communityBackbone')}</p>
        <p>{t(dict, 'about.curatedCollections')}</p>
        <p>{t(dict, 'about.authenticityChoice')}</p>
        <p>{t(dict, 'about.perfectionOverProfit')}</p>
        <p>{t(dict, 'about.purchaseMeaning')}</p>
      </div>
    </main>
  )
}