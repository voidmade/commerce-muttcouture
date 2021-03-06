import { GraphQLFetcherResult } from '@commerce/api'
import { normalize } from 'node:path'
import { Collection } from 'shopify-buy'
import { getConfig, ShopifyConfig } from '../api'
import {
  normalizeProduct,
  getProductQuery,
  getCollectionProductsQuery,
} from '../utils'

type Variables = {
  id?: string
  slug?: string
  first?: number
  imageCount?: number
}

type ReturnType = {
  collection: Collection[]
}

const getProductByCollectionSlug = async (options: {
  variables: Variables
  config: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables } = options ?? {}
  config = getConfig(config)

  const { data }: GraphQLFetcherResult = await config.fetch(
    getCollectionProductsQuery,
    {
      variables,
    }
  )
  const { collectionByHandle } = data
  return {
    collection: collectionByHandle ? collectionByHandle : null,
  }
}

export default getProductByCollectionSlug
