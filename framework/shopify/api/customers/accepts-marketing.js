import Router from 'next/router'

export default async function handleAcceptsMarketing(customerEmail, boolean) {
  const res = await fetch('/api/shopify/customer/vip', {
    method: 'POST',
    body: JSON.stringify({
      customerEmail: customerEmail,
      vipStatus: boolean,
    }),
  })

  const data = await res.json()
  if (data) {
    setTimeout(() => {
      Router.reload(window.location.pathname)
    }, 300)
  }
  return data
}
