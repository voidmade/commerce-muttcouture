import cn from 'classnames'
import Link from 'next/link'
import { FC, useRef, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'
import s from './DropdownMenu.module.css'
import { Avatar } from '@components/common'
import { Moon, Sun } from '@components/icons'
import { useUI } from '@components/ui/context'
import ClickOutside from '@lib/click-outside'
import useLogout from '@framework/auth/use-logout'

import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import {
  Menu,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuButton,
  useColorMode,
  Button,
  MenuDivider,
} from '@chakra-ui/react'

interface DropdownMenuProps {
  open?: boolean
}

const LINKS = [
  {
    name: 'My Orders',
    href: '/orders',
  },
  {
    name: 'My Profile',
    href: '/profile',
  },
  {
    name: 'My Cart',
    href: '/cart',
  },
]

const DropdownMenu: FC<DropdownMenuProps> = ({ open = false }) => {
  const logout = useLogout()
  const { pathname } = useRouter()

  const { closeSidebarIfPresent } = useUI()
  const ref = useRef() as React.MutableRefObject<HTMLUListElement>
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Menu placement="bottom-end">
      <MenuButton aria-label="Menu">
        <Avatar />
      </MenuButton>
      <MenuList>
        <MenuGroup>
          {LINKS.map(({ name, href }) => (
            <MenuItem key={href}>
              <Link href={href} passHref>
                <a
                  onClick={() => {
                    closeSidebarIfPresent()
                  }}
                >
                  {name}
                </a>
              </Link>
            </MenuItem>
          ))}
          <MenuDivider />
          <MenuItem onClick={() => logout()}>Logout</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

export default DropdownMenu
