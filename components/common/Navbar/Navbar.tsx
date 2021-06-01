import { FC } from 'react'
import Link from 'next/link'
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Searchbar, UserNav } from '@components/common'
import NavbarRoot from './NavbarRoot'
import Image from 'next/image'
import { useCustomer } from '@framework/customer'

const Navbar: FC = () => {
  return (
    <NavbarRoot>
      <Box bg="white">
        <Container maxW="container.xl">
          <Grid templateColumns="1fr 175px 1fr" py={6}>
            <ButtonGroup
              variant="link"
              spacing={6}
              textDecoration="none"
              fontWeight="400"
              fontSize="sm"
            >
              {[
                {
                  label: 'Products',
                  href: '/collections/leather-collars',
                  children: [
                    {
                      label: 'Leather',
                      href: '/collections/leather-collars',
                    },
                    {
                      label: 'Studded',
                      href: '/collections/studs',
                    },
                    {
                      label: 'Nylon',
                      href: '/collections/nylon',
                    },
                  ],
                },
                {
                  label: 'Leashes',
                  href: '/collections/leashes',
                },
                {
                  label: 'Dog Tags',
                  href: '/collections/accessories',
                },
              ].map((item) => {
                if (!item?.children) {
                  return (
                    <Link href={item.href} passHref key={item.label}>
                      <Button
                        as="a"
                        textTransform="uppercase"
                        fontWeight="400"
                        letterSpacing=".075em"
                        _hover={{ color: 'gray.900', textDecoration: 'none' }}
                      >
                        {item.label}
                      </Button>
                    </Link>
                  )
                } else {
                  return (
                    <Menu offset={[0, 22]} key={item.label}>
                      <MenuButton
                        as={Button}
                        fontWeight="400"
                        textTransform="uppercase"
                        letterSpacing=".075em"
                        _hover={{ color: 'gray.900', textDecoration: 'none' }}
                        rightIcon={<ChevronDownIcon />}
                      >
                        {item.label}
                      </MenuButton>
                      <MenuList borderRadius="0">
                        <Container maxW="xl" paddingX="0">
                          {item.children.map((child) => (
                            <MenuItem>
                              <Link href={child.href}>
                                <Button
                                  as="a"
                                  textTransform="uppercase"
                                  fontWeight="400"
                                  letterSpacing=".075em"
                                  _hover={{
                                    color: 'gray.900',
                                    textDecoration: 'none',
                                  }}
                                >
                                  {child.label}
                                </Button>
                              </Link>
                            </MenuItem>
                          ))}
                        </Container>
                      </MenuList>
                    </Menu>
                  )
                }
              })}
            </ButtonGroup>

            <Link href="/" passHref>
              <Box as="a">
                <Image src="/images/mc-logotype.svg" width={288} height={47} />
              </Box>
            </Link>

            <HStack justifySelf="end" alignContent="end" justifyContent="end">
              <UserNav />
            </HStack>
          </Grid>
          {/* <Searchbar /> */}
        </Container>
      </Box>
    </NavbarRoot>
  )
}

export default Navbar
