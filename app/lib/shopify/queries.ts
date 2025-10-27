import { gql } from 'graphql-request';

export const GET_PRODUCT_BY_HANDLE_QUERY = gql`
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      title
      tags
      descriptionHtml
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      metafield1: metafield(namespace: "custom", key: "limit_amount") {
        value
      }
      metafield2: metafield(namespace: "custom", key: "size_chart") {
        value
      }
      metafield3: metafield(namespace: "custom", key: "preorder_message") {
        value
      }
      seo {
        title
        description
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        nodes {
          availableForSale
          id
          image {
            altText
            id
            src
            url
          }
          priceV2 {
            amount
          }
          title
          variantMetafield1: metafield(namespace: "custom", key: "is_preorder") {
            value
          }
        }
      }
    }
  }
`;

export const GET_ALL_COLLECTIONS_AND_PRODUCTS = gql`
  query getEverything {
  collections(first: 10) {
    edges {
      node {
        handle
        updatedAt
        products(first: 100) {
          edges {
            node {
              handle
              updatedAt
            }
          }
        }
      }
    }
  }
}
`

export const GET_ALL_PRODUCTS_QUERY = gql`
  query getAllProducts($first: Int = 20) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          tags
          availableForSale
          collections(first: 10) {
            nodes {
              handle
            }
          }
          priceRange {
            minVariantPrice {
              amount
            }
            maxVariantPrice {
              amount
            }
          }
          featuredImage {
            url
            altText
          }
        }
      }
    }
  }
`;

export const GET_MENU_QUERY = gql`
  query getMainMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        url
      }
    }
  }
`;

export const GET_METAFIELD_QUERY = gql`
  query GetHeroMetaobjects($type: String!, $first: Int!) {
    metaobjects(type: $type, first: $first) {
      edges {
        node {
          id
          handle
          type
          fields {
            key
            value
          }
        }
      }
    }
  }
`;

export const GET_ALL_COLLECTIONS_QUERY = gql`
  query getAllCollections($first: Int = 20) {
    collections(first: $first) {
      nodes {
        id
        handle
        title
        metafields(identifiers: [{ namespace: "custom", key: "button_color_for_home_page" }]) {
          key
          value
        }
        image {
          altText
          url
        }
      }
    }
  }
`;

export const GET_COLLECTION_BY_HANDLE_QUERY = gql`
  query getCollectionByHandle($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      title
      seo {
        title
        description
      }
      products(first: $first, sortKey: MANUAL, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
          handle
          tags
          vendor
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
          }
        }
      }
    }
  }
`;

export const GET_RECOMMENDED_PRODUCTS_QUERY = gql`
  query getRecommendedProducts($productHandle: String!) {
    productRecommendations(productHandle: $productHandle) {
      availableForSale
      title
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      featuredImage {
        url
        altText
      }
    }
  }
`;  