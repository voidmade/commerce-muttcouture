import { FC } from 'react'
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

import { normalizeProduct } from '@framework/utils/normalize'
import { Collection } from '@framework/schema'

const CollectionView = ({ collection }) => {
  return (
    <VStack spacing={[16, 24, 36]}>
      <Container maxW="1400px">
        <VStack spacing={16} py="100">
          <VStack maxW="800px" textAlign="center">
            <Heading>{collection.title}</Heading>
          </VStack>

          <Grid
            templateColumns={['1fr 1fr', null, '1fr 1.1fr 1fr']}
            alignItems="center"
            gap={16}
            w="100%"
          >
            {collection?.products?.edges?.length &&
              collection.products.edges.length > 0 &&
              collection.products.edges.map(({ node }, index: number) => {
                const product = normalizeProduct(node) || {}
                const image = product.images[0]
                const isBig = index > 0 && index + (1 % 4) == 0
                return (
                  <LinkBox
                    gridColumn={isBig ? 'span 3' : ''}
                    w="100%"
                    maxW="800px"
                    mx={isBig ? 'auto' : ''}
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
                          <Link href={`/product${product.path}`} passHref>
                            <LinkOverlay as="a">{product.name}</LinkOverlay>
                          </Link>
                        </Heading>
                        <Text>${product?.price?.value}</Text>
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
  )
}

export default CollectionView
