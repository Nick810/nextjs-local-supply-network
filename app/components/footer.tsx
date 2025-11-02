import { FC } from "react"
import Link from "next/link"
import Subscribe from "./subscription"

type Props = {
  lang: string
}

const Footer: FC<Props> = ({ lang }) => {
  return (
    <footer className="bg-[#C5C5C5] pb-12 lg: pt-24 relative">
      <svg
        viewBox="0 0 1050 66"
        className="absolute -top-3 xs:-top-6 sm:-top-[4%] w-screen h-auto"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <g filter="url(#filter0_g_47_4)">
          <rect x="0" y="13" width="100%" height="80" fill="#C5C5C5"/>
        </g>
        <defs>
          <filter id="filter0_g_47_4" x="0" y="0" width="1050" height="66" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feTurbulence type="fractalNoise" baseFrequency="0.0625 0.0625" numOctaves="3" seed="4273" />
            <feDisplacementMap in="shape" scale="26" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
            <feMerge result="effect1_texture_47_4">
            <feMergeNode in="displacedImage"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      <div className="flex flex-wrap w-full container">
        <Subscribe />
        <div className="w-full md:w-[48%] flex flex-col gap-12">
          <ul className="flex flex-col items-start gap-8">
            <li><Link href={`/${lang}`} className="text-md! text-[#474747] uppercase transition-colors duration-200 hover:text-neutral-400!">Home</Link></li>
            <li><Link href={`/${lang}/collections/all`} className="text-md! uppercase text-[#474747] hover:text-neutral-400! transition-colors duration-200">Products</Link></li>
            <li><Link href={`/${lang}/story`} className="text-md! uppercase text-[#474747] hover:text-neutral-400! transition-colors duration-200">Story</Link></li>
            <li><Link href={`/${lang}/about-us`} className="text-m! uppercase text-[#474747] hover:text-neutral-400! transition-colors duration-200">About</Link></li>
          </ul>
          <div>
            <p className="text-sm mb-4! text-black!">&copy; { new Date().getFullYear() } Local Supply Network </p>
            <ul className="flex flex-rcol text-xs gap-8">
              <Link className="transition-colors duration-200 text-[#474747]! hover:text-neutral-400!" href="/privacy-policy">Privacy Policy</Link>
              <Link className="transition-colors duration-200 text-[#474747]! hover:text-neutral-400!" href="/terms-and-conditions">Terms of Service</Link>
              <Link className="transition-colors duration-200 text-[#474747]! hover:text-neutral-400!" href="/return-policy">Return Policy</Link>
            </ul>
          </div>
        </div>
        {/* <div className="flex flex-col items-end gap-4 w-1/5 pr-4">
          <a href="https://www.instagram.com/powerberry_official/" target="_blank" rel="noopener noreferrer">
            <Image src="/instagram.svg" alt="" width={32} height={32} />
          </a>
        </div> */}
        {/* <p className="text-xs">S<br />o<br />c<br />i<br />a<br />l<br />s</p> */}
      </div>
    </footer>
  )
}
export default Footer