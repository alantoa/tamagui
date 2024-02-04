import { YStack, styled } from 'tamagui'

const variants = {
  hide: {
    true: {
      pointerEvents: 'none',
      opacity: 0,
    },
  },
} as const

export const Container = styled(YStack, {
  mx: 'auto',
  px: '$4',
  width: '100%',

  $gtSm: {
    maxWidth: 760,
    pr: '$2',
  },

  $gtMd: {
    maxWidth: 760,
    pr: '$2',
  },

  $gtLg: {
    maxWidth: 850,
    pr: '$10',
  },

  variants,
})

export const ContainerLarge = styled(YStack, {
  mx: 'auto',
  px: '$4',
  width: '100%',

  $gtSm: {
    maxWidth: 980,
  },

  $gtMd: {
    maxWidth: 1140,
  },

  variants,
})

export const ContainerXL = styled(YStack, {
  mx: 'auto',
  width: '100%',

  $gtSm: {
    px: '$4',
    maxWidth: 980,
  },

  $gtMd: {
    maxWidth: 1240,
  },

  $gtLg: {
    maxWidth: 1440,
  },

  variants,
})
