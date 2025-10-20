'use client';

import Hamburger from "hamburger-react"
import { FC, useState } from "react";
import MobileNav from "./mobilenav";
import Cart from "./cart";
import Link from "next/link";
import Image from "next/image";
import logo from '../../public/lsn-logo.png';
import cart from '../../public/cart.svg';
import { useCartStore } from "@/lib/shopify/cart/cart-store";
import DesktopMenu from "./desktop-menu";
import InfiniteBanner, { TextData } from "./banner";


interface HeaderProps {
  bgColor: string
  marqueeText?: TextData
}

const Header: FC<HeaderProps> = ({bgColor, marqueeText}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isCartOpen, setCartOpen] = useState<boolean>(false);
  const items = useCartStore(s => s.items);
  
  return (
    <>
      <InfiniteBanner text={marqueeText} />
      <header className="container fixed w-screen max-w-screen! bg-transparent py-2 z-100 translate-y-10">
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md -z-10"></div>
        <div className="flex items-center justify-between">
          <Link href="/" className="text-black">
            <Image src={logo} alt="Powerberry Logo" width={100} height={70} priority/>
          </Link>
          <div className="flex items-center gap-2">
            <DesktopMenu />
            <button onClick={() => setCartOpen(true)} className="text-black cursor-pointer relative lg:shrink-0">
              { !!items.length && (<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-rose-600 w-4 h-4 flex justify-center items-center text-white rounded-full text-[0.5rem]">{ items.length }</div>) }
              <Image src={cart} alt="Cart Icon" width={36} height={36} priority />
            </button>
            <div className="lg:hidden">
              <Hamburger toggle={setOpen} size={28} color="#464646" />
            </div>
          </div>
        </div>
      </header>

      <Cart toggled={isCartOpen} toggle={setCartOpen} bgColor={bgColor} />
      <MobileNav toggled={isOpen} toggle={setOpen} />
      
    </>
  )
}
export default Header