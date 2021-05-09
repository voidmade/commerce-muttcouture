import getCategories, { Category } from '../utils/get-categories'
import getVendors, { Brands } from '../utils/get-vendors'

import { getConfig, ShopifyConfig } from '../api'
import { Product } from 'shopify-buy'

export type GetSiteInfoResult<
  T extends { categories: any[]; brands: any[] } = {
    categories: Category[]
    brands: Brands
    products: { edges: Product[] }
  }
> = T

const getSiteInfo = async (options?: {
  variables?: any
  config: ShopifyConfig
  preview?: boolean
}): Promise<GetSiteInfoResult> => {
  let { config } = options ?? {}

  config = getConfig(config)

  const categories = await getCategories(config)
  const brands = await getVendors(config)

  return {
    categories,
    brands,
  }
}

export default getSiteInfo
