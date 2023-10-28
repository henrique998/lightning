import { useCartStore } from '@/store/cart-store'
import { Minus, Plus } from 'lucide-react'

interface CountButtonProps {
  productId: string
  productQuantity: number
}

export function CountButton({ productId, productQuantity }: CountButtonProps) {
  const updateQuantity = useCartStore((state) => state.updateItemQuantity)

  return (
    <div className="flex items-center justify-center gap-2  w-fit py-2 px-2 rounded-full border border-zinc-100">
      <button
        onClick={() => updateQuantity({ productId, type: 'decrement' })}
        className="h-10 w-10 rounded-full hover:bg-zinc-100 transition-colors flex items-center justify-center"
      >
        <Minus className="h-6 w-6 stroke-zinc-400" />
      </button>

      <input
        type="number"
        value={productQuantity}
        readOnly
        className="w-6 text-center focus:outline-none text-zinc-950"
      />

      <button
        onClick={() => updateQuantity({ productId, type: 'increment' })}
        className="h-10 w-10 rounded-full hover:bg-zinc-100 transition-colors flex items-center justify-center"
      >
        <Plus className="h-6 w-6 stroke-zinc-400" />
      </button>
    </div>
  )
}
