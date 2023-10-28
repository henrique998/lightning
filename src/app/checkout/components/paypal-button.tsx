/* eslint-disable @typescript-eslint/no-non-null-assertion */
'use client'

import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

import { useToast } from '@/components/ui/use-toast'
import { useCartStore } from '@/store/cart-store'

export function PaypalButton() {
  const { toast } = useToast()
  const [total, cart] = useCartStore((state) => [state.total, state.cart])
  const productsTotal = total()

  async function handleCreateOrder() {
    const res = await fetch('/api/checkout/paypal', {
      method: 'POST',
      body: JSON.stringify({
        total: productsTotal,
        products: cart.map((product) => {
          return {
            name: product.name,
            quantity: product.quantity,
            price: product.price,
          }
        }),
      }),
    })

    const order = await res.json()

    return order.id
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAl_CLIENT_ID!,
        currency: 'BRL',
      }}
    >
      <PayPalButtons
        style={{
          layout: 'horizontal',
          tagline: false,
          height: 40,
          shape: 'pill',
        }}
        createOrder={handleCreateOrder}
        onApprove={async () => {
          toast({
            title: 'Compra realizada com sucesso',
            description: 'O seu pedido será entregue em breve!',
          })
        }}
      />
    </PayPalScriptProvider>
  )
}
