import { redirect } from 'next/navigation'

import { FaPaypal } from 'react-icons/fa'

import { Footer } from '@/components/footer'
import { Separator } from '@/components/ui/separator'
import { Header } from './components/header'
import { PaypalButton } from './components/paypal-button'
import { ProductsScrollArea } from './components/products-scroll-area'
import { Total } from './components/total'

interface CheckoutProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function Checkout({ searchParams }: CheckoutProps) {
  const processParam = String(searchParams.process)

  if (processParam !== 'payment') {
    redirect('/')
  }

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="bg-zinc-950">
        <div className="max-w-[500px] px-4 lg:px-0 w-full h-[720px] lg:h-screen flex flex-col relative mx-auto pt-10 pb-4">
          <div>
            <Header />

            <ProductsScrollArea />

            <Separator className="my-10 bg-zinc-600" />

            <div className="flex items-center justify-between">
              <span className="block text-3xl text-zinc-100">Total</span>

              <Total />
            </div>
          </div>

          <footer className="absolute bottom-4">
            <p className="text-xs text-zinc-400 text-center">
              Ao clicar no botão {'"Finalizar a compra"'}, você aceita e
              concorda com os{' '}
              <a className="text-white hover:underline" href="#">
                termos e condições de uso
              </a>{' '}
              e{' '}
              <a className="text-white hover:underline" href="#">
                política de privacidade
              </a>{' '}
              da Lightning.
            </p>
          </footer>
        </div>
      </div>

      <div>
        <div className="max-w-[500px] px-4 lg:px-0 w-full mx-auto h-full flex flex-col pt-10">
          <div className="text-center lg:text-left">
            <h1 className="text-[32px] text-zinc-950 font-medium">Pagamento</h1>
            <p className="text-zinc-400">
              Todas as transações são seguras e criptografadas.
            </p>
          </div>

          <div className="flex flex-col flex-1 items-center justify-center gap-6">
            <FaPaypal className="h-24 w-24 stroke-[1.5px] text-zinc-200 mt-6 lg:mt-0" />

            <div className="w-full">
              <PaypalButton />
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </main>
  )
}
