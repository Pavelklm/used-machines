import ZoomInIcon from '@mui/icons-material/ZoomIn'
import { Box, Card } from '@mui/material'
import { motion } from 'framer-motion'
import DirectusOptimizedImage from '@/scripts/utils/OptimizedImage'
import { MAIN_IMAGE_STYLES } from './constants'

interface MainImageDisplayProps {
  image: string
  directusUrl: string
  productName: string
  brandName: string
  onZoomClick: () => void
}

export const MainImageDisplay = ({
  image,
  directusUrl,
  productName,
  brandName,
  onZoomClick,
}: MainImageDisplayProps) => {
  return (
    <Box
      sx={{
        width: '600px',
        height: '500px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Card sx={MAIN_IMAGE_STYLES} onClick={onZoomClick}>
          <DirectusOptimizedImage
            src={`${directusUrl}assets/${image}`}
            alt={`${productName} від ${brandName} - професійне м'ясопереробне обладнання`}
            width={600}
            height={500}
            priority={true}
            fit="contain"
            className="main-image"
          />

          <Box
            className='zoom-icon'
            sx={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              backgroundColor: 'rgba(0,0,0,0.6)',
              borderRadius: '50%',
              padding: '8px',
              color: 'white',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ZoomInIcon sx={{ fontSize: '20px' }} />
          </Box>
        </Card>
      </motion.div>
    </Box>
  )
}
