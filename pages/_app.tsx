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
        backgroundColor: '#020305',
        color: 'rgba(255,255,255,.75)',
        fontFamily: 'Futura, Futura PT, system-font, Roboto, arial, san-serif',
      },
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontFamily: 'inherit',
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
        bg: '#1F1F1F',
        fontSize: '24px',
        _hover: {
          bg: 'black',
        },
      },
      variants: {
        primary: {
          bg: 'brand.500',
          border: '1px solid',
          borderColor: 'brand.400',
          fontFamily: 'inherit',
          _hover: {
            bg: 'brand.400',
          },
        },
        tertiary: {
          bg: '#1f1f1f',
          borderColor: 'brand.400',
          fontFamily: 'inherit',
          _hover: {
            bg: 'brand.400',
          },
        },
      },
    },
  },
})
