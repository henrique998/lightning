import { AppHeader } from '@/components/app-header'
import { ProductsList } from '@/components/products-list'
import { fetchGQL } from '@/utils/fetch-gql'
import { Product } from '../page'

interface SearchProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

type ProductsResponse = {
  products: Product[]
}

async function GetProductsBySearch(search: string) {
  const query = `
    query SearchProducts {
      products(where: {_search: "${search}"}) {
        id
        name
        price
        images {
          url
        }
      }
    }
  `

  const { products } = await fetchGQL<ProductsResponse>(query)

  return products
}

export default async function Search({ searchParams }: SearchProps) {
  const search = searchParams.q
  const products = await GetProductsBySearch(String(search))

  return (
    <main>
      <AppHeader />

      <section className="max-w-[1080px] px-4 w-full mx-auto mb-8">
        <h1 className="text-zinc-950 text-4xl text-center mt-[30px] font-medium">
          {search}
        </h1>
        <p className="text-zinc-400 text-center mt-4">
          Não encontrou o produto que procura? Temos outras opções em nosso
          catálogo
        </p>

        <div className="mt-[30px]">
          <ProductsList products={products} />
        </div>
      </section>
    </main>
  )
}
