import type { GetStaticPropsContext } from 'next'
import { Bag } from '@components/icons'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import { getConfig } from '@framework/api'
import getAllPages from '@framework/common/get-all-pages'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })
  const { pages } = await getAllPages({ config, preview })
  return {
    props: { pages },
  }
}

export default function VIP() {
  return (
    <Container>
      <Text variant="pageHeading">VIP</Text>
    </Container>
  )
}

VIP.Layout = Layout
