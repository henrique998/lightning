'use client'

import { Product } from '@/app/page'
import { useCartStore } from '@/store/cart-store'
import { formatPrice } from '@/utils/format-price'
import { useUser } from '@clerk/nextjs'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useToast } from './ui/use-toast'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { isSignedIn } = useUser()
  const addProduct = useCartStore((state) => state.add)
  const { toast } = useToast()

  function handleAddProductToCart(e: any) {
    e.preventDefault()

    if (!isSignedIn) {
      toast({
        title: 'Ação não autorizada',
        description:
          'Você deve fazer login para adicionar produtos ao carrinho',
        variant: 'destructive',
      })

      return
    }

    addProduct({
      ...product,
      quantity: 1,
    })

    toast({
      title: 'Produto adicionado',
      description: 'O seu carrinho foi atualizado com sucesso!',
    })
  }

  return (
    <Link href={`/product/${product.id}`} className="w-[300px]">
      <div className="w-full h-[400px]">
        <Image
          src={product.images[0].url}
          alt={product.name}
          width={300}
          height={400}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>

      <div className="mt-4 w-full">
        <h2 className="text-xl text-zinc-900 font-medium">{product.name}</h2>

        <div className="flex items-center justify-between">
          <p className="text-lg text-zinc-400 font-medium">
            {formatPrice(product.price)}
          </p>

          <button
            onClick={handleAddProductToCart}
            className="h-10 w-10 rounded-full bg-zinc-200 flex items-center justify-center hover:brightness-90 transition-all group"
          >
            <ShoppingCart className="h-5 w-5 stroke-zinc-300 group-hover:stroke-zinc-400" />
          </button>
        </div>
      </div>
    </Link>
  )
}
