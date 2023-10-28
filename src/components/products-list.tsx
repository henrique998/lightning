import { Product } from '@/app/page'
import { ProductCard } from './product-card'

interface ProductsListProps {
  products: Product[]
}

export function ProductsList({ products }: ProductsListProps) {
  return (
    <ul className="grid lg:grid-cols-3 gap-12">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  )
}
