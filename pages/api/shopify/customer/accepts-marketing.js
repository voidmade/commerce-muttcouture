import { ADMIN_API_URL, ADMIN_API_PASSWORD } from '@framework/const'

export async function putCustomerAcceptsMarketing(newStatus, customerId) {
  const now = new Date()
  const query = {
    customer: {
      id: customerId,
      accepts_marketing: newStatus,
      accepts_marketing_updated_at: now.toUTCString(),
      marketing_opt_in_level: newStatus ? 'confirmed_opt_in' : null,
    },
  }
  const res = await fetch(`${ADMIN_API_URL}/customers/${customerId}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_API_PASSWORD,
    },
    body: JSON.stringify(query),
  })
  const result = await res.json()
  return result
}
