export const SHOPIFY_CHECKOUT_ID_COOKIE = 'shopify_checkoutId'

export const SHOPIFY_CHECKOUT_URL_COOKIE = 'shopify_checkoutUrl'

export const SHOPIFY_CUSTOMER_TOKEN_COOKIE = 'shopify_customerToken'

export const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN

export const SHOPIFY_COOKIE_EXPIRE = 30

export const API_URL = `https://${STORE_DOMAIN}/api/2021-01/graphql.json`
export const ADMIN_API_URL = `https://mutt-couture.myshopify.com/admin/api/2021-04`

export const API_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
export const ADMIN_API_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN
export const ADMIN_API_PASSWORD =
  process.env.NEXT_PRIVATE_SHOPIFY_ADMIN_PASSWORD
export const ADMIN_API_SECRET = process.env.NEXT_PRIVATE_SHOPIFY_ADMIN_SECRET
