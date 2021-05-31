import {
  Box,
  Heading,
  Container,
  VStack,
  Text,
  Button,
  Checkbox,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useCustomer } from '@framework/customer'
import { useUI } from '@components/ui/context'
import { Modal, LoadingDots } from '@components/ui'
import LoginView from '@components/auth/LoginView'
import dynamic from 'next/dynamic'

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
)

const dynamicProps = {
  loading: () => <Loading />,
}

const SignUpView = dynamic(
  () => import('@components/auth/SignUpView'),
  dynamicProps
)

const ForgotPassword = dynamic(
  () => import('@components/auth/ForgotPassword'),
  dynamicProps
)

const VipFence = ({ children }) => {
  const { data: customer } = useCustomer()
  const { modalView, displayModal, closeModal, openModal } = useUI()
  if (!customer) {
    return (
      <Box py={32}>
        <Container maxW="container.xl">
          <VStack maxW="400px" mx="auto" textAlign="center" spacing={4}>
            <Heading size="xl">This Page is for VIP Members Only</Heading>
            <Text fontSize="xl">
              You need to be logged in and opted-in to the Mutt Couture VIP List
              to access this page
            </Text>
            <Button
              onClick={() => openModal()}
              variant="primary"
              size="lg"
              w="100%"
            >
              Sign In
            </Button>
            <Box>
              <Text>
                First dibs on sales • Access to exclusive products • Behind the
                scenes insights • Vote on new products
              </Text>
            </Box>
            <Box fontSize="lg" bg="gray.200" p={8} w="100%">
              <Text>Want to shop exclusive products?</Text>
              <Text>
                <Link href="/vip" passHref>
                  <Box
                    as="a"
                    variant="link"
                    textDecor="underline"
                    _hover={{ textDecor: 'none' }}
                  >
                    Become a VIP for Free
                  </Box>
                </Link>
              </Text>
            </Box>
          </VStack>
          <Modal open={displayModal} onClose={closeModal}>
            {modalView === 'LOGIN_VIEW' && <LoginView />}
            {modalView === 'SIGNUP_VIEW' && <SignUpView />}
            {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
          </Modal>
        </Container>
      </Box>
    )
  } else if (customer && customer?.acceptsMarketing) {
    return <>{children}</>
  } else {
    return (
      <Box py={32}>
        <Container maxW="container.xl">
          <VStack maxW="400px" mx="auto" textAlign="center" spacing={4}>
            <Heading size="xl">This Page is for VIP Members Only</Heading>
            <Text fontSize="xl">
              You need to be opted-in to the Mutt Couture VIP List to access
              this page.
            </Text>
            <Checkbox>Accept marketing emails and become a VIP</Checkbox>
            <Button
              onClick={() => openModal()}
              variant="primary"
              size="lg"
              w="100%"
            >
              Sign In
            </Button>
            <Box>
              <Text>
                First dibs on sales • Access to exclusive products • Behind the
                scenes insights • Vote on new products
              </Text>
            </Box>
            <Box fontSize="lg" bg="gray.200" p={8} w="100%">
              <Text>Want to shop exclusive products?</Text>
              <Text>
                <Link href="/vip" passHref>
                  <Box
                    as="a"
                    variant="link"
                    textDecor="underline"
                    _hover={{ textDecor: 'none' }}
                  >
                    Become a VIP for Free
                  </Box>
                </Link>
              </Text>
            </Box>
          </VStack>
          <Modal open={displayModal} onClose={closeModal}>
            {modalView === 'LOGIN_VIEW' && <LoginView />}
            {modalView === 'SIGNUP_VIEW' && <SignUpView />}
            {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
          </Modal>
        </Container>
      </Box>
    )
  }
}

export default VipFence
