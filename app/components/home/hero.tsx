'use client';

import { useMediaQuery } from 'react-responsive'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { extractImageVariants } from '@/app/lib/utils';
import Image from 'next/image';

type HeroProps = {
  data: {
    text: string
    heading: string
    position: Position
  }
  lang: string
  images: []
}
type Position = 'top' | 'middle' | 'bottom'

const textPositionMap: Record<Position, string> = {
  top: 'absolute top-35 left-1/2 transform -translate-x-1/2',
  middle: 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
  bottom: 'absolute bottom-20 left-1/2 transform -translate-x-1/2',
}
const Hero: React.FC<HeroProps> = ({ data, images, lang }) => {
    // Define breakpoints (e.g., 1024px for desktop)
  const variants = extractImageVariants(images)
  const [hasMounted, setHasMounted] = useState<boolean>(false)
  const isTablet = useMediaQuery({ minWidth: 1024 })
  const positionClass = textPositionMap[data.position]
  const desktopImage = variants.find(v => v.variant === 'desktop')?.url
  const mobileImage = variants.find(v => v.variant === 'unknown')?.url

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!images || !images.length) return <></>

   if (!hasMounted) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-200 animate-pulse">
        {/* Flickering box placeholder */}
        <div className="w-full h-full bg-gray-300" />
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen">

      <div className={`absolute ${positionClass} transform text-left w-full px-[5%] max-w-[800px]`}>
        <h1 
          className={`text-[16vw] md:text-8xl lg:text-9xl  text-black! my-8!`}>
            <span className='text-accent!'>The #1</span> Marketplace<br /> for True-Craft <span className='text-accent!'><br />Small Batch Local Growers</span>
            {/* {data.heading || ''} */}
        </h1>
        {/* <p className={`mb-8! md:mb-16! text-white! text-4xl text-stroke-sm font-bold!`}>{data.text || ''}</p> */}
        <Link href={`/${lang}/collections/all`} className="btn w-full m-auto rounded-md bg-accent  hover:bg-[#f3f3f3] transition-all duration-200 ease-in text-center text-white!">Shop Now</Link>
      </div>
    </div>
  )
}
export default Hero