import { ShopifyCollectionByHandleResponse, ShopifyMetaobjectsResponse } from '@/lib/shopify/types';
import { getCollectionByHandle, getMetaObjects } from "@/lib/shopify/api";
import Hero from "@/components/home/hero";

type Position = 'top' | 'middle' | 'bottom'

export const dynamic = 'force-dynamic'; // Optional: forces SSR

const API_URL = process.env.NODE_ENV === 'development'
                  ? 'http://localhost:3000'
                  : process.env.NEXT_PUBLIC_SITE_URL;

export default async function Home() { 
  const { collection }: ShopifyCollectionByHandleResponse = await getCollectionByHandle('all');
  const { metaobjects }: ShopifyMetaobjectsResponse = await getMetaObjects('hero');
  const heroRaw: Record<string, string> = metaobjects.edges[0].node.fields.reduce(
    (obj, item) => {
      obj[item.key] = item.value
      return obj
    },
    {} as Record<string, string>
  )
  // Build a strictly typed HeroData
  const heroData = {
    text:     heroRaw.text ?? '',
    heading:  heroRaw.heading ?? '',
    position: (heroRaw.position as Position) ?? 'middle',
  }
  // const res = await fetch(`${API_URL}/api/shopify/files/hero-desktop.png,hero.png`, {
  //   method: 'GET',
  //   cache: 'no-store', // optional: disable caching
  // })
  // const { files } = await res.json()

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
      {/* <Hero data={heroData} images={files} />  */}

      <div className="bg-gray-200 py-16! w-full">
        <div className="container">
          <h2 className="text-2xl">
            Every product on our platform is gauranteed 100% local grown-owned operation.
          </h2>

          <div className="flex gap-8 mt-8">
            <div className="w-30 h-15 bg-gray-400 flex items-center justify-center rounded-full">
              LOGO
            </div>
            <div className="w-30 h-15 bg-gray-400 flex items-center justify-center rounded-full">
              LOGO
            </div>
            <div className="w-30 h-15 bg-gray-400 flex items-center justify-center rounded-full">
              LOGO
            </div>
            <div className="w-30 h-15 bg-gray-400 flex items-center justify-center rounded-full">
              LOGO
            </div>
            <div className="w-30 h-15 bg-gray-400 flex items-center justify-center rounded-full">
              LOGO
            </div>
          </div>
        </div>
      </div>
      
      {/* <ul className="flex flex-wrap space-y-4 md:space-y-8">
        {
          collection?.products?.nodes.map(( node ) => (
            <ProductCard product={ node } key={ node.id } slug={ 'all-products' } />
          ))
        }
      </ul> */}

    </main>
  );
}
