'use client'

import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Header() {
  const { back } = useRouter()

  return (
    <header className="flex items-center justify-between">
      <button onClick={back}>
        <ArrowLeft className="h-6 w-6 stroke-zinc-100" />
      </button>

      <Link href="/">
        <Image src="/white-logo.svg" alt="" width={148} height={40} />
      </Link>
    </header>
  )
}
