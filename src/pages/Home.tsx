import { triggerScrollToCatalog } from '@/context/slices/scrollSlice'
import { useAppDispatch } from '@/scripts/hooks/hooks'
import { About } from '@/sections/ForMainPage/About/About'
import { CatalogWrapper } from '@/sections/ForMainPage/Catalog/CatalogWrapper'
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
      filteredBy?: string
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
      <Info />
      <CatalogWrapper />
      <About />
      <RequestForm />
      <Manufacturers />
    </div>
  )
}

export default Home
