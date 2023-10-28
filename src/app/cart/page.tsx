import { AppHeader } from '@/components/app-header'
import { ClearCartButton } from './componets/clear-cart-button'
import { ProductsTable } from './componets/products-table'
import { SummaryBox } from './componets/summary-box'

export default function Cart() {
  return (
    <main>
      <AppHeader />

      <div className="max-w-[1080px] w-full px-4 mx-auto py-8">
        <h1 className="text-4xl text-zinc-950 font-medium">
          Carrinho de Compras
        </h1>

        <div className="mt-8">
          <ClearCartButton />
        </div>

        <div className="mt-8 flex flex-col lg:flex-row items-start gap-10">
          <ProductsTable />

          <SummaryBox />
        </div>
      </div>
    </main>
  )
}
