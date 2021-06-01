import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { ChakraProvider, extendTheme, LightMode } from '@chakra-ui/react'

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
          <LightMode>
            <Layout pageProps={pageProps}>
              <Component {...pageProps} />
            </Layout>
          </LightMode>
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
        fontFamily:
          'futura-pt, Futura, Futura PT, system-font, Roboto, arial, san-serif',
        letterSpacing: '.025em',
        fontWeight: 300,
        overflowX: 'hidden',
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: 'inherit',
        letterSpacing: '.025em',
        fontWeight: 400,
      },
      variants: {
        Headline: {
          textTransform: 'uppercase',
          letterSpacing: '.1em',
        },
      },
    },
    Text: {
      baseStyle: {
        fontWeight: 400,
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
            borderColor: 'gray.900',
          },
          _focus: {
            boxShadow: '0 0 3px black',
          },
          _disabled: {
            bg: 'gray.900',
            color: 'white',
            opacity: 0.5,
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
