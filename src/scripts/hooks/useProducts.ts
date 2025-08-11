import { BrandInfo, Product } from '@/types/products'
import { useCallback, useMemo } from 'react'
import { useAppSelector } from './hooks'

// Helper для построения asset URL
const buildAssetUrl = (baseUrl: string, assetPath: string) => {
  if (!assetPath) return ''
  return `${baseUrl}assets/${assetPath}`
}

export const useProducts = () => {
  const products = useAppSelector((state) => state.products.products)
  const directusUrl = import.meta.env.VITE_API_BASE_URL

  const allBrands = useMemo(() => {
    const seen = new Set<string>()
    const uniqueBrands: BrandInfo[] = []

    products.forEach((product: Product) => {
      const brand = product.brands_names
      if (!brand?.brand_name) return

      if (!seen.has(brand.brand_name)) {
        seen.add(brand.brand_name)
        uniqueBrands.push({
          brand_name: brand.brand_name,
          brand__image: buildAssetUrl(directusUrl, brand.brand__image),
        })
      }
    })

    return uniqueBrands
  }, [products, directusUrl])

  const productsArray = useMemo(() => {
    const uniqueProducts = products.reduce(
      (acc, product) => {
        if (!acc[product.product_name]) {
          acc[product.product_name] = {
            id: product.id,
            product_name: product.product_name,
            price: product.price,
            currency: product.currency_name?.currency_name,
            url: buildAssetUrl(directusUrl, product.photo_url),
            brand_name: product.brands_names?.brand_name,
          }
        }
        return acc
      },
      {} as Record<string, any>
    )

    return Object.values(uniqueProducts)
  }, [products, directusUrl])

  const categories = useMemo(() => {
    return Array.from(
      new Set(products.map((p) => p.categories_names?.categorie_name))
    ).filter(Boolean) as string[]
  }, [products])

  const filterOptionsByGroup = useMemo(() => {
    const categoryMap = categories.reduce(
      (acc, category) => {
        const equipmentsForCategory = products
          .filter((item) => item.categories_names?.categorie_name === category)
          .map((item) => item.equipments_names?.equipment_name)

        acc[category] = Array.from(
          new Set(equipmentsForCategory.filter(Boolean) as string[])
        )
        return acc
      },
      {} as Record<string, string[]>
    )

    return {
      Виробники: Array.from(
        new Set(
          products
            .map((item) => item.brands_names?.brand_name)
            .filter(Boolean) as string[]
        )
      ),
      ...categoryMap,
    }
  }, [products, categories]) as Record<string, string[]>

  // В useProducts.ts, исправь getFilteredProducts:

  const getFilteredProducts = useCallback(
    (name: string) => {
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
          url: buildAssetUrl(directusUrl, product.photo_url),
          equipment_name: product.equipments_names?.equipment_name,
          // 🔥 ИСПРАВЛЯЕМ: было "brand", стало "brand_name"
          brand_name: product.brands_names?.brand_name,
          // 🆕 ДОБАВЛЯЕМ: изображение бренда тоже
          brand_image: product.brands_names?.brand__image
            ? buildAssetUrl(directusUrl, product.brands_names.brand__image)
            : null,
          category: product.categories_names?.categorie_name,
        }))
    },
    [products, directusUrl]
  )

  // Мемоизируем и эту функцию
  const getCategoryFromEquipment = useCallback(
    (equipment: string) => {
      const category = Object.keys(filterOptionsByGroup).find((key) =>
        filterOptionsByGroup[key].includes(equipment)
      )
      return category
    },
    [filterOptionsByGroup]
  )

  return {
    productsArray,
    filterOptionsByGroup,
    getFilteredProducts,
    allBrands,
    getCategoryFromEquipment,
  }
}
