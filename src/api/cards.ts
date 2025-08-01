export async function fetchProducts(filters: Record<string, any>[] = []) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const allProductsUrl = import.meta.env.VITE_API_ALLPRODUCTS_URL
  const token = import.meta.env.VITE_API_TOKEN

  if (!baseUrl || !token) {
    console.error('Нет переменных окружения для API')
    return []
  }

  const mergedFilters = {
    status: { _eq: 'published' },
    ...filters.reduce((acc, filter) => ({ ...acc, ...filter }), {}),
  }

  const query = encodeURIComponent(JSON.stringify(mergedFilters))
  const url = `${baseUrl}${allProductsUrl}&filter=${query}`

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()
    return data.data
  } catch (err) {
    console.error('Ошибка загрузки продуктов:', err)
    return []
  }
}

export async function fetchBrands(filters: Record<string, any>[] = []) {
  const brandsUrl = import.meta.env.VITE_API_BRANDS_URL
  const token = import.meta.env.VITE_API_TOKEN
  const directusUrl = import.meta.env.VITE_API_BASE_URL

  if (!brandsUrl || !token) {
    console.error('Нет переменных окружения для API')
    return []
  }

  const mergedFilters = {
    status: { _eq: 'published' },
  }

  const query = encodeURIComponent(JSON.stringify(mergedFilters))
  const url = `${directusUrl}${brandsUrl}?filter=${query}`

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()

    return data.data
  } catch (err) {
    console.error('Ошибка загрузки брендов:', err)
    return []
  }
}

export async function fetchProductById(id: string) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const token = import.meta.env.VITE_API_TOKEN

  if (!baseUrl || !token) {
    console.error('Нет переменных окружения для API')
    return null
  }
  const productUrl = baseUrl.replace(
    '/items/products/',
    `/items/products/${id}`
  )

  try {
    const res = await fetch(productUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error('Product not found')
      }
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await res.json()
    return data.data
  } catch (err) {
    console.error(`Ошибка загрузки товара ${id}:`, err)
    throw err
  }
}
