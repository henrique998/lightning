'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useCartStore } from '@/store/cart-store'
import { formatPrice } from '@/utils/format-price'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { CountButton } from './count-button'

export function ProductsTable() {
  const cart = useCartStore((state) => state.cart)

  if (cart.length === 0) {
    return (
      <div className="lg:max-w-[732px] w-full lg:h-56 order-2 lg:order-none flex flex-col items-center justify-center gap-5">
        <ShoppingCart className="h-20 w-20 stroke-zinc-200" />

        <div className="text-center space-y-[4px]">
          <h2 className="text-2xl text-zinc-300 font-medium">
            O seu carrinho está vazio
          </h2>

          <h3 className="text-zinc-200 font-medium">
            Adicione produtos para visualizá-los aqui
          </h3>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:max-w-[732px] w-full order-2 lg:order-none">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-zinc-400">Product</TableHead>
            <TableHead className="text-zinc-400">Price</TableHead>
            <TableHead className="text-zinc-400">Quantity</TableHead>
            <TableHead className="text-zinc-400">Total</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cart.map((product) => (
            <TableRow key={product.id} className="hover:bg-transparent">
              <TableCell>
                <div className="w-44 lg:w-auto flex items-center gap-4">
                  <Image
                    src={product.images[0].url}
                    alt={product.name}
                    width={240}
                    height={240}
                    className="h-10 w-10 object-cover rounded-lg"
                  />

                  <span
                    title={product.name}
                    className="text-xl lg:w-auto text-zinc-950 w-64 truncate"
                  >
                    {product.name}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <div className="w-28 lg:w-auto">
                  <span className="text-xl text-zinc-950">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <div className="w-44 lg:w-auto">
                  <CountButton
                    productId={product.id}
                    productQuantity={product.quantity}
                  />
                </div>
              </TableCell>

              <TableCell>
                <div className="w-28 lg:w-auto">
                  <span className="text-xl text-zinc-950">
                    {formatPrice(product.price * product.quantity)}
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
