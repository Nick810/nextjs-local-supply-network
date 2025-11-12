import Breadcrumb from "@/app/components/breadcrumb";
import Product from "@/app/components/product/product";
import RecommendedProducts from "@/app/components/product/recommended-products";
import { getAllProducts, getProductByHandle, getRecommendedProducts } from "@/app/lib/shopify/api";
import { ShopifyProductResponse } from "@/app/lib/shopify/types";
import { setRequestLocale } from "next-intl/server";
import { t } from "@/app/lib/utils";
import { getDictionary } from "@/app/[lang]/dictionaries";

type Props = {
  params: Promise<{ slug: string; itemHandle: string, lang: string }>
}

export async function generateStaticParams() {
  const { products }: ShopifyProductResponse = await getAllProducts();
  const params = products.edges.flatMap(({ node }) =>
    node.collections.nodes.map(collection => ({
      slug: collection.handle,
      itemHandle: node.handle,
    }))
  );

  return params;
}

export async function generateMetadata({ params }: Props) {
  const { slug, itemHandle } = await params;
  const { product } = await getProductByHandle(itemHandle);
  const { seo } = product;
  const featuredImage = product?.images?.edges[0]?.node;

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://powerberryharvest.com/collections/${slug}/products/${itemHandle}`,
      siteName: 'Powerberry Harvest',
      images: [
        {
          url: featuredImage?.url ?? 'https://cdn.shopify.com/s/files/1/0948/0618/0125/files/meta-image.jpg?v=1755860664',
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [featuredImage?.url ?? 'https://cdn.shopify.com/s/files/1/0948/0618/0125/files/meta-image.jpg?v=1755860664'],
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug, itemHandle, lang } = await params;
  const { product } = await getProductByHandle(itemHandle);
  const { productRecommendations } = await getRecommendedProducts(itemHandle);
  const { seo } = product;
  const dict = await getDictionary(lang as 'en' | 'th');
  // const jsonLd = {
  //   "@context": "https://schema.org",
  //   "@type": "Product",
  //   "name": `${product.title}`,
  //   "image": [
  //     `${process.env.NEXT_PUBLIC_SITE_URL}/images/product.jpg`
  //   ],
  //   "description": seo.description,
  //   // "sku": "SKU12345",
  //   "brand": {
  //     "@type": "Brand",
  //     "name": "Powerberry"
  //   },
  //   "offers": {
  //     "@type": "Offer",
  //     "url": `${process.env.NEXT_PUBLIC_SITE_URL}/collections/${slug}/products/${itemHandle}`,
  //     "priceCurrency": "THB",
  //     "price": `${product.priceRange.minVariantPrice.amount}`,
  //     "availability": "https://schema.org/InStock",
  //     "itemCondition": "https://schema.org/NewCondition"
  //   }
  // }

  setRequestLocale(lang);
  
  return (
    <main className="pt-24">
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      /> */}
      <div className="container">
        <Breadcrumb path={slug} lang={lang} subPath={product?.title} type="collections" />
      </div>
      <Product product={product} lang={lang} />

      <div className="py-24 pl-[5%]">
        { productRecommendations.length > 0 && <h2 className="text-4xl mb-8!">{t(dict, 'product.recommended_products.title')}</h2>}
        <RecommendedProducts products={productRecommendations} collectionHandle={slug} />
      </div>
    </main>
  )
}
