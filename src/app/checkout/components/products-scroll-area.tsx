'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useCartStore } from '@/store/cart-store'
import { ProductItem } from './product-item'

export function ProductsScrollArea() {
  const cart = useCartStore((state) => state.cart)

  return (
    <ScrollArea className="h-[200px] w-full mt-24">
      <div className="space-y-4">
        {cart.map((product) => (
          <ProductItem
            key={product?.id}
            product={{
              name: product?.name,
              image: product?.images[0].url,
              quantity: product?.quantity,
              total: product?.quantity * product?.price,
            }}
          />
        ))}
      </div>
    </ScrollArea>
  )
}
