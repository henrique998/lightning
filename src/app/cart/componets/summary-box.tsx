'use client'

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart-store'
import { formatPrice } from '@/utils/format-price'
import Link from 'next/link'

export function SummaryBox() {
  const [cart, total] = useCartStore((state) => [state.cart, state.total])

  return (
    <div className="h-[294px] w-full lg:w-80 rounded-xl border border-zinc-200 p-4 flex flex-col justify-between">
      <h2 className="text-lg text-zinc-950 font-medium">Resumo da Compra</h2>

      <div className="space-y-[56px]">
        <ul className="space-y-4">
          <li className="flex items-center justify-between">
            <span className="block text-zinc-400">Produtos</span>
            <span className="block text-zinc-400">{cart.length}</span>
          </li>

          <li className="flex items-center justify-between">
            <span className="block text-zinc-400">Entrega</span>
            <span className="block text-zinc-400">Gratuito</span>
          </li>
        </ul>

        <div className="flex items-center justify-between">
          <span className="block text-zinc-400">Total</span>
          <strong className="block text-zinc-400">
            {formatPrice(total())}
          </strong>
        </div>
      </div>

      {cart.length === 0 ? (
        <Button
          disabled
          className="bg-orange-500 hover:bg-orange-600 w-full rounded-full"
        >
          Finalizar Compra
        </Button>
      ) : (
        <Button
          asChild
          className="bg-orange-500 hover:bg-orange-600 w-full rounded-full"
        >
          <Link href={`/checkout?process=payment`}>Finalizar Compra</Link>
        </Button>
      )}
    </div>
  )
}
