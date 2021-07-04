import {
  ADMIN_API_URL,
  ADMIN_API_PASSWORD,
  ADMIN_API_TOKEN,
} from '@framework/const'

export async function findCustomerByEmail({ customerEmail }) {
  const res = await fetch(
    `${ADMIN_API_URL}/customers/search.json?query=:${customerEmail}&fields=email,id`,
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

export async function changeCustomerVipStatus(newStatus, customerId) {
  // TODO: Use similar code as above to mutate the status
  return 'new status goes here'
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { customerEmail, vipStatus } = JSON.parse(req.body)
    const customerId = await findCustomerByEmail({ customerEmail })
    const newStatus = await changeCustomerVipStatus(vipStatus, customerId)
    res.status(200).json(customerId, newStatus)
  }
  res.status(200)
}
