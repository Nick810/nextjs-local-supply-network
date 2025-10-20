import React from "react"
import ImageWithSkeleton from "../image-with-skeleton";

type ShopifyProductImage = {
  url: string;
  altText?: string | null;
};

type ProductImagesProps = {
  data?: ShopifyProductImage[];
};

const ProductImages: React.FC<ProductImagesProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <ul className="md:basis-[60%] lg:basis-[47%]">
      {
        data.map((image, index) => (
        <li key={index} className="relative aspect-square">
          <ImageWithSkeleton 
            src={image.url}
            alt={image.altText || `Product image ${index + 1}`}
            className="object-cover"
          />
        </li>
        )) 
      }
    </ul>
  )
}
export default ProductImages