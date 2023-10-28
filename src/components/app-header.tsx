'use client'

import { useCartStore } from '@/store/cart-store'
import { useUser } from '@clerk/nextjs'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { AvatarBox } from './avatar-box'
import { MenuSidebar } from './menu-sidebar'
import { SearchInput } from './search-input'
import { Button } from './ui/button'

export function AppHeader() {
  const [search, setSearch] = useState('')
  const { isSignedIn } = useUser()
  const cart = useCartStore((state) => state.cart)
  const router = useRouter()

  function handleSearch(e: FormEvent) {
    e.preventDefault()

    if (!search) return

    router.push(`/search?q=${search}`)
  }

  return (
    <header className="h-20 border-b border-b-zinc-100 flex items-center">
      <div className="flex items-center justify-between max-w-[1080px] px-4 w-full mx-auto">
        <Link href="/">
          <Image src="/default-logo.svg" alt="" width={148} height={40} />
        </Link>

        <form onSubmit={handleSearch} className="hidden lg:block">
          <SearchInput value={search} onChange={setSearch} />
        </form>

        <div className="hidden lg:block">
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/cart" className="relative mt-2">
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 h-5 w-5 rounded-full flex items-center justify-center text-[10px] text-zinc-100 font-semibold">
                    {cart.length}
                  </span>
                )}

                <ShoppingCart className="h-7 w-7 stroke-zinc-300 stroke-[1.5px]" />
              </Link>
              <AvatarBox />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                asChild
                className="bg-orange-500 hover:bg-orange-600 transition-colors rounded-full"
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild className="transition-colors rounded-full">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          {isSignedIn && (
            <Link href="/cart" className="relative mt-2">
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 h-5 w-5 rounded-full flex items-center justify-center text-[10px] text-zinc-100 font-semibold">
                  {cart.length}
                </span>
              )}

              <ShoppingCart className="h-7 w-7 stroke-zinc-300 stroke-[1.5px]" />
            </Link>
          )}
          <MenuSidebar />
        </div>
      </div>
    </header>
  )
}
