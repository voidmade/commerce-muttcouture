import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import { Layout } from '@components/common'

import { getConfig } from '@framework/api'
import getAllPages from '@framework/common/get-all-pages'
import getAllCollections from '@framework/product/get-all-collections'
import getProductsByCollectionSlug from '@framework/product/get-products-by-collection-slug'

import Link from 'next/link'
import Image from 'next/image'
import {
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Grid,
  LinkBox,
  LinkOverlay,
  Box,
  AspectRatio,
  HStack,
} from '@chakra-ui/react'
import PageLayout from '@components/common/PageLayout'
import { normalizeProduct } from '@framework/utils/normalize'

export async function getStaticProps({
  params,
  locale,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  const collectionSlugData = await getProductsByCollectionSlug({
    variables: { slug: params!.slug, first: 50, imageCount: 2 },
    config,
    preview,
  })

  if (!collectionSlugData) {
    throw new Error(`Product with slug '${params!.slug}' not found`)
  }

  return {
    props: {
      collectionSlugData,
    },
    revalidate: 200,
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const { categories } = await getAllCollections()

  return {
    paths: locales
      ? locales.reduce<string[]>((arr, locale) => {
          // Add a product path for every locale
          categories.forEach((collection) => {
            arr.push(`/${locale}/collection${collection.path}`)
          })
          return arr
        }, [])
      : categories.map((collection) => `/collection${collection.path}`),
    fallback: 'blocking',
  }
}

export default function Slug({
  collectionSlugData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const collection = collectionSlugData?.collection

  console.log('collectionSlugData', collection)
  return (
    <PageLayout>
      <VStack spacing={[16, 24, 36]}>
        <Container maxW="1400px">
          <VStack spacing={16} py="100">
            <VStack maxW="800px" textAlign="center">
              <Heading>{collection.title}</Heading>
            </VStack>

            <Grid
              templateColumns={['1fr 1fr', null, 'repeat(3, 1fr)']}
              gap={16}
              w="100%"
            >
              {collection?.products?.edges?.length &&
                collection.products.edges.length > 0 &&
                collection.products.edges.map(({ node }, index) => {
                  const product = normalizeProduct(node)
                  const image = product.images[0]
                  const isBig = index >= 3 && index % 3 == 0
                  return (
                    <LinkBox
                      gridColumn={isBig ? 'span 3' : null}
                      w="100%"
                      maxW="800px"
                      mx={isBig ? 'auto' : null}
                      my={isBig ? [16, 24, 36] : 0}
                    >
                      <VStack
                        key={product.entityId}
                        spacing={5}
                        align="left"
                        role="group"
                      >
                        <AspectRatio
                          ratio={isBig ? 4 / 3 : 3 / 4}
                          w="100%"
                          overflow="hidden"
                        >
                          <Box
                            bg="gray.300"
                            transition="transform 1s ease-out"
                            _groupHover={{
                              transform: 'scale(1.05)',
                            }}
                          >
                            {image && (
                              <Image
                                src={image.url}
                                alt={image.alt}
                                layout="fill"
                                objectFit="cover"
                              />
                            )}
                          </Box>
                        </AspectRatio>
                        <HStack align="baseline">
                          <Heading size="md" flexGrow={1}>
                            <Link href={`collection${product.path}`} passHref>
                              <LinkOverlay as="a">{product.name}</LinkOverlay>
                            </Link>
                          </Heading>
                          <Text>{product?.price?.value}</Text>
                        </HStack>
                      </VStack>
                    </LinkBox>
                  )
                })}
            </Grid>

            <VStack maxW="800px" textAlign="center" pt="100">
              <Text fontSize="xl">{collection.description}</Text>
            </VStack>
          </VStack>
        </Container>
      </VStack>
    </PageLayout>
  )
}

Slug.Layout = Layout
