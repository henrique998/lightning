'use client'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useCartStore } from '@/store/cart-store'
import { useUser } from '@clerk/nextjs'
import { ShoppingCart } from 'lucide-react'

type Product = {
  id: string
  name: string
  price: number
  images: {
    url: string
  }[]
}

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { isSignedIn } = useUser()
  const addProduct = useCartStore((state) => state.add)
  const { toast } = useToast()

  function handleAddProductToCart() {
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
    <Button
      onClick={handleAddProductToCart}
      className="mt-8 lg:mt-0 lg:mb-[1px] w-full flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition-colors rounded-full"
    >
      Adicionar ao carrinho
      <ShoppingCart className="h-6 w-6 stroke-white" />
    </Button>
  )
}
