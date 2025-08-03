import { BrandInfo } from '@/types/products'
import { useMemo } from 'react'
import { useAppSelector } from './hooks'

export const useProducts = () => {
  const products = useAppSelector((state) => state.products.products)
  const directusUrl = import.meta.env.VITE_API_BASE_URL

  const allBrands = useMemo(() => {
    let productsToProcess = products

    if (productsToProcess.length === 0) {
      const cached = localStorage.getItem('products_cache')
      const cacheTime = localStorage.getItem('products_cache_time')

      if (cached && cacheTime) {
        const age = Date.now() - parseInt(cacheTime)
        if (age < 1 * 60 * 1000) {
          productsToProcess = JSON.parse(cached)
        }
      }
    }

    const seen = new Set<string>()
    const uniqueBrands: BrandInfo[] = []

    productsToProcess.forEach((product: any) => {
      const brand = product.brands_names
      if (!brand?.brand_name) return

      if (!seen.has(brand.brand_name)) {
        seen.add(brand.brand_name)
        uniqueBrands.push({
          brand_name: brand.brand_name,
          brand__image: `${directusUrl}assets/${brand.brand__image}`,
        })
      }
    })

    return uniqueBrands
  }, [products, directusUrl])

  const productsArray = useMemo(() => {
    const map = new Map()
    products.forEach((product) => {
      if (!map.has(product.product_name)) {
        map.set(product.product_name, {
          id: product.id,
          product_name: product.product_name,
          price: product.price,
          currency: product.currency_name?.currency_name,
          url: `${directusUrl}assets/${product.photo_url}`,
        })
      }
    })
    return Array.from(map.values())
  }, [products, directusUrl])

  const categories = useMemo(() => {
    return Array.from(
      new Set(products.map((p) => p.categories_names?.categorie_name))
    ).filter(Boolean) as string[]
  }, [products])

  const uniqueStrings = (arr: (string | undefined | null)[]) =>
    Array.from(new Set(arr.filter(Boolean) as string[]))

  const filterOptionsByGroup = useMemo(() => {
    const categoryMap = categories.reduce(
      (acc, category) => {
        const equipmentsForCategory = products
          .filter((item) => item.categories_names?.categorie_name === category)
          .map((item) => item.equipments_names?.equipment_name)

        acc[category] = uniqueStrings(equipmentsForCategory)
        return acc
      },
      {} as Record<string, string[]>
    )

    return {
      Виробники: uniqueStrings(
        products.map((item) => item.brands_names?.brand_name)
      ),
      ...categoryMap,
    }
  }, [products, categories])

  const getFilteredProducts = (name: string) => {
    return products
      .filter(
        (product) =>
          product.equipments_names?.equipment_name === name ||
          product.brands_names?.brand_name === name
      )
      .map((product) => ({
        id: product.id,
        currency: product.currency_name?.currency_name,
        price: product.price,
        product_name: product.product_name,
        url: `${directusUrl}assets/${product.photo_url}`,
        equipment_name: product.equipments_names?.equipment_name,
        brand: product.brands_names?.brand_name,
        category: product.categories_names?.categorie_name,
      }))
  }

  return {
    productsArray,
    filterOptionsByGroup,
    getFilteredProducts,
    allBrands,
  }
}
