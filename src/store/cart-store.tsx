import { produce } from 'immer'
import { create } from 'zustand'

interface Product {
  id: string
  name: string
  price: number
  quantity: number
  images: {
    url: string
  }[]
}

type ProductDataToUpdate = {
  productId: string
  type: 'increment' | 'decrement'
}

type CartStore = {
  cart: Product[]
  total: () => number
  add: (product: Product) => void
  updateItemQuantity: (data: ProductDataToUpdate) => void
  remove: (productId: string) => void
  clear: () => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  total: () => {
    const { cart } = get()

    const total = cart.reduce((prevValue, item) => {
      return prevValue + item.price * item.quantity
    }, 0)

    return total
  },
  add: (product: Product) => {
    const { cart } = get()

    const productIndex = cart.findIndex((item) => item.id === product.id)

    const updatedCart = produce(cart, (draft) => {
      if (productIndex < 0) {
        draft.push(product)
      } else {
        draft[productIndex].quantity += product.quantity
      }
    })

    set({ cart: updatedCart })
  },
  updateItemQuantity: ({ productId, type }: ProductDataToUpdate) => {
    const { cart } = get()

    const productIndex = cart.findIndex((product) => product.id === productId)

    const updatedCart = produce(cart, (draft) => {
      if (productIndex >= 0) {
        const product = draft[productIndex]

        if (type === 'decrement' && product.quantity === 1) return

        product.quantity =
          type === 'increment' ? product.quantity + 1 : product.quantity - 1
      }
    })

    set({ cart: updatedCart })
  },
  remove: (productId: string) => {
    const { cart } = get()

    const productIndex = cart.findIndex((product) => product.id === productId)

    const updatedCart = produce(cart, (draft) => {
      if (productIndex >= 0) {
        draft.splice(productIndex, 1)
      }
    })

    set({ cart: updatedCart })
  },
  clear: () => {
    set({ cart: [] })
  },
}))
