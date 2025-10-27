import Link from "next/link"
// import ProductCard from "../all-products/product-card"

interface ProductProps {
  data: ShopifyEdge[]
}

interface Collection {
  handle: string
}

interface ShopifyEdge {
  node: {
    id: string
    title: string
    handle: string
    tags: string[]
    availableForSale: boolean
    featuredImage: {
        url: string;
        altText?: string | null;
      };
      collections: {
          nodes: Collection[];
      };
      priceRange: {
        minVariantPrice: {
            amount: string;
        };
        maxVariantPrice?: {
            amount: string;
        };
      };
  }
}

const AllProducts: React.FC<ProductProps> = ({ data }) => {
  console.log(data)
  return (
    <section className="pb-1 w-full">
      <div>
        <h2 className="text-4xl text-center my-8!">SHOP COLLECTION</h2>
      </div>

      {/* <ul className="flex flex-wrap mb-12 gap-y-8">
        {
          data.map((product, index) => (
            <ProductCard product={ product } key={index + 1} />
          ))
        }
      </ul> */}

      <Link 
        href="/all-products" 
        className="btn bg-[#333]! max-w-[320px]! m-auto rotate-3">SHOP ALL</Link>
    </section>
  )
}
export default AllProducts