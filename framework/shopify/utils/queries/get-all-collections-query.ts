const getSiteCollectionsQuery = /* GraphQL */ `
  query getSiteCollections($first: Int!) {
    collections(first: $first, sortKey: UPDATED_AT) {
      edges {
        node {
          products(first: 4) {
            edges {
              node {
                id
                images(first: 1) {
                  edges {
                    node {
                      altText
                      width
                      height
                      originalSrc
                    }
                  }
                }
              }
            }
          }
          id
          title
          handle
          image {
            altText
            height
            width
            id
            originalSrc
            transformedSrc(preferredContentType: WEBP)
          }
        }
      }
    }
  }
`
export default getSiteCollectionsQuery
