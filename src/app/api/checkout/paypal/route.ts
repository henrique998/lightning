/* eslint-disable @typescript-eslint/no-non-null-assertion */
import paypal from '@paypal/checkout-server-sdk'
import { NextRequest, NextResponse } from 'next/server'

const clientId = process.env.NEXT_PUBLIC_PAYPAl_CLIENT_ID!
const clientSecret = process.env.PAYPAL_SECRET_KEY!

const environment = new paypal.core.SandboxEnvironment(clientId!, clientSecret!)
const client = new paypal.core.PayPalHttpClient(environment)

type CheckoutData = {
  total: number
  products: {
    name: string
    quantity: number
    price: number
  }[]
}

export async function POST(req: NextRequest) {
  const data: CheckoutData = await req.json()
  const orderReq = new paypal.orders.OrdersCreateRequest()

  const { total, products } = data
  const stringTotal = (total / 100).toFixed(2)

  orderReq.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'BRL',
          value: stringTotal,
          breakdown: {
            item_total: { currency_code: 'BRL', value: stringTotal },
          },
        },
        items: products.map((item) => {
          const stringPrice = (item.price / 100).toFixed(2)
          return {
            name: item.name,
            category: 'PHYSICAL_GOODS',
            quantity: String(item.quantity),
            unit_amount: { currency_code: 'BRL', value: stringPrice },
          }
        }),
      },
    ],
  })

  const res = await client.execute(orderReq)

  return NextResponse.json({
    id: res.result.id,
  })
}
