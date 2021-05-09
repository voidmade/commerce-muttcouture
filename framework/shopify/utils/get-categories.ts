import { ShopifyConfig } from '../api'
import { CollectionEdge } from '../schema'
import getSiteCollectionsQuery from './queries/get-all-collections-query'
import { Node } from '@framework/schema'

export type Category = {
  entityId: string
  name: string
  path: string
  image: Object
  products: {
    edges: Node[]
  }
}

const getCategories = async (config: ShopifyConfig): Promise<Category[]> => {
  const { data } = await config.fetch(getSiteCollectionsQuery, {
    variables: {
      first: 250,
    },
  })

  return (
    data.collections?.edges?.map(
      ({
        node: { id: entityId, title: name, handle, image, products },
      }: CollectionEdge) => ({
        entityId,
        name,
        path: `/${handle}`,
        image,
        products,
      })
    ) ?? []
  )
}

export default getCategories
