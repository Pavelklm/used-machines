import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SimpleAnimatedSectionProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  delay?: number
  className?: string
}

const SimpleAnimatedSection = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: SimpleAnimatedSectionProps) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
      scale: direction === 'fade' ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
  }

  return (
    <motion.div
      className={`animate-section ${className}`}
      initial='hidden'
      whileInView='visible'
      viewport={{
        once: true,
        amount: 0.05,
      }}
      variants={variants}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}

export default SimpleAnimatedSection
