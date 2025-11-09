import { t } from "@/app/lib/utils";
import { getDictionary } from "../dictionaries";
import { setRequestLocale } from "next-intl/server";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'th');

  setRequestLocale(lang);

  return (
    <main className="py-32 container">
      <div className="flex flex-col gap-8 items-center text-center">
        <h1 dangerouslySetInnerHTML={{ __html: t(dict, 'about.title') }} />
        <p dangerouslySetInnerHTML={{ __html: t(dict, 'about.mission') }} />
        <p dangerouslySetInnerHTML={{ __html: t(dict, 'about.history') }} />
        <p dangerouslySetInnerHTML={{ __html: t(dict, 'about.corporateShift') }} />
        <p dangerouslySetInnerHTML={{ __html: t(dict, 'about.costVsQuality') }} />
        <p dangerouslySetInnerHTML={{ __html: t(dict, 'about.techRejection') }} />
        <p dangerouslySetInnerHTML={{ __html: t(dict, 'about.growerDedication') }} />
        <p dangerouslySetInnerHTML={{ __html: t(dict, 'about.communityBackbone') }} />
        <p dangerouslySetInnerHTML={{ __html: t(dict, 'about.curatedCollections') }} />
        <p dangerouslySetInnerHTML={{ __html: t(dict, 'about.authenticityChoice') }} />
        <p dangerouslySetInnerHTML={{ __html: t(dict, 'about.perfectionOverProfit') }} />
        <p dangerouslySetInnerHTML={{ __html: t(dict, 'about.purchaseMeaning') }} />
      </div>
    </main>
  )
}