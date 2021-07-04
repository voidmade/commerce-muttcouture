import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { FC, useEffect, useState } from 'react'
import { Swatch, ProductSlider } from '@components/product'
import { useUI } from '@components/ui'
import type { Product } from '@commerce/types'
import usePrice from '@framework/product/use-price'
import { useAddItem } from '@framework/cart'
import { getVariant, SelectedOptions } from '../helpers'
import WishlistButton from '@components/wishlist/WishlistButton'
import { Bag } from '@components/icons'
import React from 'react'
import {
  Box,
  Container,
  Grid,
  Heading,
  VStack,
  Button,
  Flex,
  Text,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  AspectRatio,
  HStack,
  TabPanel,
  Tabs,
  TabList,
  Tab,
  TabPanels,
} from '@chakra-ui/react'

import base64 from 'base-64'

import PageLayout from '@components/common/PageLayout'
import ProductOptions from '@components/product/ProductOptions'
import { AnimateSharedLayout } from 'framer-motion'
import { useRouter } from 'next/router'
import Head from 'next/head'
interface Props {
  children?: any
  product: Product
  className?: string
}

const ProductView: FC<Props> = ({ product }) => {
  console.log('product', product)
  const router = useRouter()
  const {
    isModalOpen: isOpen,
    onModalOpen: onOpen,
    onModalClose: onClose,
  } = useDisclosure()
  const addItem = useAddItem()
  const price = {
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  }
  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [choices, setChoices] = useState<SelectedOptions>({})
  const [currentPrice, setCurrentPrice] = useState(price)
  const [optionsOpen, setOptionsOpen] = useState(false)
  const widths = product.options?.find((opt) => opt.displayName === 'Thickness')
  const lengths = product.options?.find((opt) => opt.displayName === 'Size')

  const variant = getVariant(product, choices)

  useEffect(() => {
    // Selects the default option
    product.variants[0].options?.forEach((v) => {
      setChoices((choices) => ({
        ...choices,
        [v.displayName.toLowerCase()]: v.values[0].label.toLowerCase(),
      }))
    })
  }, [])

  useEffect(() => {
    if (!choices?.thickness) return

    const currentVariant = product.variants.find((v) =>
      v.name.toLowerCase().includes((choices?.thickness).toLowerCase())
    )
    if (currentVariant && currentVariant?.price) {
      setCurrentPrice({
        amount: currentVariant.price,
        baseAmount: product.price.retailPrice,
        currencyCode: product.price.currencyCode!,
      })
    }
  }, [choices])
  const currentPriceFormatted = usePrice(currentPrice)

  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0].id),
      })
      openSidebar()
      setLoading(false)
      setOptionsOpen(false)
    } catch (err) {
      setLoading(false)
    }
  }
  return (
    <PageLayout>
      <Container maxW="container.xl" my="100px">
        <Grid
          templateColumns={['100%', null, null, '1.5fr 1fr', '2fr 1fr']}
          gap="3rem"
          height="100%"
        >
          <Box
            display="flex"
            flexDirection={['row', null, null, 'column']}
            spacing={[0, null, 8]}
            overflowX={['scroll', null, null, 'auto']}
            style={{
              scrollSnapType: 'x mandatory',
            }}
          >
            {product.images.map((image, i) => (
              <Box
                key={image.url}
                style={{ scrollSnapType: 'center' }}
                w={['100vw', null, null, '100%']}
                flexShrink={0}
                mb={[null, null, null, 8]}
              >
                <AspectRatio ratio={4 / 3}>
                  <Image
                    src={image.url!}
                    alt={image.alt || 'Product Image'}
                    layout="fill"
                    priority={i === 0}
                    quality="85"
                  />
                </AspectRatio>
              </Box>
            ))}
          </Box>

          <VStack spacing={12} align="start" position="sticky" top="0px">
            <VStack align="start" w="100%" spacing={6}>
              <Heading size="xl" as="h1">
                {product.name}
              </Heading>
              <Box>
                {process.env.COMMERCE_WISHLIST_ENABLED && (
                  <WishlistButton
                    productId={product.id}
                    variant={product.variants[0]! as any}
                  />
                )}
                {currentPriceFormatted?.price}
                {` `}
                {product.price?.currencyCode}
              </Box>
              <Text>{product.description}</Text>
              <HStack
                justify="space-between"
                w="100%"
                divider={
                  <Box w="3px" h="3px" transform="rotate(45deg)" bg="black" />
                }
              >
                <Text fontSize="xs">Genuine Leather</Text>

                <Text fontSize="xs">Metal Hardware</Text>
                <Text fontSize="xs">Shipped from California</Text>
              </HStack>
            </VStack>

            {useBreakpointValue({
              base: (
                <AnimateSharedLayout>
                  {!optionsOpen && (
                    <Button
                      aria-label="Customize Collar"
                      onClick={() => setOptionsOpen(true)}
                      disabled={loading}
                      w="100%"
                      variant="primary"
                      size="lg"
                      py="2rem"
                      layoutId="product-cta"
                    >
                      <Flex
                        justifyContent="space-between"
                        flexWrap="nowrap"
                        w="100%"
                      >
                        <Bag />
                        <Flex
                          alignContent="baseline"
                          flexGrow={1}
                          textAlign="left"
                          ml="1.5rem"
                        >
                          {' '}
                          Customize Collar
                        </Flex>
                        <Flex alignContent="baseline"></Flex>
                      </Flex>
                    </Button>
                  )}
                  <Modal isOpen={optionsOpen} onClose={onClose} size="full">
                    <ModalOverlay />
                    <ModalContent>
                      <ProductOptions
                        addToCart={addToCart}
                        widths={widths}
                        lengths={lengths}
                        setChoices={setChoices}
                        choices={choices}
                        currentPriceFormatted={currentPriceFormatted}
                        loading={loading}
                        optionsOpen={optionsOpen}
                        setOptionsOpen={setOptionsOpen}
                      />
                    </ModalContent>
                  </Modal>
                </AnimateSharedLayout>
              ),
              lg: (
                <ProductOptions
                  addToCart={addToCart}
                  widths={widths}
                  lengths={lengths}
                  setChoices={setChoices}
                  choices={choices}
                  currentPriceFormatted={currentPriceFormatted}
                  loading={loading}
                  optionsOpen={optionsOpen}
                  setOptionsOpen={setOptionsOpen}
                />
              ),
            })}
          </VStack>
        </Grid>
        <Tabs>
          <TabList>
            <Tab>Reviews</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Head>
                <script
                  type="text/javascript"
                  src="https://cdn1.stamped.io/files/widget.min.js"
                />
                <script
                  type="text/javascript"
                  dangerouslySetInnerHTML={{
                    __html: `//<![CDATA[ 
StampedFn.init({ apiKey: 'pubkey-KqC64avS5g436V0hyv17FiKXHr2432', storeUrl: 'mutt-couture.myshopify.com' }); 
// ]]`,
                  }}
                />
              </Head>
              <Box
                id="stamped-main-widget"
                data-widget-style="standard"
                data-name={product.title}
                data-product-id={base64.decode(product.id).replace(/\D+/g, '')}
                data-url={router.asPath}
                data-product-sku={product.handle}
                data-product-type={product.type}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <NextSeo
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />
    </PageLayout>
  )
}

export default ProductView
