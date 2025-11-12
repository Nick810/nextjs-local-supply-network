import Link from "next/link";
import ImageWithSkeleton from "../image-with-skeleton";
import Image from "next/image";
import { VENDORS } from "@/app/lib/vendors";

type RecommendedProduct = {
  title: string;
  handle: string;
  vendor: string;
  priceRange: {
    minVariantPrice: {
      amount: number;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: number;
      currencyCode: string;
    };
  };
  featuredImage?: {
    url: string;
    altText?: string | null;
  } | null;
};

type RecommendedProductsProps = {
  products: RecommendedProduct[];
  collectionHandle: string;
};

const RecommendedProducts: React.FC<RecommendedProductsProps> = ({ products, collectionHandle }) => {

  return (
    <ul className="flex overflow-x-auto space-x-4 no-scrollbar snap-x snap-mandatory h-full">
      {
        products.map((product, index) => {
          const vendor = VENDORS.find(v => v.name.toLowerCase() === product.vendor.toLowerCase());
          
          return (
            <li key={index} className="relative min-w-[65vw] md:min-w-[44vw] lg:min-w-[33vw] xl:min-w-[25vw] xl:max-w-[346px]">
              <Link href={`/collections/${collectionHandle}/product/${product.handle}`}>
                {product.featuredImage && (
                  <div className="aspect-square"> 
                    <ImageWithSkeleton 
                    src={product.featuredImage.url} 
                    alt={product.featuredImage.altText || `Recommended product ${index + 1}`}
                    className="object-cover rounded-xl"
                    />
                  </div>
                )}
              <div className="flex flex-row justify-between items-start mt-4">
                <div className="flex flex-col">
                  <h3 className="text-md leading-4.5! font-normal!">{product.title}</h3>
                  <p className="mt-2">{`by ${product.vendor}`}</p>
                  <p className="mt-2 text-sm font-bold!">
                    ฿{Number(product.priceRange.minVariantPrice.amount * 1).toLocaleString()}
                  </p>
                </div>
                
                <div>
                  {vendor && (
                    <Image
                      src={vendor.logo || vendor.storyCover}
                      alt={`${vendor.name} logo`}
                      width={40}
                      height={40}
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
  )
}
export default RecommendedProducts