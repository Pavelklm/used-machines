import { setFabOverlay } from '@/context/slices/overlaySlice'
import { RootState } from '@/context/store'
import { useScreenSize } from '@/scripts/hooks/useScreenSize'
import { Email as EmailIcon, Phone as PhoneIcon } from '@mui/icons-material'
import { Box, Fab, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'

// Z-INDEX КОНСТАНТЫ
const Z_INDEX = {
  FAB_NORMAL: 47,
  FAB_HIDDEN: 0,              // Когда открыт burger
  CONTACT_BUTTONS: 47,
  OVERLAY_BACKDROP: 46,
} as const

export const ContactFab = () => {
  const dispatch = useDispatch()
  const { isPhone } = useScreenSize()
  const isOverlayOpen = useSelector(
    (state: RootState) => state.overlay.isOpen && state.overlay.source === 'fab'
  )
  
  // Отслеживаем состояние бургера
  const isBurgerOpen = useSelector(
    (state: RootState) => state.overlay.isOpen && state.overlay.source === 'burger'
  )

  // Показываем компонент только на устройствах до 480px
  if (!isPhone) {
    return null
  }

  const handleFabClick = () => {
    dispatch(setFabOverlay(!isOverlayOpen))
  }

  const handleOverlayClick = () => {
    dispatch(setFabOverlay(false))
  }

  const handleEmailClick = () => {
    // Заглушка для email
    console.log('Email clicked')
    dispatch(setFabOverlay(false))
  }

  const handlePhoneClick = () => {
    // Заглушка для телефон
    console.log('Phone clicked')
    dispatch(setFabOverlay(false))
  }

  return (
    <>
      {/* FAB кнопка */}
      <Fab
        color='primary'
        onClick={handleFabClick}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: isBurgerOpen ? Z_INDEX.FAB_HIDDEN : Z_INDEX.FAB_NORMAL,
          width: 56,
          height: 56,
          backgroundColor: 'var(--blue-bright-color)',
          boxShadow: isOverlayOpen
            ? '0 4px 16px rgba(59, 130, 246, 0.3)'
            : '0 4px 16px rgba(59, 130, 246, 0.3)',
          animation: isOverlayOpen
            ? 'none'
            : 'fabPulse 3s ease-in-out infinite, fabFloat 6s ease-in-out infinite',
          '@keyframes fabPulse': {
            '0%, 100%': {
              boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
            },
            '50%': {
              boxShadow:
                '0 8px 32px rgba(59, 130, 246, 0.6), 0 0 20px rgba(59, 130, 246, 0.4)',
            },
          },
          '@keyframes fabFloat': {
            '0%, 100%': {
              transform: 'translateY(0px)',
            },
            '50%': {
              transform: 'translateY(-4px)',
            },
          },
          '&:hover': {
            backgroundColor: 'var(--blue-bright1-color)',
            animation: 'none',
            transform: 'scale(1.1)',
            boxShadow: '0 8px 32px rgba(9, 80, 196, 0.5)',
          },
          '&:before': {
            content: '""',
            position: 'absolute',
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            borderRadius: '50%',
            background:
              'linear-gradient(45deg, var(--blue-bright-color), var(--main-color))',
            zIndex: -1,
            opacity: 0,
            animation: isOverlayOpen
              ? 'none'
              : 'fabGlow 4s ease-in-out infinite',
          },
          '@keyframes fabGlow': {
            '0%, 100%': {
              opacity: 0,
              transform: 'scale(1)',
            },
            '50%': {
              opacity: 0.3,
              transform: 'scale(1.2)',
            },
          },
        }}
      >
        <PhoneIcon
          sx={{
            fontSize: 24,
            animation: isOverlayOpen
              ? 'none'
              : 'iconBounce 2s ease-in-out infinite',
            '@keyframes iconBounce': {
              '0%, 100%': {
                transform: 'rotate(0deg)',
              },
              '25%': {
                transform: 'rotate(-5deg)',
              },
              '75%': {
                transform: 'rotate(5deg)',
              },
            },
          }}
        />
      </Fab>

      {/* Контактные опции - выезжают от FAB */}
      <AnimatePresence>
        {isOverlayOpen && (
          <>
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleOverlayClick}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                zIndex: Z_INDEX.OVERLAY_BACKDROP,
              }}
            />

            {/* Email кнопка */}
            <motion.div
              initial={{
                scale: 0,
                x: 0,
                y: 0,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                x: -80,
                y: 0,
                opacity: 1,
              }}
              exit={{
                scale: 0,
                x: 0,
                y: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                delay: 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                position: 'fixed',
                bottom: 28,
                right: 28,
                zIndex: Z_INDEX.CONTACT_BUTTONS,
              }}
            >
              <Box
                onClick={handleEmailClick}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: '24px',
                  padding: '8px 16px 8px 8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  cursor: 'pointer',
                  minWidth: 'max-content',
                  '&:active': {
                    transform: 'scale(0.95)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'var(--blue-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 1,
                  }}
                >
                  <EmailIcon sx={{ color: 'white', fontSize: 20 }} />
                </Box>
                <Typography
                  variant='body2'
                  sx={{
                    color: 'var(--black-color)',
                    fontWeight: 500,
                    fontSize: '14px',
                  }}
                >
                  Написати на пошту
                </Typography>
              </Box>
            </motion.div>

            {/* Phone кнопка */}
            <motion.div
              initial={{
                scale: 0,
                x: 0,
                y: 0,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                x: -56,
                y: -72,
                opacity: 1,
              }}
              exit={{
                scale: 0,
                x: 0,
                y: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.3,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                position: 'fixed',
                bottom: 28,
                right: 28,
                zIndex: Z_INDEX.CONTACT_BUTTONS,
              }}
            >
              <Box
                onClick={handlePhoneClick}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: '24px',
                  padding: '8px 16px 8px 8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  cursor: 'pointer',
                  minWidth: 'max-content',
                  '&:active': {
                    transform: 'scale(0.95)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    backgroundColor: 'var(--blue-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 1,
                  }}
                >
                  <PhoneIcon sx={{ color: 'white', fontSize: 20 }} />
                </Box>
                <Typography
                  variant='body2'
                  sx={{
                    color: 'var(--black-color)',
                    fontWeight: 500,
                    fontSize: '14px',
                  }}
                >
                  Зателефонувати
                </Typography>
              </Box>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
