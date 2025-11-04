import Link from "next/link"
import ImageWithSkeleton from "../image-with-skeleton"
import { VENDORS } from "@/app/lib/vendors"
import Image from "next/image"

interface ProductProps {
  product: {
    id: string
    title: string
    handle: string
    tags: string[]
    vendor: string;
    availableForSale: boolean
    priceRange: {
      minVariantPrice: {
          amount: number;
      };
      maxVariantPrice?: {
          amount: number;
      };
    };
    featuredImage: {
      url: string;
      altText?: string | null;
    };
  }
  slug: string
  lang: string
}

const ProductCard: React.FC<ProductProps> = ({ product, slug, lang }) => {
  const { availableForSale } = product;
  const isPreorder = product.tags.includes('pre-order');
  const vendor = VENDORS.find(v => v.name.toLowerCase() === product.vendor.toLowerCase());

  return (
    <li key={product.id} className="relative">
      <Link href={`/${lang}/collections/${slug}/product/${product.handle}`}>
        {product.featuredImage && (
          <div className="relative aspect-4/5 bg-gray-100">
            {isPreorder ? <span className="text-red-600! text-xs! absolute bottom-0 left-0 z-30 bg-white">***PRE ORDER***</span> : <></>}
            <div className="absolute w-full h-full transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 z-10"
              style={{ backgroundColor: 'rgba(0, 0, 0, 1)' }}></div>
            
            {!availableForSale && isPreorder ? 
              <></>
              : !availableForSale ? 
              <>
                <div className="absolute w-full h-full bg-black opacity-50 z-10 rounded-md" />
                <div className="absolute w-full h-full z-20 flex justify-center items-center">
                  <p className="text-white! text-md font-bold">SOLD OUT</p>
                </div>
              </>
              :
              <></>
            }
            <ImageWithSkeleton 
              src={product.featuredImage.url} 
              alt={product.featuredImage.altText || ''}
              className="object-cover rounded-lg!"
              width="100%"
              height="100%"
            />
          </div>
        )}
        <div className="flex flex-row justify-between items-start mt-4">
          
          <div className="flex flex-col gap-1">
            <h3 className="text-md leading-4.5!">{product.title}</h3>
            <p>{`by ${product.vendor}`}</p>
            <p className="text-grey-200! mt-2!">
              ฿{(Number(product.priceRange.minVariantPrice.amount) * 1).toLocaleString()}
            </p>
          </div>

          <div>
            {vendor && (
              <Image
                src={vendor.logo || ''}
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
}
export default ProductCard