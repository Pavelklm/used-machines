import { Variants } from 'framer-motion'

export const listVariants: Variants = {
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },
  hidden: {
    opacity: 0,
    height: 0,
    transition: { when: 'afterChildren' },
  },
}

export const itemVariants: Variants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
  hidden: { opacity: 0, x: -20 },
}

export const iconVariants: Variants = {
  open: {
    rotate: 0,
    transition: { type: 'spring', stiffness: 200, damping: 40 },
  },
  closed: {
    rotate: 0,
    transition: { type: 'spring', stiffness: 200, damping: 40 },
  },
}

export const headerVariants: Variants = {
  rest: { y: 0 },
  hover: { y: -2, transition: { type: 'spring', stiffness: 300, damping: 15 } },
}