'use client'

import { useAppSelector } from '@/scripts/hooks/hooks'
import { AnimatePresence, motion } from 'framer-motion'

const OVERLAY_ANIMATION = {
  duration: 0.3,
  ease: [0.4, 0, 0.2, 1] as const,
  opacity: {
    from: 0,
    to: 1,
  },
}

export const Overlay = () => {
  const overlay = useAppSelector((state) => state.overlay)
  const overlaySource = useAppSelector((state) => state.overlay.source)

  return (
    <AnimatePresence>
      {overlay.isOpen && (
        <motion.div
          className={`overlay overlay-active ${overlaySource === 'burger' ? 'overlay-burger' : ''}`}
          initial={{ opacity: OVERLAY_ANIMATION.opacity.from }}
          animate={{ opacity: OVERLAY_ANIMATION.opacity.to }}
          exit={{ opacity: OVERLAY_ANIMATION.opacity.from }}
          transition={{
            duration: OVERLAY_ANIMATION.duration,
            ease: OVERLAY_ANIMATION.ease,
          }}
        />
      )}
    </AnimatePresence>
  )
}
