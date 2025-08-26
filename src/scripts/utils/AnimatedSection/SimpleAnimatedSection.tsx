import { motion, useInView } from 'framer-motion'
import { ReactNode, useRef, useEffect, useState } from 'react'

interface SimpleAnimatedSectionProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  delay?: number
  className?: string
  viewportAmount?: number // Добавляем возможность кастомизации viewport
}

const SimpleAnimatedSection = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  viewportAmount, // Получаем кастомное значение
}: SimpleAnimatedSectionProps) => {
  const ref = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  
  // Используем более контролируемый useInView вместо whileInView
  const isInView = useInView(ref, { 
    once: true, 
    amount: viewportAmount ?? (isMobile ? 0.1 : 0.1), // Используем кастомное значение или более мягкие дефолты
    // margin: "0px 0px -100px 0px" // Запуск раньше
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? (isMobile ? 15 : 30) : direction === 'down' ? (isMobile ? -15 : -30) : 0,
      x: direction === 'left' ? (isMobile ? 15 : 30) : direction === 'right' ? (isMobile ? -15 : -30) : 0,
      scale: direction === 'fade' ? 0.99 : 1,
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
      ref={ref}
      className={`animate-section ${className}`}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'} // Используем animate вместо whileInView
      variants={variants}
      transition={{
        duration: isMobile ? 0.4 : 0.5,
        delay,
        ease: "easeOut",
        type: "tween",
      }}
    >
      {children}
    </motion.div>
  )
}

export default SimpleAnimatedSection
