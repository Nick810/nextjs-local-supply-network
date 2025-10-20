import Breadcrumb from "@/components/breadcrumb";
import ProductCard from "@/components/collections/product-card";
import { getAllCollections, getCollectionByHandle } from "@/lib/shopify/api"
import { ShopifyCollectionsResponse } from "@/lib/shopify/types";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { collections }: ShopifyCollectionsResponse = await getAllCollections();

  return collections.nodes.map(node  => ({
    slug: node.handle
  }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { collection } = await getCollectionByHandle(slug);

  if (!collection) {
    return {
      title: 'Collection Not Found',
      description: 'The requested collection does not exist.'
    };
  }

  const { seo } = collection;

  return {
    title: seo.title,
    description: seo.description
  }
}

export default async function Page({ 
  params,
}: Props) {
  const { slug } = await params;
  const { collection } = await getCollectionByHandle(slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": collection?.title,
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/collections/${slug}`,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": 
      collection?.products.nodes.map((node, index) => (
        {
          "@type": "ListItem",
          "position": index + 1,
          "url": `${process.env.NEXT_PUBLIC_SITE_URL}/collections/${slug}/products/${node.handle}`
        }
      ))
    }
  }
  
  return (
    <main className="pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Breadcrumb path={slug} subPath={''} />
      <h1 className="text-4xl text-center mb-8!">{collection?.title}</h1>
      
        <ul className="flex flex-wrap space-y-4 md:space-y-8">
          {
            collection?.products?.nodes.map(( node ) => (
              <ProductCard product={ node } key={ node.id } slug={ slug } />
            ))
          }
        </ul>
      
    </main>
  )
}