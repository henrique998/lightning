'use client'

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart-store'

export function ClearCartButton() {
  const clearCart = useCartStore((state) => state.clear)

  return (
    <Button onClick={clearCart} className="block ml-auto rounded-full">
      Esvaziar Carrinho
    </Button>
  )
}
