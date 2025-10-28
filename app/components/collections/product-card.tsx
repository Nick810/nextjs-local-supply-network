import Link from "next/link"
import ImageWithSkeleton from "../image-with-skeleton"

interface ProductProps {
  product: {
    id: string
    title: string
    handle: string
    tags: string[]
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

  return (
    <li key={product.id} className="p-1 w-1/2 md:w-1/3 lg:w-1/4 relative">
      <Link href={`/${lang}/collections/${slug}/product/${product.handle}`}>
        {product.featuredImage && (
          <div className="relative aspect-[1/1] bg-gray-100">
            {isPreorder ? <span className="text-red-600! text-xs! absolute bottom-0 left-0 z-30 bg-white">***PRE ORDER***</span> : <></>}
            <div className="absolute w-full h-full transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 z-10"
              style={{ backgroundColor: 'rgba(0, 0, 0, 1)' }}></div>
            
            {!availableForSale && isPreorder ? 
              <></>
              : !availableForSale ? 
              <>
                <div className="absolute w-full h-full bg-black opacity-50 z-10" />
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
              className="object-cover"
              width="100%"
              height="100%"
            />
          </div>
        )}
        <div className="flex flex-col">
          <h3 className="text-xl mt-2 leading-4.5!">{product.title}</h3>
          <p className="mt-2 text-sm font-bold!">
            ฿{(Number(product.priceRange.minVariantPrice.amount) * 1).toLocaleString()}
          </p>
        </div>
      </Link>
    </li>
  )
}
export default ProductCard