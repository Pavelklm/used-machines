import { motion, useInView } from 'framer-motion'
import { ReactNode, useRef, useEffect, useState } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  duration?: number
  className?: string
  threshold?: number
  once?: boolean
}

const AnimatedSection = ({
  children,
  direction = 'up',
  duration = 0.6,
  className = '',
  threshold = 0.1,
  once = true
}: AnimatedSectionProps) => {
  const ref = useRef(null)
  const [forceVisible, setForceVisible] = useState(false)
  
  // Отслеживаем появление элемента в области видимости
  const isInView = useInView(ref, { 
    once,
    amount: threshold,
    margin: "0px 0px -100px 0px" // Начинаем анимацию чуть раньше
  })

  // Fallback: если анимация не сработала в течение 3 секунд, показываем контент принудительно
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isInView) {
        setForceVisible(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [isInView])

  // Определяем начальные и конечные состояния для разных направлений
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
      scale: direction === 'fade' ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    }
  }

  // Если контент нужно показать принудительно (fallback)
  if (forceVisible) {
    return (
      <div ref={ref} className={`animate-section ${className}`}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={`animate-section ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}

export default AnimatedSection