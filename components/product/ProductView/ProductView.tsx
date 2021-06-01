import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { FC, useEffect, useState } from 'react'
import s from './ProductView.module.css'
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
  Text,
  AspectRatio,
  HStack,
} from '@chakra-ui/react'

import PageLayout from '@components/common/PageLayout'
interface Props {
  children?: any
  product: Product
  className?: string
}

const ProductView: FC<Props> = ({ product }) => {
  console.log('product', product)
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
    console.log('variant', variant)
    if (variant && variant?.price) {
      setCurrentPrice({
        amount: variant.price,
        baseAmount: product.price.retailPrice,
        currencyCode: product.price.currencyCode!,
      })
    }
  }, [variant])
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
              'scroll-snap-type': 'x mandatory',
            }}
          >
            {product.images.map((image, i) => (
              <Box
                key={image.url}
                style={{ 'scroll-snap-align': 'center' }}
                w={['100vw', null, null, '100%']}
                flexShrink={0}
                mb={[null, null, null, 8]}
              >
                <AspectRatio ratio={4 / 3}>
                  <Image
                    className={s.img}
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
                    className={s.wishlistButton}
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

            <VStack w="100%" spacing={4}>
              {product.options?.map((opt) => (
                <VStack key={opt.displayName} w="100%">
                  {opt.displayName.toLowerCase() !== 'title' && (
                    <h2 className="uppercase font-medium">{opt.displayName}</h2>
                  )}
                  <HStack w="100%">
                    {opt.values.map((v, i: number) => {
                      const active = (choices as any)[
                        opt.displayName.toLowerCase()
                      ]

                      return (
                        <Button
                          key={`${opt.id}-${i}`}
                          variant={
                            v.label.toLowerCase() === active
                              ? 'secondary'
                              : 'tertiary'
                          }
                          label={v.label}
                          w="100%"
                          onClick={() => {
                            setChoices((choices) => {
                              return {
                                ...choices,
                                [opt.displayName.toLowerCase()]: v.label.toLowerCase(),
                              }
                            })
                          }}
                        >
                          {v.label}
                        </Button>
                      )
                    })}
                  </HStack>
                </VStack>
              ))}
              <Button
                variant="primary"
                w="100%"
                size="lg"
                aria-label="Add to Bag"
                onClick={addToCart}
                disabled={loading}
              >
                <HStack w="100%" justify="space-between">
                  <Box>Add to Bag</Box> <Box>{currentPriceFormatted.price}</Box>
                </HStack>
              </Button>
            </VStack>
          </VStack>
        </Grid>
        <Box>
          <div
            id="stamped-main-widget"
            data-widget-style="standard"
            data-product-id="172077533"
            data-name={product.title}
            data-url="{{ shop.url }}{{ product.url }}"
            data-product-sku={product.handle}
            data-product-type={product.type}
          ></div>
        </Box>
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
  return (
    <Container className="max-w-none w-full" clean>
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
      <div className={cn(s.root, 'fit')}>
        <div className={cn(s.productDisplay, 'fit')}>
          <div className={s.nameBox}>
            <h1 className={s.name}>{product.name}</h1>
            <div className={s.price}>
              {price}
              {` `}
              {product.price?.currencyCode}
            </div>
          </div>

          <div className={s.sliderContainer}>
            <ProductSlider key={product.id}>
              {product.images.map((image, i) => (
                <div key={image.url} className={s.imageContainer}>
                  <Image
                    className={s.img}
                    src={image.url!}
                    alt={image.alt || 'Product Image'}
                    width={1050}
                    height={1050}
                    priority={i === 0}
                    quality="85"
                  />
                </div>
              ))}
            </ProductSlider>
          </div>
        </div>
        <div className={s.sidebar}>
          <section>
            {product.options?.map((opt) => (
              <div className="pb-4" key={opt.displayName}>
                <h2 className="uppercase font-medium">{opt.displayName}</h2>
                <div className="flex flex-row py-4">
                  {opt.values.map((v, i: number) => {
                    const active = (choices as any)[
                      opt.displayName.toLowerCase()
                    ]

                    return (
                      <Swatch
                        key={`${opt.id}-${i}`}
                        active={v.label.toLowerCase() === active}
                        variant={opt.displayName}
                        color={v.hexColors ? v.hexColors[0] : ''}
                        label={v.label}
                        onClick={() => {
                          setChoices((choices) => {
                            return {
                              ...choices,
                              [opt.displayName.toLowerCase()]: v.label.toLowerCase(),
                            }
                          })
                        }}
                      />
                    )
                  })}
                </div>
              </div>
            ))}

            <div className="pb-14 break-words w-full max-w-xl">
              <Text html={product.descriptionHtml || product.description} />
            </div>
          </section>
          <div>
            <Button
              aria-label="Add to Cart"
              type="button"
              className={s.button}
              onClick={addToCart}
              loading={loading}
            >
              Add to Cart
            </Button>
          </div>
        </div>
        {process.env.COMMERCE_WISHLIST_ENABLED && (
          <WishlistButton
            className={s.wishlistButton}
            productId={product.id}
            variant={product.variants[0]! as any}
          />
        )}
      </div>
    </Container>
  )
}

export default ProductView
