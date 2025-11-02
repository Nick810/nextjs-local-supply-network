'use client';

import Link from 'next/link';

type HeroProps = {
  title: string
  lang: string
  btnText: string
}

const Hero: React.FC<HeroProps> = ({ title, btnText, lang }) => {

  return (
    <div className="relative w-full h-screen">
      <div className={`absolute top-1/2 left-0 transform -translate-y-1/2 text-left w-full px-[5%] max-w-[1000px]`}>
        <h1 
          className={`text-[10vw] md:text-8xl text-black! my-8! futura-bold-important leading-15! md:leading-22! uppercase`}
          dangerouslySetInnerHTML={{ __html: title }} /> 
        <Link
          href={`/${lang}/collections/all`}
          className="btn w-full rounded-md border mt-16 text-ไ้ระำ bg-accent max-w-lg hover:bg-[#f3f3f3] transition-all duration-200 ease-in text-center">{btnText}</Link>
      </div>
    </div>
  )
}
export default Hero