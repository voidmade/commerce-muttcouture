import { FC, useEffect, useState, useCallback } from 'react'
import { Input } from '@components/ui'
import useLogin from '@framework/auth/use-login'
import { useUI } from '@components/ui/context'
import { validate } from 'email-validator'
import { Box, Button, VStack, HStack, Heading } from '@chakra-ui/react'

interface Props {}

const LoginView: FC<Props> = () => {
  // Form State
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const { setModalView, closeModal } = useUI()

  const login = useLogin()

  const handleLogin = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault()

    if (!dirty && !disabled) {
      setDirty(true)
      handleValidation()
    }

    try {
      setLoading(true)
      setMessage('')
      await login({
        email,
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
    <form onSubmit={handleLogin}>
      <VStack align="left" spacing={8}>
        <Heading size="lg">Log In</Heading>
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
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            onChange={setEmail}
            w="100%"
            size="lg"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            onChange={setPassword}
            w="100%"
            size="lg"
          />

          <Button
            size="lg"
            variant="primary"
            type="submit"
            loading={loading}
            disabled={disabled}
          >
            Log In
          </Button>
        </VStack>

        <HStack align="center" justify="center" w="100%" pb={4}>
          <span>Don't have an account?</span>
          {` `}
          <Box as="button" onClick={() => setModalView('SIGNUP_VIEW')}>
            Sign Up
          </Box>
        </HStack>
      </VStack>
    </form>
  )
}

export default LoginView
