export type FilterType = 'brand' | 'category' | 'equipment'

export function brand(name: string) {
  return {
    brands_names: {
      brand_name: { _eq: name },
      brand__image: { _eq: name },
    },
  }
}

export function category(name: string) {
  return {
    categories_names: {
      categorie_name: { _eq: name },
    },
  }
}

export function equipment(name: string) {
  return {
    equipments_names: {
      equipment_name: { _eq: name },
    },
  }
}
