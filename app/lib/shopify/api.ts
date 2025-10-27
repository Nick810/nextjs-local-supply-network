import { shopifyClient } from './client';
import {
  GET_PRODUCT_BY_HANDLE_QUERY,
  GET_MENU_QUERY,
  GET_METAFIELD_QUERY,
  GET_ALL_COLLECTIONS_QUERY,
  GET_COLLECTION_BY_HANDLE_QUERY,
  GET_RECOMMENDED_PRODUCTS_QUERY,
  GET_ALL_PRODUCTS_QUERY,
  GET_ALL_COLLECTIONS_AND_PRODUCTS,
} from './queries';

import {
  ShopifyMenuResponse,
  ShopifyMetaobjectsResponse,
  ShopifyCollectionsResponse,
  ShopifyCollectionByHandleResponse,
  ShopifyProductByHandleResponse,
  ShopifyRecommendedProductsResponse,
  ShopifyProductResponse,
  ShopifyCollectionAndProductResponse,
} from './types';

// 🧠 Generic wrapper for clarity and consistency
async function queryShopify<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const response = await shopifyClient.request(query, { variables });
  return response.data as T;
}

export async function getAllProducstFromAllCollections(): Promise<ShopifyCollectionAndProductResponse> {
  return await queryShopify(GET_ALL_COLLECTIONS_AND_PRODUCTS, {});
}

export async function getProductByHandle(handle: string): Promise<ShopifyProductByHandleResponse> {
  return await queryShopify(GET_PRODUCT_BY_HANDLE_QUERY, { handle });
}

export async function getAllProducts(first = 20): Promise<ShopifyProductResponse> {
  return await queryShopify(GET_ALL_PRODUCTS_QUERY, { first });
}

export async function getMenu(handle: string): Promise<ShopifyMenuResponse> {
  return await queryShopify(GET_MENU_QUERY, { handle });
}

export async function getMetaObjects(type: string, first = 10): Promise<ShopifyMetaobjectsResponse> {
  return await queryShopify(GET_METAFIELD_QUERY, { type, first });
}

export async function getAllCollections(first = 10): Promise<ShopifyCollectionsResponse> {
  return await queryShopify(GET_ALL_COLLECTIONS_QUERY, { first });
}

export async function getCollectionByHandle(handle: string, first: number = 20, after: string | null = null): Promise<ShopifyCollectionByHandleResponse> {
  return await queryShopify(GET_COLLECTION_BY_HANDLE_QUERY, { handle, first, after });
}

export async function getRecommendedProducts(productHandle: string): Promise<ShopifyRecommendedProductsResponse> {
  return await queryShopify(GET_RECOMMENDED_PRODUCTS_QUERY, { productHandle });
}
