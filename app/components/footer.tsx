import { FC } from "react"
import Image from "next/image"
import Link from "next/link"

type Props = {
  lang: string
}

const Footer: FC<Props> = ({ lang }) => {
  return (
    <footer className="text-[#333] mt-16 pb-12">
      <div className="flex w-full container">
        <div className="w-4/5 flex flex-col gap-12">
          <ul className="flex flex-col items-start gap-4">
            <li><Link href={`/${lang}`} className="text-md uppercase transition-colors duration-200 hover:text-neutral-400!">Home</Link></li>
            <li><Link href={`${lang}/collections/all`} className="text-md! uppercase text-black! hover:text-neutral-400! transition-colors duration-200">Products</Link></li>
            <li><Link href={`${lang}/story`} className="text-md! uppercase text-black! hover:text-neutral-400! transition-colors duration-200">Story</Link></li>
            <li><Link href={`${lang}/about-us`} className="text-md! uppercase text-black! hover:text-neutral-400! transition-colors duration-200">About</Link></li>
          </ul>
          <div>
            <p className="text-sm mb-4!">&copy; { new Date().getFullYear() } Local Supply Network </p>
            <ul className="flex flex-rcol text-xs gap-8">
              <Link className="transition-colors duration-200 hover:text-neutral-400!" href="/privacy-policy">Privacy Policy</Link>
              <Link className="transition-colors duration-200 hover:text-neutral-400!" href="/terms-and-conditions">Terms of Service</Link>
              <Link className="transition-colors duration-200 hover:text-neutral-400!" href="/return-policy">Return Policy</Link>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-end gap-4 w-1/5 pr-4">
          <a href="https://www.instagram.com/powerberry_official/" target="_blank" rel="noopener noreferrer">
            <Image src="/instagram.svg" alt="" width={32} height={32} />
          </a>
        </div>
        <p className="text-xs">S<br />o<br />c<br />i<br />a<br />l<br />s</p>
      </div>
    </footer>
  )
}
export default Footer