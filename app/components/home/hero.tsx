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
      {isTablet ? (
        // 16:9 aspect ratio for desktop
        <div className="relative w-full aspect-video max-h-screen">
          <Image 
            src={desktopImage as string}
            alt="Hero"
            fill
            className='object-cover'
          />
        </div>
      ) : (
        // 9:16 aspect ratio for mobile
        <div className="relative w-full h-full aspect-9/16">
          <Image 
            src={mobileImage as string}
            alt="Hero"
            fill
            className='object-cover'
          />
        </div>
      )}

      <div className={`absolute ${positionClass} transform text-center w-full px-[5%] max-w-[800px]`}>
        <h1 
          className={`text-[16vw] md:text-8xl lg:text-9xl text-stroke text-white! mb-4! scale-y-115 hidden`}>
            {data.heading || ''}
        </h1>
        <p className={`mb-8! md:mb-16! text-white! text-4xl text-stroke-sm font-bold!`}>{data.text || ''}</p>
        <Link href={`/${lang}/collections/all`} className="btn w-full max-w-[320px]! m-auto rounded-md bg-[#f3f3f3] border border-black text-black! hover:bg-[#f3f3f3] transition-all duration-200 ease-in">Shop Now</Link>
      </div>
    </div>
  )
}
export default Hero