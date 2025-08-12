import SimpleAnimatedSection from '@/components/ui/AnimatedSection/SimpleAnimatedSection'
import { triggerScrollToCatalog } from '@/context/slices/scrollSlice'
import { useAppDispatch } from '@/scripts/hooks/hooks'
import { About } from '@/sections/ForMainPage/About/About'
import { Catalog } from '@/sections/ForMainPage/Catalog/Catalog'
import { Info } from '@/sections/ForMainPage/Info/Info'
import { Manufacturers } from '@/sections/ForMainPage/Manufacturers/Manufacturers'
import { RequestForm } from '@/sections/ForMainPage/RequestForm/RequestForm'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const location = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const state = location.state as {
      shouldScrollToCatalog?: boolean
    } | null

    if (state?.shouldScrollToCatalog) {
      const handleScroll = () => {
        requestAnimationFrame(() => {
          dispatch(triggerScrollToCatalog())
        })
      }

      handleScroll()

      window.history.replaceState({}, document.title)
    }
  }, [location.key, dispatch])

  return (
    <div>
      <SimpleAnimatedSection direction='fade' delay={0}>
        <Info />
      </SimpleAnimatedSection>

      <SimpleAnimatedSection direction='fade' delay={0.1}>
        <Catalog />
      </SimpleAnimatedSection>

      <SimpleAnimatedSection direction='fade' delay={0.1}>
        <About />
      </SimpleAnimatedSection>

      <SimpleAnimatedSection direction='fade' delay={0.1}>
        <RequestForm />
      </SimpleAnimatedSection>

      <SimpleAnimatedSection direction='fade' delay={0.1}>
        <Manufacturers />
      </SimpleAnimatedSection>
    </div>
  )
}

export default Home
