export async function fetchProducts(filters: Record<string, any>[] = []) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  const token = import.meta.env.VITE_API_TOKEN

  if (!baseUrl || !token) {
    console.error('❌ Нет переменных окружения для API')
    return []
  }

  const mergedFilters = {
    status: { _eq: 'published' },
    ...filters.reduce((acc, filter) => ({ ...acc, ...filter }), {}),
  }

  const query = encodeURIComponent(JSON.stringify(mergedFilters))
  const url = `${baseUrl}&filter=${query}`

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()
    return data.data
  } catch (err) {
    console.error('💥 Ошибка загрузки продуктов:', err)
    return []
  }
}
