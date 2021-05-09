import { Layout } from '@components/common'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { getConfig } from '@framework/api'
import getAllProducts from '@framework/product/get-all-products'
import getSiteInfo from '@framework/common/get-site-info'
import getAllPages from '@framework/common/get-all-pages'

import PageLayout from '@components/common/PageLayout'

import {
  Container,
  Grid,
  Box,
  Button,
  Heading,
  AspectRatio,
  VStack,
  Text,
  LinkOverlay,
  LinkBox,
} from '@chakra-ui/react'
import Image from 'next/image'
import { RightArrow } from '@components/icons'
import Link from 'next/link'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  const { products } = await getAllProducts({
    variables: { first: 12 },
    config,
    preview,
  })

  const { categories, brands } = await getSiteInfo({ config, preview })
  const { pages } = await getAllPages({ config, preview })

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 14400,
  }
}

export default function Home({
  products,
  brands,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(products, brands, categories)
  const filteredCategories = categories.filter((category) => {
    const blackListedCollections = ['wholesale collection', 'vip']
    const isntBlackedlisted = !blackListedCollections.includes(
      category.name.toLowerCase()
    )
    const hasProducts =
      category?.products?.edges?.length && category.products.edges.length > 3
    console.log(category.products.edges)
    const hasImage = category?.image
      ? category.image
      : category?.products?.edges[0]?.node?.images.edges[0].node || null
    return isntBlackedlisted && hasImage && hasProducts
  })
  return (
    <PageLayout>
      <VStack alignItems="center" spacing={[24, 36, 48]}>
        <Grid
          textAlign="center"
          gridTemplateColumns="100%"
          gridTemplateRows="1fr"
          position="relative"
          alignItems="center"
          mx={[0, 30, 50]}
          w="100%"
        >
          <Container
            maxW="container.xl"
            px={8}
            gridRow="1"
            gridColumn="1"
            zIndex="2"
          >
            <VStack
              spacing={5}
              maxW="800px"
              mx="auto"
              py={['25px', null, 50, 100]}
            >
              <Heading size="2xl">For Dogs Who Dress Well Too</Heading>
              <Text fontSize="xl">
                To be tied around the neck, a bag handle or even a shoulder
                strap, the scarf 70 in vintage silk twill offers a boldly modern
                wearing style.
              </Text>
              <Button variant="primary" size="lg">
                Shop Studs
              </Button>
            </VStack>
          </Container>

          <AspectRatio
            ratio={[5 / 8, null, 16 / 9]}
            gridRow="1"
            gridColumn="1"
            w="100%"
            maxH="90vh"
            zIndex="1"
          >
            <Box bg="gray.300"></Box>
          </AspectRatio>
        </Grid>

        <Container maxW="1400px">
          <VStack spacing={16}>
            <VStack maxW="800px" textAlign="center">
              <Heading>Daring wear</Heading>
              <Text fontSize="xl">
                To be tied around the neck, a bag handle or even a shoulder
                strap, the scarf 70 in vintage silk twill offers a boldly modern
                wearing style.
              </Text>
              <Button>Shop Studs</Button>
            </VStack>

            <Grid
              templateColumns={['1fr 1fr', null, 'repeat(4, 1fr)']}
              gap={10}
              w="100%"
            >
              {filteredCategories.slice(0, 8).map((category) => {
                const image = category?.image
                  ? category.image
                  : category?.products?.edges[0]?.node?.images.edges[0].node ||
                    null
                return (
                  <LinkBox>
                    <VStack
                      key={category.entityId}
                      spacing={2}
                      align="left"
                      role="group"
                    >
                      <AspectRatio ratio={1} w="100%" overflow="hidden">
                        <Box
                          bg="gray.300"
                          transition="transform 1s ease-out"
                          _groupHover={{
                            transform: 'scale(1.05)',
                          }}
                        >
                          {image && (
                            <Image
                              src={
                                image.transformedSrc
                                  ? image.transformedSrc
                                  : image.originalSrc
                              }
                              alt={image.altText}
                              layout="fill"
                              objectFit="cover"
                            />
                          )}
                        </Box>
                      </AspectRatio>
                      <Heading size="sm">
                        <Link href={`collection${category.path}`} passHref>
                          <LinkOverlay as="a">{category.name}</LinkOverlay>
                        </Link>
                      </Heading>
                    </VStack>
                  </LinkBox>
                )
              })}
            </Grid>
          </VStack>
        </Container>

        <Container maxW="1600px" bg="gray.200" p={[8, 16, 16]} role="group">
          <VStack spacing={16}>
            <VStack maxW="500px" textAlign="center" spacing={4}>
              <Heading>Get Exclusive Products</Heading>
              <Text fontSize="xl">
                Become a Mutt Couture VIP to get instant access to exclusive
                products, sales, and a look behind-the-scenes.
              </Text>
              <Box pt={4}>
                <Link href="/vip" passHref>
                  <Button size="lg" variant="primary" as="a">
                    How to Become a VIP
                  </Button>
                </Link>
              </Box>
            </VStack>
            <AspectRatio ratio={8 / 5} bg="gray.300" w="90%" overflow="hidden">
              <Box
                transition="transform 1s ease-out"
                _groupHover={{
                  transform: 'scale(1.05)',
                }}
              >
                <Image
                  src="/images/holding.webp"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center left"
                  alt=""
                />
              </Box>
            </AspectRatio>
          </VStack>
        </Container>

        <Container maxW="1400px">
          <VStack spacing={16}>
            <VStack maxW="800px" textAlign="center">
              <Heading>Daring wear</Heading>
              <Text fontSize="xl">
                To be tied around the neck, a bag handle or even a shoulder
                strap, the scarf 70 in vintage silk twill offers a boldly modern
                wearing style.
              </Text>
              <Button>Shop Studs</Button>
            </VStack>
            <Grid
              templateColumns={['100%', null, null, 'repeat(2, 1fr)']}
              gap={[8, null, 24]}
            >
              <Box>
                <AspectRatio ratio={1}>
                  <Image
                    src="/images/matching.webp"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center left"
                    alt=""
                  />
                </AspectRatio>
              </Box>

              <Grid
                templateColumns={['repeat(2, 1fr)']}
                columnGap={[8, null, 24]}
                rowGap={5}
              >
                {products.slice(0, 4).map((product) => (
                  <LinkBox>
                    <VStack key={product.id} spacing={2} align="left">
                      <AspectRatio ratio={1} w="100%">
                        <Box bg="gray.300">
                          <Image
                            src={product.images[0].url}
                            alt={product.images[0].alt}
                            layout="fill"
                            objectFit="cover"
                          />
                        </Box>
                      </AspectRatio>
                      <Heading size="sm">
                        <Link href={`product${product.path}`} passHref>
                          <LinkOverlay as="a">{product.name}</LinkOverlay>
                        </Link>
                      </Heading>
                      <Text>${product.price.value}</Text>
                    </VStack>
                  </LinkBox>
                ))}
              </Grid>
            </Grid>
          </VStack>
        </Container>
      </VStack>
    </PageLayout>
  )
}

Home.Layout = Layout
