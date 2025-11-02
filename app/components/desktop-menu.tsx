import Link from "next/link";
import { FC } from "react";
import {useTranslations} from 'next-intl';

type Props = {
  lang: string
}

const DesktopMenu: FC<Props> = ({ lang }) => {
  const t = useTranslations('menu');
    
  return (
    <ul className="lg:flex flex-row items-start gap-8 px-6 hidden lg:shrink-0 absolute right-0 -translate-x-1/2">
      <li><Link prefetch href={`/${lang}/collections/all`} className="text-md! uppercase text-black! hover:text-neutral-400! transition-colors duration-200">{t('products')}</Link></li>
      <li><Link prefetch href={`/${lang}/story`} className="text-md! uppercase text-black! hover:text-neutral-400! transition-colors duration-200">{t('story')}</Link></li>
      <li><Link prefetch href={`/${lang}/about`} className="text-md! uppercase text-black! hover:text-neutral-400! transition-colors duration-200">{t('about')}</Link></li>
    </ul>
  )
}
export default DesktopMenu;