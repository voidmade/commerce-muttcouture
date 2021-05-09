import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />

      <ManagedUIContext>
        <ChakraProvider theme={theme}>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </ManagedUIContext>
    </>
  )
}

const theme = extendTheme({
  colors: {
    brand: {
      100: '#35F89B',
      400: '#139758',
      500: '#066F3D',
    },
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'gray.100',
        color: 'gray.700',
        fontFamily: 'Futura, Futura PT, system-font, Roboto, arial, san-serif',
        letterSpacing: '.025em',
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: 'inherit',
        letterSpacing: '.025em',
      },
      variants: {
        Headline: {
          textTransform: 'uppercase',
          letterSpacing: '.1em',
        },
      },
    },
    Button: {
      baseStyle: {
        borderRadius: 0,
        fontSize: '24px',
      },
      variants: {
        primary: {
          bg: 'gray.900',
          color: 'gray.100',
          border: '2px solid',
          borderColor: 'gray.300',
          boxShadow: '0 0 0 3px black',
          _hover: {
            bg: 'gray.300',
            color: 'gray.900',
          },
          _focus: {
            boxShadow: '0 0 3px black',
          },
        },
        secondary: {
          bg: 'gray.900',
          color: 'gray.100',
          border: '2px solid',
          borderColor: 'gray.900',
        },
        tertiary: {
          border: '2px solid',
          borderColor: 'gray.300',
        },
      },
    },
  },
})
