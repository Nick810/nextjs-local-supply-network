import Image from "next/image";
import Link from "next/link";
import ImageWithSkeleton from "../components/image-with-skeleton";
import { ShopifyCollectionByHandleResponse, ShopifyMetaobjectsResponse } from "../lib/shopify/types";
import { VENDORS } from "../lib/vendors";
import { getDictionary } from "./dictionaries";
import { getCollectionByHandle, getMetaObjects } from "../lib/shopify/api";
import Hero from "../components/home/hero";

type Position = 'top' | 'middle' | 'bottom'

export const dynamic = 'force-dynamic'; // Optional: forces SSR

const API_URL = process.env.NODE_ENV === 'development'
                  ? 'http://localhost:3000'
                  : process.env.NEXT_PUBLIC_SITE_URL;

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'th');
  const { collection }: ShopifyCollectionByHandleResponse = await getCollectionByHandle('all');
  const { metaobjects }: ShopifyMetaobjectsResponse = await getMetaObjects('hero');
  const heroRaw: Record<string, string> = metaobjects.edges[0].node.fields.reduce(
    (obj, item) => {
      obj[item.key] = item.value
      return obj
    },
    {} as Record<string, string>
  )
  const heroData = {
    text:     heroRaw.text ?? '',
    heading:  heroRaw.heading ?? '',
    position: (heroRaw.position as Position) ?? 'middle',
  }
  const getHeroImages = async() => {
    try {
      const res = await fetch(new URL(`${API_URL}/en/api/shopify/files/hero-desktop.png,hero.png`), {
        method: 'GET',
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status} ${res.statusText}`);
      }

      const { files } = await res.json();

      return files
    } catch (error) {
      console.error('Failed to fetch files:', error);

      return error;
    }

  }
  const files = await getHeroImages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Powerberry",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}`,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }
  
  return (
    <main className="flex flex-col items-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Hero data={heroData} images={files} lang={lang} /> 

      <div className=" py-16! w-full">
        <div className="container pr-0! lg:mr-0! xl:pl-0!">
          
          <ul className="flex flex-row overflow-x-auto scrollbar-hide space-x-4 h-full">
            {
              collection?.products?.nodes.map(( node ) => (
                <li key={node.id} className="shrink-0 w-[60vw] max-w-lg aspect-7/8 relative">
                  <ImageWithSkeleton 
                    src={node.featuredImage.url}
                    alt={node.featuredImage.altText || `Product image`}
                    className="object-cover"
                  />
                  {/* <p className='text-black'>{node.title}</p> */}
                  <p className='text-black'>{"name"}</p>
                  <p>{node.priceRange.minVariantPrice.amount}</p>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
        
      <div className="bg-gray-200 py-16! w-full">
        <div className="container pr-0!">
          <h2 className="text-2xl mb-8!">
            {/* {t(dict, 'home.title')} */}
          </h2>
          
          <ul className="flex flex-row overflow-x-auto scrollbar-hide space-x-4">
            {
              VENDORS.map(( ven ) => (
                
                <li key={ven.name} className="shrink-0 w-[35vw] max-w-sm! aspect-square relative">
                  <Link href={`/${lang}/collections/all?vendor=${encodeURIComponent(ven.name)}`}>
                    <Image 
                      src={ven.logo}
                      alt={''}
                      fill
                      loading="lazy"
                    />
                  </Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    

    </main>
  )
}