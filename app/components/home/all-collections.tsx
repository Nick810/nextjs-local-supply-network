import { ShopifyCollection } from "@/app/lib/shopify/types"
import Link from "next/link"
import React from "react"
import ImageWithSkeleton from "../image-with-skeleton"

type AllCollectionsProps = {
  data: ShopifyCollection[]
}

const AllCollections: React.FC<AllCollectionsProps> = ({ data }) => {
  
  return (
    <section className="w-full">
      <ul className="flex flex-wrap items-center justify-center w-full bg-[#f1e1cd]">
        {
          data.map((collection) => (
            <li key={collection.id} className="relative w-full lg:basis-1/2 p-1">
              <Link href={`/collections/${collection.handle}`} className="relative w-full block">
                <div className="relative aspect-3/4 w-full">
                  <ImageWithSkeleton
                    src={collection.image?.url || '/hero.jpg' }
                    alt={collection.image?.altText || '' }
                    className="object-cover"
                  />
                </div>
                <button 
                  className={`absolute! bottom-10 text-center inset-x-0 left-1/2 transform -translate-x-1/2 btn max-w-[320px]! w-full m-auto`}
                  style={{ backgroundColor: collection.metafields[0].value }}>SHOP {collection.title}</button>
              </Link>
            </li>
          ))
        }
      </ul>
    </section>
  )
}
export default AllCollections