import { ADMIN_API_URL, ADMIN_API_PASSWORD } from '@framework/const'

// MAY NOT NEED THIS, ATOB

export async function findCustomerByEmail({ customerEmail }) {
  const res = await fetch(
    `${ADMIN_API_URL}/customers/product.json?query=:${customerEmail}&fields=email,id`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ADMIN_API_PASSWORD,
      },
    }
  )
  const result = await res.json()
  const customer =
    result.customers.find((obj) => obj.email === customerEmail) || null
  return customer ? customer.id : null
}
