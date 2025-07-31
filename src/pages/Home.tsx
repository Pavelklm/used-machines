import { About } from '@/sections/ForMainPage/About/About'
import { CatalogWrapper } from '@/sections/ForMainPage/Catalog/CatalogWrapper'
import { Info } from '@/sections/ForMainPage/Info/Info'
import { Manufacturers } from '@/sections/ForMainPage/Manufacturers/Manufacturers'
import { RequestForm } from '@/sections/ForMainPage/RequestForm/RequestForm'

export const Home = () => {
  return (
    <div>
      <Info />
      <CatalogWrapper />
      <About />
      <RequestForm />
      <Manufacturers />
    </div>
  )
}
