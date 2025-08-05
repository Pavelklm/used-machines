'use client'

import { useAppSelector } from '@/scripts/hooks/hooks'
import { AnimatePresence, motion } from 'framer-motion'

export const Overlay = () => {
  const overlay = useAppSelector((state) => state.overlay)

  return (
    <AnimatePresence>
      {overlay.isOpen && (
        <motion.div
          className='overlay overlay-active'
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </AnimatePresence>
  )
}
