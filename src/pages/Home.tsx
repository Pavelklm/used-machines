import { About } from '@/components/ui/ForMainPage/About/About'
import { CatalogWrapper } from '@/components/ui/ForMainPage/Catalog/CatalogWrapper'
import { Info } from '@/components/ui/ForMainPage/Info/Info'

export const Home = () => {
  return (
    <div>
      <Info />
      <CatalogWrapper />
      <About />
    </div>
  )
}
