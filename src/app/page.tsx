import { AppHeader } from '@/components/app-header'
import { ProductsList } from '@/components/products-list'
import { fetchGQL } from '@/utils/fetch-gql'

const query = `
  query GetAllProducts {
    products {
      id
      name
      price
      images(where: { color: "black" }) {
        url
      }
    }
  }
`

export type Product = {
  id: string
  name: string
  price: number
  images: {
    url: string
  }[]
}

type ProductsResponse = {
  products: Product[]
}

export default async function Home() {
  const { products } = await fetchGQL<ProductsResponse>(query)

  return (
    <main>
      <AppHeader />

      <section className="max-w-[1080px] px-4 w-full mx-auto py-8">
        <h1 className="text-4xl text-zinc-950 font-semibold">
          Promoções da Semana
        </h1>

        <div className="mt-8">
          <ProductsList products={products} />
        </div>
      </section>
    </main>
  )
}
