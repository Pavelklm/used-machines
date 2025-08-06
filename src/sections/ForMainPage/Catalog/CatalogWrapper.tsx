import { loadProducts } from '@/api/loadProducts'
import { setActiveScroll } from '@/context/slices/filteredItemsSlice'
import { resetScrollToCatalog } from '@/context/slices/scrollSlice'
import { RootState } from '@/context/store'
import { useScrollEndDetection } from '@/scripts/hooks/useScrollEndDetection'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Catalog } from './Catalog'

export function CatalogWrapper() {
  const catalogRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const { products, loading } = useSelector(
    (state: RootState) => state.products
  )
  const scrollToCatalog = useSelector(
    (state: RootState) => state.scroll.scrollToCatalog
  )

  const { startTracking, stopTracking } = useScrollEndDetection(() => {
    dispatch(setActiveScroll(true))
  }, {
    threshold: 0.5,
    stableFrames: 8,
  })

  useEffect(() => {
    if (products.length === 0 && !loading) {
      dispatch(loadProducts() as any)
    }
  }, [])

  useEffect(() => {
    if (scrollToCatalog && catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      startTracking()
      dispatch(resetScrollToCatalog())
    }
  }, [scrollToCatalog, dispatch])

  useEffect(() => {
    return () => {
      stopTracking()
    }
  }, [])

  return <Catalog catalogRef={catalogRef} />
}
