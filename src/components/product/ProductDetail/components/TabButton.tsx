import { Box } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'

interface TabButtonProps {
  isActive: boolean
  onClick: () => void
  children: React.ReactNode
}

export const TabButton = ({ isActive, onClick, children }: TabButtonProps) => (
  <Box
    onClick={onClick}
    sx={{
      padding: '20px 40px 35px 40px',
      width: '100%',
      height: '68px',
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '15px 15px 0 0',
      cursor: 'pointer',
      background: isActive ? '#ffffff' : 'transparent',
      transform: 'translateZ(0)',
      backfaceVisibility: 'hidden',
      transition: 'background-color 0.15s ease-out',
      color: isActive ? 'var(--main-color)' : '#ffffff',
      fontSize: '18px',
      fontWeight: '400',
      lineHeight: '21px',
      border: 'none',
      alignItems: 'flex-start',
      zIndex: isActive ? 2 : 1,
      '&:hover': {
        background: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.1)',
      },
    }}
    component={motion.div}
    whileTap={{ scale: 0.98 }}
  >
    {children}
  </Box>
)
