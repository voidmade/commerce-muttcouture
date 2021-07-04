import type { GetStaticPropsContext } from 'next'
import { getConfig } from '@framework/api'
import getAllPages from '@framework/common/get-all-pages'
import useCustomer from '@framework/customer/use-customer'
import { Footer, Layout, Navbar } from '@components/common'
import { Container, Text, Box, VStack, Button, Heading } from '@chakra-ui/react'
import handleAcceptsMarketing from '@framework/api/customers/accepts-marketing'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  return {
    props: { pages },
  }
}

export default function Profile() {
  const { data } = useCustomer()
  return (
    <>
      <Navbar />
      <Container maxW="container.md" py={12}>
        <VStack spacing={12} align="left" w="100%">
          <Heading size="xl">My Profile</Heading>
          {data && (
            <VStack w="100%" spacing={12}>
              <VStack w="100%" align="left">
                <Box>
                  <Heading size="md">Full Name</Heading>
                  <Text fontSize="md">
                    {data.firstName} {data.lastName}
                  </Text>
                </Box>
                <Box>
                  <Heading size="md">Email</Heading>
                  <Text fontSize="md">{data.email}</Text>
                </Box>
              </VStack>
              <Box w="100%">
                {data?.acceptsMarketing ? (
                  <Button
                    onClick={() => {
                      handleAcceptsMarketing(data.email, false)
                    }}
                    variant="link"
                    size="lg"
                  >
                    Leave the VIP List
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      handleAcceptsMarketing(data.email, true)
                    }}
                    variant="primary"
                    size="lg"
                  >
                    Join the VIP List
                  </Button>
                )}
              </Box>
            </VStack>
          )}
        </VStack>
      </Container>
      <Footer />
    </>
  )
}

Profile.Layout = Layout
