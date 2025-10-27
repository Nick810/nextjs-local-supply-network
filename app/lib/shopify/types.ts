export interface ShopifyProductImage {
  node: {
    url: string;
    altText?: string | null;
  };
}

export interface ShopifyProductVariant {
  availableForSale: boolean
  variantMetafield1: {
    value: string
  }
  id: string;
  title: string;
  priceV2: {
    amount: string
  }
}

export type ShopifyCollectionAndProductResponse = {
  collections: {
    edges: CollectionEdge[];
  };
};

export type CollectionEdge = {
  node: CollectionNode;
  updatedAt: string; // ISO 8601 format
};

export type CollectionNode = {
  handle: string;
  products: {
    edges: ProductEdge[];
  };
};

export type ProductEdge = {
  node: ProductNode;
};

export type ProductNode = {
  handle: string;
  updatedAt: string; // ISO 8601 format
};

export interface ShopifyProductByHandle {
  id: string;
  title: string;
  descriptionHtml: string;
  tags: string[];
  images?: {
    edges: ShopifyProductImage[];
  };
  seo: {
    title: string
    description: string
  }
  metafield1: {
    value: string
  }
  metafield2: {
    value: string
  }
  metafield3: {
    value: string
  }
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  variants: {
    nodes: ShopifyProductVariant[];
  };
}

export interface ShopifyProductByHandleResponse {
  product: ShopifyProductByHandle
}

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    handle: string;
    tags: string[];
    availableForSale: boolean
    featuredImage: {
      url: string;
      altText?: string | null;
    };
    collections: {
      nodes: Collection[]
    }
    priceRange: {
      minVariantPrice: {
        amount: string;
      }
      maxVariantPrice?: {
        amount: string;
      }
    }
  }
}

export interface Collection {
  handle: string
}

export interface ShopifyProductResponse {
  products: {
    edges: ShopifyProduct[];
  }
}

export interface ShopifyMenuItem {
  title: string;
  url: string;
}

export interface ShopifyMenuResponse {
  menu: {
    id: string;
    title: string;
    items: ShopifyMenuItem[];
  };
}

export interface ShopifyMetaobjectField {
  key: string;
  value: string;
}

export interface ShopifyMetaobjectNode {
  id: string;
  handle: string;
  type: string;
  fields: ShopifyMetaobjectField[];
}

export interface ShopifyMetaobjectsResponse {
  metaobjects: {
    edges: { node: ShopifyMetaobjectNode }[];
  };
}

export interface MetaFields {
  key: string;
  value: string;
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  description?: string;
  metafields: MetaFields[]
  image?: {
    url: string;
    altText?: string;
  } | null;
}

export interface ShopifyCollectionsResponse {
  collections: {
    nodes: ShopifyCollection[];
  };
}

export interface ShopifyCollectionProduct {
  id: string;
  title: string;
  handle: string;
  tags: string[];
  vendor: string;
  pageInfo?: {
    hasNextPage: boolean;
    endCursor: string;
  }
  availableForSale: boolean;
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
  featuredImage: {
    url: string;
    altText?: string | null;
  };
}

export interface ShopifyCollectionByHandleResponse {
  collection: {
    title: string;
    seo: {
      title: string
      description: string
    }
    products: {
      pageInfo?: {
        hasNextPage: boolean;
        endCursor: string;
      }
      nodes: ShopifyCollectionProduct[];
    };
  } | null;
}

export interface ShopifyRecommendedProduct {
  title: string;
  handle: string;
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
  featuredImage: {
    url: string;
    altText?: string | null;
  } | null;
}

export interface ShopifyRecommendedProductsResponse {
  productRecommendations: ShopifyRecommendedProduct[];
}