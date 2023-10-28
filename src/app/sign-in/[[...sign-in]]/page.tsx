import { Footer } from '@/components/footer'
import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between">
      <header className="py-4 flex items-center justify-center w-full">
        <Link href="/">
          <Image src="/default-logo.svg" alt="" width={148} height={40} />
        </Link>
      </header>

      <SignIn />

      <Footer />
    </main>
  )
}
