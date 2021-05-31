import { FC } from 'react'
import Link from 'next/link'
import cn from 'classnames'
import type { LineItem } from '@framework/types'
import useCart from '@framework/cart/use-cart'
import useCustomer from '@framework/customer/use-customer'
import { Avatar } from '@components/common'
import { Heart, Bag } from '@components/icons'
import { useUI } from '@components/ui/context'
import DropdownMenu from './DropdownMenu'
import { Box, Button, Badge, HStack } from '@chakra-ui/react'

interface Props {
  className?: string
}

const countItem = (count: number, item: LineItem) => count + item.quantity

const UserNav: FC<Props> = ({ className }) => {
  const { data } = useCart()
  const { data: customer } = useCustomer()
  const { toggleSidebar, closeSidebarIfPresent, openModal } = useUI()
  const itemsCount = data?.lineItems.reduce(countItem, 0) ?? 0

  console.log('customer', customer)
  return (
    <Box>
      <HStack>
        {customer && customer?.acceptsMarketing && (
          <Link href="/collections/vip" passHref>
            <Button as="a" variant="ghost" color="gray.900">
              VIP
            </Button>
          </Link>
        )}
        <Button variant="link" onClick={toggleSidebar} color="gray.900">
          <Bag />
          {itemsCount > 0 && (
            <Badge
              position="absolute"
              top="0"
              right="0"
              transform="translateY(-25%) translateX(-10%)"
              colorScheme="red"
              variant="solid"
            >
              {itemsCount}
            </Badge>
          )}
        </Button>

        {process.env.COMMERCE_WISHLIST_ENABLED && (
          <Link href="/wishlist" passHref>
            <Button
              variant="link"
              color="gray.900"
              as="a"
              onClick={closeSidebarIfPresent}
              aria-label="Wishlist"
            >
              <Heart />
            </Button>
          </Link>
        )}

        {customer ? (
          <DropdownMenu />
        ) : (
          <Button
            variant="link"
            color="gray.900"
            aria-label="Menu"
            onClick={() => openModal()}
          >
            <Avatar />
          </Button>
        )}
      </HStack>
    </Box>
  )
}

export default UserNav
