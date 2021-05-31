const customerAcceptsMarketing = /* GraphQL */ `
  mutation customerUpdate(
    $customerAccessToken: String!
    $customer: CustomerUpdateInput!
    $acceptsMarketing: Boolean!
  ) {
    customerUpdate(
      customerAccessToken: $customerAccessToken
      customer: $customer
      acceptsMarketing: $acceptsMarketing
    ) {
      customer {
        id
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`
export default customerAcceptsMarketing
