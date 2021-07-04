import { putCustomerAcceptsMarketing } from './accepts-marketing'
import { findCustomerByEmail } from './find-customer-by-email'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { customerEmail, vipStatus } = JSON.parse(req.body)
    const customerId = await findCustomerByEmail({ customerEmail })
    const newStatus = await putCustomerAcceptsMarketing(vipStatus, customerId)
    res.status(200).json(customerId, newStatus)
  }
  res.status(400)
}
