import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  setActiveEquipment,
  setCategory,
} from '@/context/slices/filteredItemsSlice'
import { setCatalogOverlay } from '@/context/slices/overlaySlice'
import { triggerScrollToCatalog } from '@/context/slices/scrollSlice'
import { useAppDispatch } from '@/scripts/hooks/hooks'
import { useProducts } from '@/scripts/hooks/useProducts'

export function useCatalogPopup() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { filterOptionsByGroup, getCategoryFromEquipment } = useProducts()

  type Keys = keyof typeof filterOptionsByGroup

  const [menuOpen, setMenuOpen] = useState(false)
  const [activeItem, setActiveItem] = useState<Keys | null>(null)

  const handleClickAway = () => {
    setMenuOpen(false)
    setActiveItem(null)
    dispatch(setCatalogOverlay(false))
  }

  const handleMainClick = () => {
    const newMenuOpen = !menuOpen
    setMenuOpen(newMenuOpen)

    if (!newMenuOpen) {
      setActiveItem(null)
    }

    dispatch(setCatalogOverlay(newMenuOpen))
  }

  const handleItemClick = (key: Keys) => {
    setActiveItem((prev) => (prev === key ? null : key))
  }

  const handleClick = (name: string) => {
    const category = getCategoryFromEquipment(name)
    dispatch(setCategory(category || ''))
    dispatch(setActiveEquipment(name))

    handleClickAway()

    const isOnHomePage = location.pathname === '/'

    if (isOnHomePage) {
      dispatch(triggerScrollToCatalog())
    } else {
      navigate('/', {
        state: {
          shouldScrollToCatalog: true,
        },
      })
    }
  }

  return {
    menuOpen,
    activeItem,
    filterOptionsByGroup,
    handleClickAway,
    handleMainClick,
    handleItemClick,
    handleClick,
  }
}