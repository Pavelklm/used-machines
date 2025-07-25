export type Product = {
  id: any
  price: number
  photo_url: string
  product_name: string
  currency_name?: {
    currency_name: string
  }
  brands_names: {
    brand_name: string
  }
  categories_names: {
    categorie_name: string
  }
  equipments_names: {
    equipment_name: string
  }
}
