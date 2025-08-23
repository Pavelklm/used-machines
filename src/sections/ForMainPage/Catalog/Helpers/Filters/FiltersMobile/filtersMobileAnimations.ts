import { Variants } from 'framer-motion'

export const listVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { when: 'afterChildren', duration: 0.1 },
  },
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.1 } },
  exit: { opacity: 0, x: -10, transition: { duration: 0.1 } },
}

export const popupVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

export const popupTransition = { duration: 0.25 }

export const arrowRotateTransition = { type: 'spring' as const, stiffness: 300 }

export const categoryArrowTransition = { 
  type: 'spring' as const, 
  stiffness: 100 
}
