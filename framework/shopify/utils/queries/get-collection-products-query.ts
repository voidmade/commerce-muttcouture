import { productConnection } from './get-all-products-query'
const getCollectionProductsQuery = /* GraphQL */ `
  query getCollectionBySlug($slug: String!) {
    collectionByHandle(handle: $slug) {
      id
      handle
      title
      description
      products(first: 70) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 10) {
              edges {
                node {
                  originalSrc
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  }
`
export default getCollectionProductsQuery
