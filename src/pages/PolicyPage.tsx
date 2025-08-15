import { Breadcrumbs } from '@/components/product/Breadcrumbs/Breadcrumbs'
import SimpleAnimatedSection from '@/components/ui/AnimatedSection/SimpleAnimatedSection'
import { Typography } from '@mui/material'
import { motion } from 'framer-motion'

const PolicyPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{
        padding: '0',
        maxWidth: '1200px',
        margin: '0 auto',
        marginTop: '158px',
      }}
    >
      <SimpleAnimatedSection direction='fade' delay={0.1}>
        <Breadcrumbs productName='Політика конфіденційності' />
        <Typography variant='h1'>Політика конфіденційності</Typography>
      </SimpleAnimatedSection>
    </motion.div>
  )
}

export default PolicyPage
