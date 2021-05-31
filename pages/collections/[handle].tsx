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
import CollectionView from '@components/collection/CollectionView'
import VipFence from '@components/common/VipFence'
import PageLayout from '@components/common/PageLayout'

export async function getStaticProps({
  params,
  locale,
  preview,
}: GetStaticPropsContext<{ handle: string }>) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  const collectionHandleData = await getProductsByCollectionSlug({
    variables: { slug: params!.handle, first: 50, imageCount: 2 },
    config,
    preview,
  })

  if (!collectionHandleData) {
    throw new Error(`Product with handle '${params!.handle}' not found`)
  }

  return {
    props: {
      collectionHandleData,
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
          categories.forEach((collection: { path: any }) => {
            arr.push(`/${locale}/collections${collection.path}`)
          })
          return arr
        }, [])
      : categories.map(
          (collection: { path: any }) => `/collections${collection.path}`
        ),
    fallback: 'blocking',
  }
}

export default function Handle({
  collectionHandleData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const collection = collectionHandleData?.collection
  console.log('router', router)
  return (
    <PageLayout>
      {router.asPath === '/collections/vip' ? (
        <VipFence>
          <CollectionView collection={collection} />
        </VipFence>
      ) : (
        <CollectionView collection={collection} />
      )}
    </PageLayout>
  )
}

Handle.Layout = Layout
