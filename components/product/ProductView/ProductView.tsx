import cn from 'classnames'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { FC, useEffect, useState } from 'react'
import s from './ProductView.module.css'
import { Swatch, ProductSlider } from '@components/product'
import { Text, useUI } from '@components/ui'
import type { Product } from '@commerce/types'
import usePrice from '@framework/product/use-price'
import { useAddItem } from '@framework/cart'
import { getVariant, SelectedOptions } from '../helpers'
import WishlistButton from '@components/wishlist/WishlistButton'

import {
  Box,
  Container,
  Grid,
  Heading,
  HStack,
  VStack,
  Button,
  Flex,
  AspectRatio,
} from '@chakra-ui/react'
import { Bag } from '@components/icons'
import PageLayout from '@components/common/PageLayout'

interface Props {
  children?: any
  product: Product
  className?: string
}

const ProductView: FC<Props> = ({ product }) => {
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

  const [optionsOpen, setOptionsOpen] = useState(true)

  const widths = product.options?.find((opt) => opt.displayName === 'Thickness')
  const lengths = product.options?.find((opt) => opt.displayName === 'Size')

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

  const variant = getVariant(product, choices)

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

  const measurementValues = {
    '.75-Inch': {
      sm: '5.75 - 8',
      md: '8.75 - 11',
      lg: '11.75 - 14',
    },
    '1-Inch': {
      sm: '11 - 14',
      md: '15 - 18',
      lg: '19-22',
    },
    '1.5-Inch': {
      sm: '13 - 16',
      md: '17 - 20',
      lg: '21 - 24',
    },
    '2-Inch': {
      sm: '15 - 18',
      md: '19 - 22',
      lg: '23 - 26',
    },
  }
  return (
    <PageLayout>
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
      <Container maxW="container.xl" my="100px">
        <Grid templateColumns={['100%', '2fr 1fr']} gap="3rem" height="100%">
          <VStack spacing={8}>
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
          </VStack>

          <VStack spacing="3rem" align="start" position="sticky" top="0px">
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
              {usePrice(currentPrice)?.price}
              {` `}
              {product.price?.currencyCode}
            </Box>

            <Box w="100%" bg="gray.50" maxW="400px">
              {optionsOpen && (
                <VStack spacing="20px" padding="20px" w="100%">
                  <Heading size="sm" variant="headline">
                    Customize Your Collar
                  </Heading>
                  {widths &&
                    widths.values.map((v, i: number) => {
                      const opt = widths
                      const currentWidthLabel = v.label
                      const activeWidth = (choices as any)[
                        opt.displayName.toLowerCase()
                      ]
                      const collarImage = () => {
                        let image = ''
                        switch (currentWidthLabel.toLowerCase()) {
                          case '.75-inch':
                            image = '/images/collar-sizes-02.svg'
                            break
                          case '1-inch':
                            image = '/images/collar-sizes-05.svg'
                            break
                          case '1.5-inch':
                            image = '/images/collar-sizes-08.svg'
                            break
                          case '2-inch':
                            image = '/images/collar-sizes-11.svg'
                            break
                        }
                        return image
                      }

                      return (
                        <VStack
                          w="100%"
                          align="start"
                          spacing="20px"
                          cursor="pointer"
                          border={
                            v.label.toLowerCase() === activeWidth
                              ? '3px solid black'
                              : '3px solid transparent'
                          }
                          backgroundColor="white"
                          key={`${opt.id}-${i}`}
                          onClick={() => {
                            setChoices((choices) => {
                              return {
                                ...choices,
                                [widths.displayName.toLowerCase()]: v.label.toLowerCase(),
                              }
                            })
                          }}
                        >
                          <HStack w="100%">
                            <Heading
                              margin="15px"
                              size="md"
                              flexShrink={0}
                              mr="2rem"
                            >
                              {v.label} Wide
                            </Heading>
                            {collarImage() && (
                              <Box marginY="15px" pt="15px">
                                <Image
                                  src={collarImage()}
                                  height="100"
                                  width="500"
                                  alt=""
                                  objectFit="cover"
                                  objectPosition="left center"
                                />
                              </Box>
                            )}
                          </HStack>

                          <HStack w="100%" padding="0 10px 10px">
                            {lengths &&
                              lengths.values.map((length, i: number) => {
                                let buttonLabel = []
                                const activeLength = (choices as any)[
                                  lengths.displayName.toLowerCase()
                                ]
                                const lengthByWidth =
                                  measurementValues[currentWidthLabel]
                                switch (length.label) {
                                  case 'Small':
                                    buttonLabel = [lengthByWidth?.sm, 'SM']
                                    break
                                  case 'Medium':
                                    buttonLabel = [lengthByWidth?.md, 'MD']
                                    break
                                  case 'Large':
                                    buttonLabel = [lengthByWidth?.lg, 'LG']
                                    break
                                  default:
                                    return <Box>{length.label}</Box>
                                }
                                return (
                                  <Button
                                    w="100%"
                                    display="flex"
                                    alignContent="baseline"
                                    fontSize="14"
                                    variant={
                                      currentWidthLabel.toLowerCase() ===
                                        activeWidth &&
                                      length.label.toLowerCase() ===
                                        activeLength
                                        ? 'secondary'
                                        : 'tertiary'
                                    }
                                    onClick={() => {
                                      setChoices((choices) => {
                                        return {
                                          ...choices,
                                          [widths.displayName.toLowerCase()]: v.label.toLowerCase(),
                                          [lengths.displayName.toLowerCase()]: length.label.toLowerCase(),
                                        }
                                      })
                                    }}
                                  >
                                    {buttonLabel[0]}
                                    {'" '}

                                    <Box
                                      ml="10px"
                                      fontSize=".7em"
                                      alignSelf="center"
                                    >
                                      {buttonLabel[1]}
                                    </Box>
                                  </Button>
                                )
                              })}
                          </HStack>
                        </VStack>
                      )
                    })}
                  {!widths?.values &&
                    product.options?.map((opt) => (
                      <div className="pb-4" key={opt.displayName}>
                        <h2 className="uppercase font-medium">
                          {opt.displayName}
                        </h2>
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
                </VStack>
              )}

              {optionsOpen && (
                <Button
                  aria-label="Add to Bag"
                  onClick={addToCart}
                  disabled={loading}
                  w="calc(100% - 4px)"
                  variant="primary"
                  size="lg"
                  py="2rem"
                  mx="2px"
                >
                  <Flex
                    justifyContent="space-between"
                    flexWrap="nowrap"
                    w="100%"
                  >
                    <Bag />
                    <Flex
                      alignContent="baseline"
                      flexGrow="1"
                      textAlign="left"
                      ml="1.5rem"
                    >
                      {' '}
                      Add to Bag
                    </Flex>
                    <Flex alignContent="baseline">
                      {usePrice(currentPrice)?.price}
                    </Flex>
                  </Flex>
                </Button>
              )}
              {!optionsOpen && (
                <Button
                  aria-label="Customize Collar"
                  onClick={() => setOptionsOpen(true)}
                  disabled={loading}
                  w="100%"
                  variant="primary"
                  size="lg"
                  borderRadius="18px"
                  py="2rem"
                >
                  <Flex
                    justifyContent="space-between"
                    flexWrap="nowrap"
                    w="100%"
                  >
                    <Bag />
                    <Flex
                      alignContent="baseline"
                      flexGrow="1"
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
            </Box>

            <Box>
              <Text html={product.descriptionHtml || product.description} />
            </Box>
          </VStack>
        </Grid>
      </Container>
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
