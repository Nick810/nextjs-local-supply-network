import { createGraphQLClient, CustomFetchApi } from '@shopify/graphql-client';
import fetch from 'cross-fetch';
import { getCache, setCache } from './shopify-cache';

const customFetchApi: CustomFetchApi = async (url, init) => {
  const cacheKey = `${url}:${JSON.stringify(init)}`;
  const cached = getCache<Response>(cacheKey);

  if (cached) {
    return cached.clone(); // Clone to avoid locked streams
  }

  const response = await fetch(url, init);
  setCache(cacheKey, response.clone(), 60); // Cache for 60s

  return response;
};

export const shopifyClient = createGraphQLClient({
  url: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_URL!,
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_TOKEN!,
  },
  customFetchApi,
  retries: 1
});
