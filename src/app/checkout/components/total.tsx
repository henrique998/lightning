'use client'

import { useCartStore } from '@/store/cart-store'
import { formatPrice } from '@/utils/format-price'

export function Total() {
  const total = useCartStore((state) => state.total)
  const productsTotal = total()

  return (
    <strong className="block text-3xl text-zinc-100">
      {formatPrice(productsTotal)}
    </strong>
  )
}
