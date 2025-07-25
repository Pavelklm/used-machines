import { resetScrollToCatalog } from '@/context/slices/scrollSlice'
import { RootState } from '@/context/store'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Catalog } from './Catalog'

export function CatalogWrapper() {
  const catalogRef = useRef<HTMLDivElement>(null)
  const scrollToCatalog = useSelector(
    (state: RootState) => state.scroll.scrollToCatalog
  )

  const dispatch = useDispatch()

  useEffect(() => {
    if (scrollToCatalog && catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      dispatch(resetScrollToCatalog())
    }
  }, [scrollToCatalog, dispatch])

  return <Catalog catalogRef={catalogRef} />
}
