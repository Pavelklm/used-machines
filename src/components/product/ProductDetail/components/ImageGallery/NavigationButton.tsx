import { IconButton } from '@mui/material'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface NavigationButtonProps {
  onClick: () => void
  children: ReactNode
  size?: number
  hoverTranslate?: number
  rotation?: number
  disabled?: boolean
}

export const NavigationButton = ({
  onClick,
  children,
  size = 40,
  hoverTranslate = 2,
  rotation = 0,
  disabled = false,
}: NavigationButtonProps) => {
  const hoverAnimation = { translateY: `-${hoverTranslate}px` }

  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: `${size}px`,
        height: `${size}px`,
        border: '1px solid var(--blue-light-color)',
        borderRadius: '8px',
        backgroundColor: '#fff',
        padding: '8px',
        transform: rotation ? `rotate(${rotation}deg)` : 'none',
        flexShrink: 0,
        '&:hover': {
          backgroundColor: 'var(--blue-bright-color)',
          '& .MuiSvgIcon-root': {
            color: '#fff',
          },
        },
        '&:disabled': { opacity: 0.3 },
      }}
      component={motion.button}
      whileHover={hoverAnimation}
    >
      {children}
    </IconButton>
  )
}