import { useClerk, useUser } from '@clerk/nextjs'
import * as Dialog from '@radix-ui/react-dialog'
import { Menu, Power, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { Avatar } from './avatar'
import { SearchInput } from './search-input'
import { Button } from './ui/button'

export function MenuSidebar() {
  const { isSignedIn, user } = useUser()
  const { signOut } = useClerk()
  const { refresh, push } = useRouter()
  const [search, setSearch] = useState('')

  function handleSearch(e: FormEvent) {
    e.preventDefault()

    if (!search) return

    push(`/search?q=${search}`)
  }

  async function handleSignOut() {
    await signOut()

    refresh()
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="lg:hidden">
          <Menu className="h-8 w-8 stroke-zinc-950 lg:hidden" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content className="lg:hidden min-h-screen bg-white w-full fixed inset-0 z-50">
          <header className="h-20 border-b border-b-zinc-100 px-4 flex items-center justify-between">
            <Image src="/default-logo.svg" alt="" width={148} height={40} />

            <Dialog.Close>
              <X className="h-6 w-6" />
            </Dialog.Close>
          </header>

          <form
            onSubmit={handleSearch}
            className="mt-6 flex items-center justify-center"
          >
            <SearchInput value={search} onChange={setSearch} />
          </form>

          {isSignedIn ? (
            <div className="mt-10 flex flex-col items-center justify-center gap-4">
              <Avatar size="md" />

              <div className="text-center flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.firstName}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.emailAddresses[0].emailAddress}
                </p>
              </div>

              <Button
                variant="outline"
                onClick={handleSignOut}
                className="space-x-2 rounded-full"
              >
                <Power className="h-5 w-5 stroke-zinc-400" />
                <span className="text-sm text-zinc-400">Log out</span>
              </Button>
            </div>
          ) : (
            <div className="space-y-2 px-4 mt-10">
              <Button
                asChild
                className="w-full bg-orange-500 hover:bg-orange-600 rounded-full"
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild className="w-full rounded-full">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
