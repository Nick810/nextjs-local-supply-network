'use client';

import Hamburger from "hamburger-react"
import { FC, useState } from "react";
import MobileNav from "./mobilenav";
import Cart from "./cart";
import Link from "next/link";
import Image from "next/image";
import logo from '../../public/lsn-logo.png';
import Bag from '../../public/bag-icon.svg';
import { useCartStore } from '@/app/lib/shopify/cart/cart-store'
import DesktopMenu from "./desktop-menu";
import LangSelector from "./lang-selector";
// import { TextData } from "./banner";

interface HeaderProps {
  lang: string
}

const Header: FC<HeaderProps> = ({ lang }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isCartOpen, setCartOpen] = useState<boolean>(false);
  const items = useCartStore(s => s.items);
  
  return (
    <>
      <div className="fixed top-0 left-0 overflow-hidden w-screen text-white h-10 z-100 flex items-center">
        <div className="absolute inset-0 bg-[#C5C5C5] backdrop-blur-md -z-10"></div>
        <p className="text-center! w-full"><span className="text-accent!">FREE SHIPPING</span> ON ORDER OVER 500 THB</p>
      </div>

      <header className="container fixed w-screen max-w-screen! bg-transparent py-2 z-100 top-10">
        {/* <p className="bg-[#C5C5C5]"><span className="text-accent">FREE SHIPPING</span>ON ORDER OVER 2,000 THB</p> */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md -z-10"></div>
        <div className="flex items-center justify-between">
          <div className="lg:hidden -translate-x-2">
            <Hamburger toggle={setOpen} size={28} color="#464646" />
          </div>
          <Link href={`/${lang}`} className="text-black">
            <Image src={logo} alt="Powerberry Logo" width={100} height={70} priority/>
          </Link>
          <div className="flex items-center gap-4">
            <LangSelector currentLang={lang} />
            <DesktopMenu lang={lang} />
            <button onClick={() => setCartOpen(true)} className="text-black cursor-pointer relative lg:shrink-0">
              { !!items.length && (<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-600 w-4 h-4 flex justify-center items-center text-white rounded-full text-[0.5rem]">{ items.length }</div>) }
              <Image src={Bag} alt="Shopping Cart Icon" width={28} height={28} priority />
            </button>
          </div>
        </div>
      </header>

      <Cart toggled={isCartOpen} toggle={setCartOpen} bgColor={"white"} lang={lang} />
      <MobileNav toggled={isOpen} toggle={setOpen} lang={lang} />
      
    </>
  )
}
export default Header