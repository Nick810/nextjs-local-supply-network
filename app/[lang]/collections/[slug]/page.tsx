import Breadcrumb from "@/app/components/breadcrumb";
import ProductCard from "@/app/components/collections/product-card";
import Filter from "@/app/components/filter";
import { getAllCollections, getCollectionByHandle } from "@/app/lib/shopify/api"
import { ShopifyCollectionsResponse } from "@/app/lib/shopify/types";

type Props = {
  params: Promise<{ slug: string, lang: string }>
  searchParams: Promise<Record<string, string>>
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
  searchParams
}: Props) {
  const { lang, slug } = await params;
  const { collection } = await getCollectionByHandle(slug);
  const resolvedSearchParams = await searchParams;
    
  const vendor = resolvedSearchParams?.vendor ?? '';
  const tag = resolvedSearchParams?.tag ?? '';
  const grow = resolvedSearchParams?.grow ?? '';
  const priceMin = resolvedSearchParams?.price_min ?? '';
  const priceMax = resolvedSearchParams?.price_max ?? '';
  const sortBy = resolvedSearchParams?.sort_by ?? '';

  const growTypeSet = new Set(['indoor', 'sungrown']);

  const filteredProducts = collection?.products?.nodes.filter((product) => {
    const productTags = product.tags.map(t => t.toLowerCase());
    
    const matchesVendor = vendor
      ? vendor.split(',').includes(product.vendor)
      : true;

    const matchesTags = tag
      ? tag.split(',').some(t => !growTypeSet.has(t.toLowerCase()) && productTags.includes(t.toLowerCase()))
      : true;

    const matchesGrowTypes = grow
      ? grow.split(',').some(g => growTypeSet.has(g.toLowerCase()) && productTags.includes(g.toLowerCase()))
      : true;

    const price = parseFloat(product.priceRange.minVariantPrice.amount.toString() || '0');
    const matchesPriceMin = priceMin ? price >= parseFloat(priceMin) : true;
    const matchesPriceMax = priceMax ? price <= parseFloat(priceMax) : true;

    return matchesVendor && matchesTags && matchesGrowTypes && matchesPriceMin && matchesPriceMax;
  });

  let sortedProducts = filteredProducts ?? [];

  if (sortBy === 'price-ascending') {
    sortedProducts = [...sortedProducts].sort((a, b) => {
      const priceA = parseFloat(a.priceRange.minVariantPrice.amount.toString() || '0');
      const priceB = parseFloat(b.priceRange.minVariantPrice.amount.toString() || '0');
      return priceA - priceB;
    });
  } else if (sortBy === 'price-descending') {
    sortedProducts = [...sortedProducts].sort((a, b) => {
      const priceA = parseFloat(a.priceRange.minVariantPrice.amount.toString() || '0');
      const priceB = parseFloat(b.priceRange.minVariantPrice.amount.toString() || '0');
      return priceB - priceA;
    });
  }

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
  
  if (!collection) {
    return <main className="pt-24"><h1>Collection not found</h1></main>;
  }
  
  return (
    <main className="py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Breadcrumb path={slug} lang={lang} type="collections" isStaticPath/>
      <h1 className="text-4xl text-center mb-8!">{collection?.title}</h1>

      <Filter lang={lang} />

        <ul className="flex flex-wrap space-y-4 md:space-y-8">
          {sortedProducts.map((node) => (
            <ProductCard product={node} key={node.id} slug={slug} lang={lang} />
          ))}
        </ul>
      
    </main>
  )
}