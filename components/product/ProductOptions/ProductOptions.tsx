import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Heading,
  Button,
  CloseButton,
  AspectRatio,
} from '@chakra-ui/react'
import Image from 'next/image'
import { Bag } from '@components/icons'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CloseIcon } from '@chakra-ui/icons'

const MotionBox = motion(Box)
const MotionVStack = motion(VStack)

export default function ProductOptions({
  optionsOpen,
  setOptionsOpen,
  widths,
  setChoices,
  choices,
  loading,
  lengths,
  addToCart,
  currentPriceFormatted,
}) {
  const container = {
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
      },
    },
    initial: {
      opacity: 0,
      height: 0,
    },
    animate: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
  }

  const optionVariant = {
    exit: {
      y: 50,
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
    initial: {
      y: 50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        ease: 'easeOut',
      },
    },
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
    <MotionBox w="100%" bg="gray.50" maxW={[null, null, null, '400px']}>
      <AnimatePresence exitBeforeEnter={true}>
        {optionsOpen && (
          <MotionVStack
            spacing="20px"
            padding="20px"
            w="100%"
            variants={container}
            exit="exit"
            initial="initial"
            animate="animate"
          >
            <HStack justify="space-between" w="100%">
              <Text textAlign="left" w="100%">
                Customize Your Collar
              </Text>
              <Button
                fontWeight="300"
                variant="link"
                onClick={() => setOptionsOpen(false)}
                rightIcon={<CloseIcon w={3} h={3} ml={1} mr={2} />}
              >
                Cancel
              </Button>
            </HStack>

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
                  <AnimatePresence exitBeforeEnter={true}>
                    <MotionVStack
                      variants={optionVariant}
                      w="100%"
                      align="start"
                      spacing="20px"
                      cursor="pointer"
                      overflow="hidden"
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
                      <HStack w="100%" justifyContent="space-between">
                        <Heading
                          margin="15px"
                          size="md"
                          flexShrink={0}
                          mr="2rem"
                        >
                          {v?.label} Wide
                        </Heading>
                        {collarImage() && (
                          <Box
                            marginY="15px"
                            pt="15px"
                            flexShrink={0}
                            w="100%"
                            maxW="70%"
                          >
                            <AspectRatio ratio={10 / 1} w="100%" maxH="70px">
                              <Image
                                src={collarImage()}
                                layout="fill"
                                alt=""
                                objectFit="cover"
                                objectPosition="left center"
                              />
                            </AspectRatio>
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
                                  length.label.toLowerCase() === activeLength
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
                    </MotionVStack>
                  </AnimatePresence>
                )
              })}
            {!widths?.values &&
              product.options?.map((opt) => (
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
          </MotionVStack>
        )}
      </AnimatePresence>

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
          layoutId="product-cta"
        >
          <Flex justifyContent="space-between" flexWrap="nowrap" w="100%">
            <Bag />
            <Flex
              alignContent="baseline"
              flexGrow={1}
              textAlign="left"
              ml="1.5rem"
            >
              {' '}
              {!loading ? 'Add to Bag' : 'Stunning Choice!'}
            </Flex>
            <Flex alignContent="baseline">{currentPriceFormatted?.price}</Flex>
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
          py="2rem"
          layoutId="product-cta"
        >
          <Flex justifyContent="space-between" flexWrap="nowrap" w="100%">
            <Bag />
            <Flex
              alignContent="baseline"
              flexGrow={1}
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
    </MotionBox>
  )
}
