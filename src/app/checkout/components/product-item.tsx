import { formatPrice } from '@/utils/format-price'
import Image from 'next/image'

interface ProductItemProps {
  product: {
    name: string
    image: string
    quantity: number
    total: number
  }
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-4">
        <Image
          src={product.image}
          alt={product.name}
          width={180}
          height={180}
          className="h-16 w-16 rounded-sm object-cover"
        />
        <div className="space-y-2">
          <span
            title={product.name}
            className="block text-2xl text-zinc-300 w-64 truncate"
          >
            {product.name}
          </span>
          <span className="block text-sm text-zinc-300">
            M / {product.quantity}pcs
          </span>
        </div>
      </div>
      <span className="block text-xl text-zinc-300">
        {formatPrice(product.total)}
      </span>
    </div>
  )
}
