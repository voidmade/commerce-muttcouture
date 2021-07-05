import { FC, useEffect, useState, useCallback } from 'react'
import { validate } from 'email-validator'
import { Info } from '@components/icons'
import { useUI } from '@components/ui/context'
import { Input } from '@components/ui'
import useSignup from '@framework/auth/use-signup'
import { Box, Button, VStack, HStack, Heading } from '@chakra-ui/react'

interface Props {}

const SignUpView: FC<Props> = () => {
  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const signup = useSignup()
  const { setModalView, closeModal } = useUI()

  const handleSignup = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    try {
      setLoading(true)
      setMessage('')
      await signup({
        email,
        firstName,
        lastName,
        password,
      })
      setLoading(false)
      closeModal()
    } catch ({ errors }) {
      setMessage(errors[0].message)
      setLoading(false)
    }
  }

  const handleValidation = useCallback(() => {
    // Test for Alphanumeric password
    const validPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)

    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email) || password.length < 7 || !validPassword)
    }
  }, [email, password, dirty])

  useEffect(() => {
    handleValidation()
  }, [handleValidation])

  return (
    <form onSubmit={handleSignup}>
      <VStack align="left" spacing={8}>
        <Heading size="lg">Sign Up</Heading>
        {message && (
          <Box>
            {message}. Did you {` `}
            <Box
              as="button"
              className="text-accent-9 inline font-bold hover:underline cursor-pointer"
              onClick={() => setModalView('FORGOT_VIEW')}
            >
              forgot your password?
            </Box>
          </Box>
        )}
        <VStack align="left" spacing={4}>
          <Input placeholder="First Name" onChange={setFirstName} />
          <Input placeholder="Last Name" onChange={setLastName} />
          <Input type="email" placeholder="Email" onChange={setEmail} />
          <Input
            type="password"
            placeholder="Password"
            onChange={setPassword}
          />

          <Button
            size="lg"
            variant="primary"
            type="submit"
            loading={loading}
            disabled={disabled}
          >
            Sign Up
          </Button>
        </VStack>

        <HStack align="center" justify="center" w="100%" pb={4}>
          <span>Have an account?</span>{' '}
          <Box as="button" onClick={() => setModalView('LOGIN_VIEW')}>
            Log In
          </Box>
        </HStack>
      </VStack>
    </form>
  )
}

export default SignUpView
