import { getAllProducstFromAllCollections } from '@/lib/shopify/api';
import type { MetadataRoute } from 'next'

function safeISOString(date: string | number | Date): string | undefined {
  const d = new Date(date)
  return isNaN(d.getTime()) ? undefined : d.toISOString()
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://powerberryharvest.com';
  const { collections } = await getAllProducstFromAllCollections();
  const urls: MetadataRoute.Sitemap = []
  
  for (const collection of collections.edges) {
    const collectionHandle = collection.node.handle;

    for (const product of collection.node.products.edges) {
      urls.push({
        url: `${baseUrl}/collections/${collectionHandle}/products/${product.node.handle}`,
        lastModified: safeISOString(product.node.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }

    urls.push({
      url: `${baseUrl}/collections/${collectionHandle}`,
      lastModified: safeISOString(collection.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/copyright-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/stockist`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/contact-us`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/all-products`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ]

  return [...staticUrls, ...urls]
}