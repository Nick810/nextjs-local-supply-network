import Image from "next/image";
import Link from "next/link";
import ImageWithSkeleton from "../components/image-with-skeleton";
import { ShopifyCollectionByHandleResponse } from "../lib/shopify/types";
import { VENDORS } from "../lib/vendors";
import { t } from "../lib/utils";
import { getDictionary } from "./dictionaries";
import { getCollectionByHandle } from "../lib/shopify/api";
import Hero from "../components/home/hero";
import Letter from "../components/home/letter";
import { setRequestLocale } from "next-intl/server";


// export const dynamic = 'force-dynamic'; // Optional: forces SSR

// const API_URL = process.env.NODE_ENV === 'development'
//                   ? 'http://localhost:3000'
//                   : process.env.NEXT_PUBLIC_SITE_URL;

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'th');
  const { collection }: ShopifyCollectionByHandleResponse = await getCollectionByHandle('all');
  const heroTitle = t(dict, 'home.hero.title')
    
  // const jsonLd = {
  //   "@context": "https://schema.org",
  //   "@type": "WebSite",
  //   "name": "Powerberry",
  //   "url": `${process.env.NEXT_PUBLIC_SITE_URL}`,
  //   "potentialAction": {
  //     "@type": "SearchAction",
  //     "target": `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
  //     "query-input": "required name=search_term_string"
  //   }
  // }
  
  setRequestLocale(lang);
  
  return (
    <main className="flex flex-col items-center overflow-hidden">
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      /> */}

      <Hero 
        title={heroTitle}
        lang={lang} /> 

      <div className="py-16! w-full">
        <div className="container pr-0! lg:mr-0!">
          <div className="flex flex-row justify-between items-start">
            <h2 className="text-3xl mb-8!">
              {t(dict, 'home.product_list.title')}
            </h2>

            <Link href={`/${lang}/collections/all`} className="block -translate-x-[25%] pl-8">{t(dict, 'button.see_all')}</Link>
          </div>
          
          <div className="overflow-x-auto scrollbar-hide">
            <ul className="grid grid-flow-col auto-cols-[12rem] md:auto-cols-[16rem] lg:auto-cols-[20rem] gap-4">
              {
              collection?.products?.nodes.map(( node ) => {
                const vendor = VENDORS.find(v => v.name.toLowerCase() === node.vendor.toLowerCase());

                return (
                  <li 
                    key={node.id} 
                    className="shrink-0 aspect-3/4 relative">
                    <Link href={`/${lang}/collections/all/product/${node.handle}`}>
                      <ImageWithSkeleton 
                        src={node.featuredImage.url}
                        alt={node.featuredImage.altText || `Product image`}
                        className="object-cover rounded-lg w-full h-full"
                        />
                      <div className="flex flex-row justify-between items-start mt-4">
                        <div className="flex flex-col gap-1 mr-4">
                          <h3 className="text-md leading-4.5!">{node.title}</h3>
                          <p>{`by ${node.vendor}`}</p>
                          <p className="text-grey-200! mt-2!">฿{(Number(node.priceRange.minVariantPrice.amount) * 1).toLocaleString()}</p>
                        </div>

                        <div>
                          {vendor && (
                            <Image
                              src={vendor.logo || vendor.storyCover}
                              alt={`${vendor.name} logo`}
                              width={32}
                              height={32}
                              className="rounded mb-4"
                            />
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })
            }
            </ul>
          </div>
          
        </div>
      </div>
        
      <div className="pt-8! pb-16 w-full relative">
        <div className="container pr-0! relative z-1">
          <h2 className="text-3xl mb-8! z-1 relative">
            {t(dict, 'home.grower_list.title')}
          </h2>
          
          <div className="overflow-x-auto scrollbar-hide">
            <ul className="grid grid-flow-col auto-cols-[35vw] md:auto-cols-[24vw] lg:auto-cols-[15vw] gap-4 h-full">
              {VENDORS.map((ven) => (
                <li
                  key={ven.name}
                  style={{ aspectRatio: ven.aspectRatio.replace(/\[|\]/g, "") }}
                  className={`relative`}
                >
                  <Link href={`/${lang}/collections/all?vendor=${encodeURIComponent(ven.name)}`}>
                    <Image
                      src={ven.logo || ven.storyCover}
                      alt=""
                      fill
                      className="object-contain w-full h-full"
                      loading="lazy"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <svg viewBox="0 0 1120 310" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute w-screen -bottom-[15%] md:-bottom-[35%] z-0 left-0">
          <g filter="url(#filter0_g_47_4)">
            <rect x="0" y="48" width="100%" height="214" fill="white"/>
          </g>
          <defs>
            <filter id="filter0_g_47_4" x="0" y="0" width="1120" height="310" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feTurbulence type="fractalNoise" baseFrequency="0.0625 0.0625" numOctaves="3" seed="4273" />
              <feDisplacementMap in="shape" scale="96" xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%" />
              <feMerge result="effect1_texture_47_4">
              <feMergeNode in="displacedImage"/>
              </feMerge>
            </filter>
          </defs>
        </svg>

      </div>

      <div className="bg-gray-100 py-16! md:py-32! md:pt-40! lg:py-32! lg:pt-48! w-full">
        <div className="container">
          <h2 
            className="text-3xl mb-8! relative z-1" 
            dangerouslySetInnerHTML={{ __html: t(dict, 'home.letter.title') }} />
          <Letter />
        </div>
      </div>
    

    </main>
  )
}