import { GraphQLFetcherResult } from '@commerce/api'
import { getConfig, getAdminConfig, ShopifyConfig } from '../api'
import { normalizeProduct, getProductQuery } from '../utils'

type Variables = {
  slug: string
}

type ReturnType = {
  product: any
}

const getProduct = async (options: {
  variables: Variables
  config: ShopifyConfig
  preview?: boolean
}): Promise<ReturnType> => {
  let { config, variables } = options ?? {}
  config = getConfig(config)

  let adminConfig = getAdminConfig(config || {})

  const { data }: GraphQLFetcherResult = await config.fetch(getProductQuery, {
    variables,
  })
  const { productByHandle } = data

  const adminApiData = await adminConfig.fetch(getProductQuery, {
    variables,
  })

  console.log('adminApiData', adminApiData)

  return {
    product: productByHandle ? normalizeProduct(productByHandle) : null,
  }
}

export default getProduct
