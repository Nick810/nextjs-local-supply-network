'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import HeroBg from '@/public/hero-bg.jpg'
import Image from 'next/image';

type HeroProps = {
  title: string
  lang: string
}

const Hero: React.FC<HeroProps> = ({ lang, title }) => {
  const tBtn = useTranslations('button');

  return (
    <div className="relative w-full h-screen">
      <Image src={HeroBg} alt="" className='object-cover w-full h-full' />
      <div className={`absolute top-1/2 left-0 transform -translate-y-1/2 text-left w-full px-[5%] max-w-[1000px]`}>
        <h1 
          className={`text-[10vw] md:text-8xl text-black! my-8! futura-bold-important leading-15! md:leading-22! uppercase`}
          dangerouslySetInnerHTML={{ __html: title }} /> 
        <Link
          href={`/${lang}/collections/all`}
          className="btn w-full rounded-md border mt-8 bg-accent max-w-lg hover:bg-[#b30000] transition-all duration-200 ease-in text-center">{ tBtn('shop_now') }</Link>
      </div>
    </div>
  )
}
export default Hero